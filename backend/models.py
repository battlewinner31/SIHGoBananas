from typing import List, Optional

from pydantic import BaseModel, Field


class ProblemSpecification(BaseModel):
    domain: str = Field(
        description="Sub-domain, e.g., Solid Waste Management"
    )

    summary: str = Field(
        description="Formal 1-sentence technical requirement"
    )

    technical_requirements: List[str] = Field(
        description="Hard technical specifications needed"
    )

    operational_constraints: List[str] = Field(
        description="Legal, timeline, or environmental constraints"
    )

    target_kpis: List[str] = Field(
        description="Measurable success criteria for a pilot"
    )

    pilot_duration_days: int = Field(
        default=90,
        description="Recommended sandbox duration"
    )

    estimated_budget_inr: Optional[int] = Field(
        default=500000,
        description="Estimated pilot budget cap"
    )


class ScoreBreakdown(BaseModel):
    tech_relevance_score: float = Field(
        description="0 to 100 based on capability alignment"
    )

    compliance_score: float = Field(
        description="0 to 100 based on DPIIT/GFR eligibility"
    )

    deployment_readiness_score: float = Field(
        description="0 to 100 based on TRL and past pilots"
    )

    overall_match_score: float = Field(
        description="Weighted combined score"
    )


class StartupMatchResult(BaseModel):
    # This is the ID of the Match database record.
    # It is required for readiness, pilot, KPI, etc.
    match_id: Optional[int] = None

    startup_id: str
    startup_name: str

    scores: ScoreBreakdown

    match_justification: str = Field(
        description="Audit justification for government procurement officers"
    )

    flagged_gaps: List[str] = Field(
        description="Missing capabilities or non-compliances"
    )


class ReadinessDimension(BaseModel):
    score: float = Field(
        description="Score out of 100"
    )

    status: str = Field(
        description="LOW_RISK, MODERATE_RISK, or HIGH_RISK"
    )

    findings: List[str] = Field(
        description="Concrete justifications and audit flags"
    )


class InnovationReadinessReport(BaseModel):
    startup_id: str

    startup_name: str

    overall_readiness_score: float = Field(
        description="Composite score out of 100"
    )

    recommendation: str = Field(
        description=(
            "PROCEED_TO_PILOT, CONDITIONAL_APPROVAL, or REJECT"
        )
    )

    technical_capability: ReadinessDimension

    deployment_readiness: ReadinessDimension

    compliance_security: ReadinessDimension

    financial_sustainability: ReadinessDimension

    pilot_feasibility: ReadinessDimension

    suggested_sandbox_safeguards: List[str] = Field(
        description="Specific milestones/clauses for the ULB contract"
    )