from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

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


# --- Endpoint 1: Match & Structure (Discovery Stage) ---
@app.post("/api/v1/process-demand", response_model=MatchPipelineResponse)
async def process_demand(req: MatchPipelineRequest):
    structured_spec = structure_government_problem(req.raw_department_statement)
    matches = rank_startups(structured_spec)
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