import json
from typing import List

from fastapi import (
    FastAPI,
    HTTPException,
    Depends,
)

from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

from sqlalchemy.orm import Session

from db.database import get_db

from db.models import (
    Startup,
    Challenge,
    ChallengeRequirement,
    Match,
    ReadinessAssessment,
    Pilot,
    KPI,
    Milestone,
    Decision,
)

from extractor import (
    structure_government_problem
)

from matcher import (
    rank_startups
)

from risk_evaluator import (
    evaluate_startup_risk
)

from models import (
    ProblemSpecification,
    StartupMatchResult,
    InnovationReadinessReport,
)


app = FastAPI(
    title="SIH26136: Smart Matching & Structuring Engine"
)


# ============================================================
# CORS
# ============================================================

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


# ============================================================
# REQUEST / RESPONSE SCHEMAS
# ============================================================

class MatchPipelineRequest(BaseModel):
    raw_department_statement: str


class MatchPipelineResponse(BaseModel):
    structured_specification: ProblemSpecification
    matched_candidates: List[StartupMatchResult]


# ============================================================
# HEALTH
# ============================================================

@app.get("/api/v1/health")
def health_check():

    return {
        "status": "ok",
        "service": "SIH26136",
    }


# ============================================================
# STARTUPS
# ============================================================

@app.get("/api/v1/startups")
def get_startups(
    db: Session = Depends(get_db)
):

    startups = db.query(
        Startup
    ).all()

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


# ============================================================
# CHALLENGES
# ============================================================

@app.get("/api/v1/challenges")
def get_challenges(
    db: Session = Depends(get_db)
):

    challenges = db.query(
        Challenge
    ).all()

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


# ============================================================
# STAGE 1
# PROCESS DEMAND + MATCH STARTUPS
# ============================================================

@app.post(
    "/api/v1/process-demand",
    response_model=MatchPipelineResponse,
)
async def process_demand(
    req: MatchPipelineRequest,
    challenge_id: int,
    db: Session = Depends(get_db),
):

    # --------------------------------------------------------
    # Verify challenge
    # --------------------------------------------------------

    challenge = (
        db.query(Challenge)
        .filter(
            Challenge.id == challenge_id
        )
        .first()
    )

    if not challenge:

        raise HTTPException(
            status_code=404,
            detail=f"Challenge {challenge_id} not found",
        )

    try:

        # ----------------------------------------------------
        # Stage 1A: Gemini structuring
        # ----------------------------------------------------

        structured_spec = (
            structure_government_problem(
                req.raw_department_statement
            )
        )

        # ----------------------------------------------------
        # Stage 1B: Startup matching
        # ----------------------------------------------------

        matches = rank_startups(
            structured_spec,
            db
        )

        # ----------------------------------------------------
        # Save Match records
        # ----------------------------------------------------

        for match in matches:

            db_match = Match(
                challenge_id=challenge_id,
                startup_id=match.startup_id,
                match_score=round(
                    match.scores.overall_match_score
                ),
                justification=(
                    match.match_justification
                ),
            )

            db.add(db_match)

            # Get generated database ID immediately.
            db.flush()

            # CRITICAL:
            # Send Match ID to frontend.
            match.match_id = db_match.id

        db.commit()

        return MatchPipelineResponse(
            structured_specification=structured_spec,
            matched_candidates=matches,
        )

    except HTTPException:
        db.rollback()
        raise

    except Exception as e:

        db.rollback()

        print(
            f"Process demand failed: {e}"
        )

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


# ============================================================
# GET MATCHES FOR A CHALLENGE
# ============================================================

@app.get(
    "/api/v1/challenges/{challenge_id}/matches"
)
def get_matches(
    challenge_id: int,
    db: Session = Depends(get_db),
):

    matches = (
        db.query(Match)
        .filter(
            Match.challenge_id == challenge_id
        )
        .order_by(
            Match.match_score.desc()
        )
        .all()
    )

    return matches


# ============================================================
# STAGE 2
# READINESS AUDIT
# ============================================================

@app.post(
    "/api/v1/matches/{match_id}/readiness"
)
def create_readiness_assessment(
    match_id: int,
    db: Session = Depends(get_db),
):

    # --------------------------------------------------------
    # Get match
    # --------------------------------------------------------

    match = (
        db.query(Match)
        .filter(
            Match.id == match_id
        )
        .first()
    )

    if not match:

        raise HTTPException(
            status_code=404,
            detail="Match not found",
        )

    # --------------------------------------------------------
    # Get startup
    # --------------------------------------------------------

    startup = (
        db.query(Startup)
        .filter(
            Startup.id == match.startup_id
        )
        .first()
    )

    if not startup:

        raise HTTPException(
            status_code=404,
            detail="Startup not found",
        )

    # --------------------------------------------------------
    # Get challenge
    # --------------------------------------------------------

    challenge = (
        db.query(Challenge)
        .filter(
            Challenge.id == match.challenge_id
        )
        .first()
    )

    if not challenge:

        raise HTTPException(
            status_code=404,
            detail="Challenge not found",
        )

    # --------------------------------------------------------
    # Get challenge requirements
    # --------------------------------------------------------

    requirements = (
        db.query(ChallengeRequirement)
        .filter(
            ChallengeRequirement.challenge_id
            == challenge.id
        )
        .all()
    )

    technical_requirements = [
        item.requirement
        for item in requirements
    ]

    # --------------------------------------------------------
    # Build startup profile
    # --------------------------------------------------------

    startup_profile = {
        "id": startup.id,
        "name": startup.name,
        "dpiit_registered": (
            startup.dpiit_registered
        ),
        "trl_level": startup.trl_level,
        "past_deployments": (
            startup.past_deployments
        ),
        "active_litigation": (
            startup.active_litigation
        ),
        "capabilities": (
            startup.capabilities or ""
        ),
    }

    # --------------------------------------------------------
    # Build problem specification
    # --------------------------------------------------------

    problem = ProblemSpecification(
        domain=challenge.domain,

        summary=challenge.description,

        technical_requirements=(
            technical_requirements
        ),

        operational_constraints=[
            f"Pilot duration: "
            f"{challenge.duration_days} days."
        ],

        target_kpis=[
            "Measure pilot performance against "
            "baseline and target values."
        ],

        pilot_duration_days=(
            challenge.duration_days
        ),

        estimated_budget_inr=(
            challenge.budget_inr
        ),
    )

    # --------------------------------------------------------
    # Run AI readiness evaluation
    # --------------------------------------------------------

    report = evaluate_startup_risk(
        problem,
        startup_profile,
    )

    # --------------------------------------------------------
    # Save assessment
    # --------------------------------------------------------

    assessment = ReadinessAssessment(
        match_id=match.id,

        overall_score=int(
            round(
                report.overall_readiness_score
            )
        ),

        recommendation=(
            report.recommendation
        ),

        findings=json.dumps(
            {
                "technical_capability":
                    report.technical_capability.model_dump(),

                "deployment_readiness":
                    report.deployment_readiness.model_dump(),

                "compliance_security":
                    report.compliance_security.model_dump(),

                "financial_sustainability":
                    report.financial_sustainability.model_dump(),

                "pilot_feasibility":
                    report.pilot_feasibility.model_dump(),

                "suggested_sandbox_safeguards":
                    report.suggested_sandbox_safeguards,
            }
        ),
    )

    db.add(assessment)

    db.commit()

    db.refresh(assessment)

    return {
        "id": assessment.id,
        "match_id": assessment.match_id,
        "overall_score": assessment.overall_score,
        "recommendation": assessment.recommendation,
        "findings": json.loads(
            assessment.findings
        ) if assessment.findings else {},
    }


# ============================================================
# STAGE 3
# CREATE PILOT
# ============================================================

@app.post(
    "/api/v1/pilots"
)
def create_pilot(
    match_id: int,
    db: Session = Depends(get_db),
):

    # --------------------------------------------------------
    # Verify match
    # --------------------------------------------------------

    match = (
        db.query(Match)
        .filter(
            Match.id == match_id
        )
        .first()
    )

    if not match:

        raise HTTPException(
            status_code=404,
            detail="Match not found",
        )

    # --------------------------------------------------------
    # Verify readiness
    # --------------------------------------------------------

    readiness = (
        db.query(ReadinessAssessment)
        .filter(
            ReadinessAssessment.match_id
            == match_id
        )
        .order_by(
            ReadinessAssessment.id.desc()
        )
        .first()
    )

    if not readiness:

        raise HTTPException(
            status_code=404,
            detail=(
                "Readiness assessment not found. "
                "Run the readiness audit first."
            ),
        )

    # --------------------------------------------------------
    # Prevent duplicate active pilot
    # --------------------------------------------------------

    existing_pilot = (
        db.query(Pilot)
        .filter(
            Pilot.match_id == match_id
        )
        .order_by(
            Pilot.id.desc()
        )
        .first()
    )

    if existing_pilot:

        return existing_pilot

    # --------------------------------------------------------
    # Create pilot
    # --------------------------------------------------------

    pilot = Pilot(
        match_id=match_id,
        status="PLANNED",
    )

    db.add(pilot)

    db.commit()

    db.refresh(pilot)

    return pilot


# ============================================================
# GET PILOT
# ============================================================

@app.get(
    "/api/v1/pilots/{pilot_id}"
)
def get_pilot(
    pilot_id: int,
    db: Session = Depends(get_db),
):

    pilot = (
        db.query(Pilot)
        .filter(
            Pilot.id == pilot_id
        )
        .first()
    )

    if not pilot:

        raise HTTPException(
            status_code=404,
            detail="Pilot not found",
        )

    return pilot


# ============================================================
# CREATE KPI
# ============================================================

@app.post(
    "/api/v1/pilots/{pilot_id}/kpis"
)
def create_kpi(
    pilot_id: int,
    name: str,
    baseline: str,
    target: str,
    db: Session = Depends(get_db),
):

    pilot = (
        db.query(Pilot)
        .filter(
            Pilot.id == pilot_id
        )
        .first()
    )

    if not pilot:

        raise HTTPException(
            status_code=404,
            detail="Pilot not found",
        )

    if not name.strip():

        raise HTTPException(
            status_code=400,
            detail="KPI name cannot be empty",
        )

    kpi = KPI(
        pilot_id=pilot_id,
        name=name.strip(),
        baseline=baseline.strip(),
        target=target.strip(),
    )

    db.add(kpi)

    db.commit()

    db.refresh(kpi)

    return kpi


# ============================================================
# GET KPIS
# ============================================================

@app.get(
    "/api/v1/pilots/{pilot_id}/kpis"
)
def get_kpis(
    pilot_id: int,
    db: Session = Depends(get_db),
):

    pilot = (
        db.query(Pilot)
        .filter(
            Pilot.id == pilot_id
        )
        .first()
    )

    if not pilot:

        raise HTTPException(
            status_code=404,
            detail="Pilot not found",
        )

    return (
        db.query(KPI)
        .filter(
            KPI.pilot_id == pilot_id
        )
        .all()
    )


# ============================================================
# UPDATE KPI RESULT
# ============================================================

@app.post(
    "/api/v1/kpis/{kpi_id}/result"
)
def update_kpi_result(
    kpi_id: int,
    actual: str,
    db: Session = Depends(get_db),
):

    kpi = (
        db.query(KPI)
        .filter(
            KPI.id == kpi_id
        )
        .first()
    )

    if not kpi:

        raise HTTPException(
            status_code=404,
            detail="KPI not found",
        )

    kpi.actual = actual.strip()

    db.commit()

    db.refresh(kpi)

    return kpi


# ============================================================
# CREATE MILESTONE
# ============================================================

@app.post(
    "/api/v1/pilots/{pilot_id}/milestones"
)
def create_milestone(
    pilot_id: int,
    title: str,
    db: Session = Depends(get_db),
):

    pilot = (
        db.query(Pilot)
        .filter(
            Pilot.id == pilot_id
        )
        .first()
    )

    if not pilot:

        raise HTTPException(
            status_code=404,
            detail="Pilot not found",
        )

    if not title.strip():

        raise HTTPException(
            status_code=400,
            detail="Milestone title cannot be empty",
        )

    milestone = Milestone(
        pilot_id=pilot_id,
        title=title.strip(),
        status="PENDING",
    )

    db.add(milestone)

    db.commit()

    db.refresh(milestone)

    return milestone


# ============================================================
# GET MILESTONES
# ============================================================

@app.get(
    "/api/v1/pilots/{pilot_id}/milestones"
)
def get_milestones(
    pilot_id: int,
    db: Session = Depends(get_db),
):

    pilot = (
        db.query(Pilot)
        .filter(
            Pilot.id == pilot_id
        )
        .first()
    )

    if not pilot:

        raise HTTPException(
            status_code=404,
            detail="Pilot not found",
        )

    return (
        db.query(Milestone)
        .filter(
            Milestone.pilot_id == pilot_id
        )
        .all()
    )


# ============================================================
# COMPLETE MILESTONE
# ============================================================

@app.post(
    "/api/v1/milestones/{milestone_id}/complete"
)
def complete_milestone(
    milestone_id: int,
    db: Session = Depends(get_db),
):

    milestone = (
        db.query(Milestone)
        .filter(
            Milestone.id == milestone_id
        )
        .first()
    )

    if not milestone:

        raise HTTPException(
            status_code=404,
            detail="Milestone not found",
        )

    milestone.status = "COMPLETED"

    db.commit()

    db.refresh(milestone)

    return milestone

#new logic added for pilot evaluation and final decision making

def calculate_kpi_score(kpi):
    """
    Calculate KPI achievement from baseline, target and actual.

    If target > baseline:
        higher value is considered better.

    If target < baseline:
        lower value is considered better.

    Returns a score from 0 to 100.
    """

    try:
        baseline = float(kpi.baseline)
        target = float(kpi.target)
        actual = float(kpi.actual)
    except (TypeError, ValueError):
        return 0.0

    if actual is None:
        return 0.0

    # No meaningful target change
    if target == baseline:
        return 100.0 if actual == target else 0.0

    # Higher is better
    if target > baseline:
        progress = (
            (actual - baseline)
            / (target - baseline)
        ) * 100

    # Lower is better
    else:
        progress = (
            (baseline - actual)
            / (baseline - target)
        ) * 100

    return max(0.0, min(100.0, progress))

# ============================================================
# PILOT EVALUATION
# ============================================================

@app.post("/api/v1/pilots/{pilot_id}/evaluation")
def evaluate_pilot(
    pilot_id: int,
    db: Session = Depends(get_db)
):
    pilot = db.query(Pilot).filter(
        Pilot.id == pilot_id
    ).first()

    if not pilot:
        raise HTTPException(
            status_code=404,
            detail="Pilot not found"
        )

    kpis = db.query(KPI).filter(
        KPI.pilot_id == pilot_id
    ).all()

    milestones = db.query(Milestone).filter(
        Milestone.pilot_id == pilot_id
    ).all()

    # -------------------------
    # KPI SCORE
    # -------------------------

    kpi_scores = []

    for kpi in kpis:
        if kpi.actual is not None:
            kpi_scores.append(
                calculate_kpi_score(kpi)
            )

    measured_kpis = len(kpi_scores)
    total_kpis = len(kpis)

    if kpi_scores:
        kpi_score = sum(kpi_scores) / len(kpi_scores)
    else:
        kpi_score = 0.0

    # -------------------------
    # MILESTONE SCORE
    # -------------------------

    completed_milestones = sum(
        1
        for milestone in milestones
        if milestone.status == "COMPLETED"
    )

    total_milestones = len(milestones)

    milestone_score = (
        (completed_milestones / total_milestones) * 100
        if total_milestones > 0
        else 0.0
    )

    # -------------------------
    # OVERALL SCORE
    # -------------------------

    overall_score = (
        (kpi_score + milestone_score) / 2
    )

    # -------------------------
    # RECOMMENDATION
    # -------------------------

    if overall_score >= 75:
        recommendation = "READY_TO_SCALE"
    elif overall_score >= 50:
        recommendation = "EXTEND_PILOT"
    else:
        recommendation = "DO_NOT_SCALE"

    return {
        "pilot_id": pilot_id,
        "kpi_score": round(kpi_score, 2),
        "milestone_score": round(milestone_score, 2),
        "overall_score": round(overall_score, 2),
        "recommendation": recommendation,
        "kpis_measured": measured_kpis,
        "total_kpis": total_kpis,
        "milestones_completed": completed_milestones,
        "total_milestones": total_milestones
    }

# ============================================================
# FINAL DECISION
# ============================================================

@app.post("/api/v1/pilots/{pilot_id}/decision")
def create_final_decision(
    pilot_id: int,
    db: Session = Depends(get_db)
):
    pilot = db.query(Pilot).filter(
        Pilot.id == pilot_id
    ).first()

    if not pilot:
        raise HTTPException(
            status_code=404,
            detail="Pilot not found"
        )

    kpis = db.query(KPI).filter(
        KPI.pilot_id == pilot_id
    ).all()

    milestones = db.query(Milestone).filter(
        Milestone.pilot_id == pilot_id
    ).all()

    # KPI scores
    kpi_scores = [
        calculate_kpi_score(kpi)
        for kpi in kpis
        if kpi.actual is not None
    ]

    kpi_score = (
        sum(kpi_scores) / len(kpi_scores)
        if kpi_scores
        else 0.0
    )

    # Milestone score
    completed_milestones = sum(
        1
        for milestone in milestones
        if milestone.status == "COMPLETED"
    )

    total_milestones = len(milestones)

    milestone_score = (
        (completed_milestones / total_milestones) * 100
        if total_milestones > 0
        else 0.0
    )

    overall_score = (
        (kpi_score + milestone_score) / 2
    )

    if overall_score >= 75:
        decision = "SCALE"
        reason = (
            "Pilot achieved the required performance "
            "and milestone thresholds."
        )
    elif overall_score >= 50:
        decision = "EXTEND_PILOT"
        reason = (
            "Pilot showed partial performance and "
            "requires additional validation."
        )
    else:
        decision = "REJECT"
        reason = (
            "Pilot did not achieve the required "
            "performance threshold."
        )

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
        "decision": decision,
        "reason": reason,
        "overall_score": round(overall_score, 2),
        "id": final_decision.id
    }