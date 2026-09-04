import json

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

from sqlalchemy.orm import Session
from db.database import get_db
from db.models import Startup, Challenge, Match, ReadinessAssessment, Pilot, KPI, Milestone, Decision

from risk_evaluator import evaluate_startup_risk


from extractor import structure_government_problem
from matcher import rank_startups, MOCK_STARTUP_DB
from risk_evaluator import evaluate_startup_risk
from models import (
    ProblemSpecification,
    StartupMatchResult,
    InnovationReadinessReport,
)

app = FastAPI(title="SIH26136: Smart Matching & Structuring Engine")

# --- CORS Middleware Configuration ---
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Schemas for Existing Matching Pipeline ---
class MatchPipelineRequest(BaseModel):
    raw_department_statement: str


class MatchPipelineResponse(BaseModel):
    structured_specification: ProblemSpecification
    matched_candidates: List[StartupMatchResult]


# --- Schemas for New Readiness + Risk AI ---
class StartupAuditRequest(BaseModel):
    problem_spec: ProblemSpecification
    startup_id: str

# --- Database Test Endpoint ---
@app.get("/startups")
def get_startups(db: Session = Depends(get_db)):
    startups = db.query(Startup).all()

    return [
        {
            "id": startup.id,
            "name": startup.name,
            "dpiit_registered": startup.dpiit_registered,
            "trl_level": startup.trl_level,
            "past_deployments": startup.past_deployments,
            "active_litigation": startup.active_litigation,
            "capabilities": startup.capabilities,
        }
        for startup in startups
    ]

@app.get("/challenges")
def get_challenges(db: Session = Depends(get_db)):
    challenges = db.query(Challenge).all()

    return [
        {
            "id": challenge.id,
            "title": challenge.title,
            "description": challenge.description,
            "domain": challenge.domain,
            "budget_inr": challenge.budget_inr,
            "duration_days": challenge.duration_days,
        }
        for challenge in challenges
    ]


# --- Endpoint 1: Match & Structure (Discovery Stage) ---
@app.post("/api/v1/process-demand", response_model=MatchPipelineResponse)
async def process_demand(
    req: MatchPipelineRequest,
    challenge_id: int,
    db: Session = Depends(get_db)
):
    structured_spec = structure_government_problem(
        req.raw_department_statement
    )

    matches = rank_startups(structured_spec)

    # Save matches to PostgreSQL
    for match in matches:
        db_match = Match(
            challenge_id=challenge_id,
            startup_id=match.startup_id,
            match_score=match.scores.overall_match_score,
            justification=match.match_justification
        )

        db.add(db_match)

    db.commit()

    return MatchPipelineResponse(
        structured_specification=structured_spec,
        matched_candidates=matches,
    )


# --- Endpoint 2: Deep Readiness + Risk Audit (Due Diligence Stage) ---
@app.post("/api/v1/audit-readiness", response_model=InnovationReadinessReport)
async def audit_startup_readiness(req: StartupAuditRequest):
    # 1. Search for the startup in the mock database
    target_startup = next(
        (s for s in MOCK_STARTUP_DB if s["id"] == req.startup_id), None
    )

    # 2. Return 404 if the requested startup ID does not exist
    if not target_startup:
        raise HTTPException(
            status_code=404,
            detail=f"Startup with ID '{req.startup_id}' not found in registry.",
        )

    # 3. Perform the 5-dimension deep risk & readiness assessment
    report = evaluate_startup_risk(req.problem_spec, target_startup)
    return report

@app.get("/challenges/{challenge_id}/matches")
def get_matches(
    challenge_id: int,
    db: Session = Depends(get_db)
):
    matches = db.query(Match).filter(
        Match.challenge_id == challenge_id
    ).all()

    return matches

@app.post("/matches/{match_id}/readiness")
def create_readiness_assessment(
    match_id: int,
    db: Session = Depends(get_db)
):
    # Get the match
    match = db.query(Match).filter(
        Match.id == match_id
    ).first()

    if not match:
        raise HTTPException(
            status_code=404,
            detail="Match not found"
        )

    # Get the startup
    startup = db.query(Startup).filter(
        Startup.id == match.startup_id
    ).first()

    if not startup:
        raise HTTPException(
            status_code=404,
            detail="Startup not found"
        )

    # Run the readiness AI
    startup_profile = {
        "id": startup.id,
        "name": startup.name,
        "dpiit_registered": startup.dpiit_registered,
        "trl_level": startup.trl_level,
        "past_deployments": startup.past_deployments,
        "active_litigation": startup.active_litigation,
        "capabilities": startup.capabilities,
    }

    # For now, use the existing challenge
    challenge = db.query(Challenge).filter(
        Challenge.id == match.challenge_id
    ).first()

    if not challenge:
        raise HTTPException(
            status_code=404,
            detail="Challenge not found"
        )

    problem = ProblemSpecification(
        domain=challenge.domain,
        summary=challenge.description,
        technical_requirements=[],
        operational_constraints=[],
        target_kpis=[],
        pilot_duration_days=challenge.duration_days,
        estimated_budget_inr=challenge.budget_inr,
    )

    report = evaluate_startup_risk(
        problem,
        startup_profile
    )

    # Save AI result to PostgreSQL
    assessment = ReadinessAssessment(
    match_id=match.id,
    overall_score=int(report.overall_readiness_score),
    recommendation=report.recommendation,
    findings=json.dumps({
        "technical_capability": report.technical_capability.model_dump(),
        "deployment_readiness": report.deployment_readiness.model_dump(),
        "compliance_security": report.compliance_security.model_dump(),
        "financial_sustainability": report.financial_sustainability.model_dump(),
        "pilot_feasibility": report.pilot_feasibility.model_dump(),
        "suggested_sandbox_safeguards": report.suggested_sandbox_safeguards,
    }),
    )

    db.add(assessment)
    db.commit()
    db.refresh(assessment)

    return assessment

@app.post("/pilots")
def create_pilot(
    match_id: int,
    db: Session = Depends(get_db)
):
    # Check that the match exists
    match = db.query(Match).filter(Match.id == match_id).first()

    if not match:
        raise HTTPException(status_code=404, detail="Match not found")

    # Check that readiness assessment exists
    readiness = (
        db.query(ReadinessAssessment)
        .filter(ReadinessAssessment.match_id == match_id)
        .order_by(ReadinessAssessment.id.desc())
        .first()
    )

    if not readiness:
        raise HTTPException(
            status_code=404,
            detail="Readiness assessment not found"
        )

    # Create pilot
    pilot = Pilot(
        match_id=match_id,
        status="PLANNED"
    )

    db.add(pilot)
    db.commit()
    db.refresh(pilot)

    return pilot

@app.post("/pilots/{pilot_id}/kpis")
def create_kpi(
    pilot_id: int,
    name: str,
    baseline: str,
    target: str,
    db: Session = Depends(get_db)
):
    pilot = db.query(Pilot).filter(Pilot.id == pilot_id).first()

    if not pilot:
        raise HTTPException(status_code=404, detail="Pilot not found")

    kpi = KPI(
        pilot_id=pilot_id,
        name=name,
        baseline=baseline,
        target=target
    )

    db.add(kpi)
    db.commit()
    db.refresh(kpi)

    return kpi

@app.post("/kpis/{kpi_id}/result")
def update_kpi_result(
    kpi_id: int,
    actual: str,
    db: Session = Depends(get_db)
):
    kpi = db.query(KPI).filter(KPI.id == kpi_id).first()

    if not kpi:
        raise HTTPException(status_code=404, detail="KPI not found")

    kpi.actual = actual

    db.commit()
    db.refresh(kpi)

    return kpi

@app.post("/pilots/{pilot_id}/milestones")
def create_milestone(
    pilot_id: int,
    title: str,
    db: Session = Depends(get_db)
):
    pilot = db.query(Pilot).filter(Pilot.id == pilot_id).first()

    if not pilot:
        raise HTTPException(status_code=404, detail="Pilot not found")

    milestone = Milestone(
        pilot_id=pilot_id,
        title=title,
        status="PENDING"
    )

    db.add(milestone)
    db.commit()
    db.refresh(milestone)

    return milestone

@app.post("/milestones/{milestone_id}/complete")
def complete_milestone(
    milestone_id: int,
    db: Session = Depends(get_db)
):
    milestone = (
        db.query(Milestone)
        .filter(Milestone.id == milestone_id)
        .first()
    )

    if not milestone:
        raise HTTPException(
            status_code=404,
            detail="Milestone not found"
        )

    milestone.status = "COMPLETED"

    db.commit()
    db.refresh(milestone)

    return milestone

@app.post("/pilots/{pilot_id}/evaluation")
def evaluate_pilot(
    pilot_id: int,
    db: Session = Depends(get_db)
):
    pilot = db.query(Pilot).filter(Pilot.id == pilot_id).first()

    if not pilot:
        raise HTTPException(status_code=404, detail="Pilot not found")

    # Get KPIs for this pilot
    kpis = db.query(KPI).filter(KPI.pilot_id == pilot_id).all()

    # Get milestones for this pilot
    milestones = (
        db.query(Milestone)
        .filter(Milestone.pilot_id == pilot_id)
        .all()
    )

    # Count completed milestones
    completed_milestones = sum(
        1 for milestone in milestones
        if milestone.status == "COMPLETED"
    )

    # Count KPIs that have actual results
    measured_kpis = sum(
        1 for kpi in kpis
        if kpi.actual is not None
    )

    total_kpis = len(kpis)
    total_milestones = len(milestones)

    # Simple MVP evaluation
    if total_kpis > 0:
        kpi_score = (measured_kpis / total_kpis) * 100
    else:
        kpi_score = 0

    if total_milestones > 0:
        milestone_score = (
            completed_milestones / total_milestones
        ) * 100
    else:
        milestone_score = 0

    overall_score = (kpi_score + milestone_score) / 2

    if overall_score >= 75:
        recommendation = "READY_TO_SCALE"
    elif overall_score >= 50:
        recommendation = "EXTEND_PILOT"
    else:
        recommendation = "DO_NOT_SCALE"

    return {
        "pilot_id": pilot_id,
        "kpi_score": kpi_score,
        "milestone_score": milestone_score,
        "overall_score": overall_score,
        "recommendation": recommendation,
        "kpis_measured": measured_kpis,
        "total_kpis": total_kpis,
        "milestones_completed": completed_milestones,
        "total_milestones": total_milestones
    }

@app.post("/pilots/{pilot_id}/decision")
def create_final_decision(
    pilot_id: int,
    db: Session = Depends(get_db)
):
    pilot = db.query(Pilot).filter(Pilot.id == pilot_id).first()

    if not pilot:
        raise HTTPException(status_code=404, detail="Pilot not found")

    # Get KPIs
    kpis = db.query(KPI).filter(KPI.pilot_id == pilot_id).all()

    # Get milestones
    milestones = (
        db.query(Milestone)
        .filter(Milestone.pilot_id == pilot_id)
        .all()
    )

    # Check KPI completion
    measured_kpis = sum(
        1 for kpi in kpis
        if kpi.actual is not None
    )

    # Check milestone completion
    completed_milestones = sum(
        1 for milestone in milestones
        if milestone.status == "COMPLETED"
    )

    total_kpis = len(kpis)
    total_milestones = len(milestones)

    # Calculate scores
    kpi_score = (
        (measured_kpis / total_kpis) * 100
        if total_kpis > 0
        else 0
    )

    milestone_score = (
        (completed_milestones / total_milestones) * 100
        if total_milestones > 0
        else 0
    )

    overall_score = (kpi_score + milestone_score) / 2

    # Final government decision
    if overall_score >= 75:
        decision = "SCALE"
        reason = "Pilot met the required KPI measurement and milestone completion threshold."
    elif overall_score >= 50:
        decision = "EXTEND_PILOT"
        reason = "Pilot showed partial progress but requires additional validation."
    else:
        decision = "REJECT"
        reason = "Pilot did not meet the minimum performance threshold."

    # Save decision
    final_decision = Decision(
        pilot_id=pilot_id,
        decision=decision,
        reason=reason
    )

    db.add(final_decision)
    db.commit()
    db.refresh(final_decision)

    return {
        "pilot_id": pilot_id,
        "decision": final_decision.decision,
        "reason": final_decision.reason,
        "overall_score": overall_score,
        "id": final_decision.id
    }