import os
import json

from dotenv import load_dotenv
from google import genai

from models import (
    InnovationReadinessReport,
    ProblemSpecification,
)

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


RISK_EVAL_PROMPT = """
You are a Senior Municipal Due Diligence and Public Procurement Risk Auditor
for Indian Urban Local Bodies (ULBs).

Analyze the startup's verified profile against the municipal problem statement.

Evaluate these 5 dimensions strictly:

1. Technical Capability:
Does their technology actually solve the core problem?

2. Deployment Readiness:
TRL 7+ is considered field-ready.
TRL below 6 requires controlled sandbox deployment.

3. Compliance & Security:
Consider DPIIT recognition, certifications, data residency,
GFR 173 eligibility, and legal risk.

4. Financial Sustainability:
Consider runway, debt, GST compliance and ability to
survive municipal payment cycles.

5. Pilot Feasibility:
Consider field constraints, infrastructure, connectivity,
hardware deployment, staffing and operational feasibility.

Return:
- scores from 0 to 100 for all five dimensions
- LOW_RISK / MODERATE_RISK / HIGH_RISK status
- concrete findings
- overall readiness score
- procurement recommendation
- sandbox safeguards

Allowed recommendations:

PROCEED_TO_PILOT
CONDITIONAL_APPROVAL
REJECT
"""


def fallback_readiness(
    problem: ProblemSpecification,
    startup_profile: dict
) -> InnovationReadinessReport:

    trl = startup_profile.get(
        "trl_level"
    ) or 0

    dpiit = startup_profile.get(
        "dpiit_registered",
        False
    )

    deployments = startup_profile.get(
        "past_deployments"
    ) or 0

    litigation = startup_profile.get(
        "active_litigation",
        False
    )

    capabilities = startup_profile.get(
        "capabilities"
    ) or ""

    # ---------------------------------------------------------
    # TECHNICAL CAPABILITY
    # ---------------------------------------------------------

    technical_score = 70.0 if capabilities else 40.0

    technical_findings = []

    if capabilities:
        technical_findings.append(
            "Startup capability information is available for evaluation."
        )
    else:
        technical_findings.append(
            "Startup capability information is limited."
        )

    if problem.technical_requirements:
        technical_findings.append(
            f"{len(problem.technical_requirements)} technical "
            "requirements were identified in the challenge."
        )

    # ---------------------------------------------------------
    # DEPLOYMENT READINESS
    # ---------------------------------------------------------

    if trl >= 8:
        deployment_score = 95.0
        deployment_status = "LOW_RISK"
    elif trl >= 7:
        deployment_score = 85.0
        deployment_status = "LOW_RISK"
    elif trl >= 6:
        deployment_score = 65.0
        deployment_status = "MODERATE_RISK"
    else:
        deployment_score = 40.0
        deployment_status = "HIGH_RISK"

    deployment_findings = [
        f"Startup has TRL-{trl}.",
        "TRL 7+ is considered field-ready.",
    ]

    # ---------------------------------------------------------
    # COMPLIANCE
    # ---------------------------------------------------------

    if dpiit and not litigation:
        compliance_score = 95.0
        compliance_status = "LOW_RISK"

        compliance_findings = [
            "DPIIT registration is reported.",
            "No active litigation is reported.",
        ]

    elif dpiit and litigation:
        compliance_score = 55.0
        compliance_status = "MODERATE_RISK"

        compliance_findings = [
            "DPIIT registration is reported.",
            "Active litigation requires legal review.",
        ]

    else:
        compliance_score = 35.0
        compliance_status = "HIGH_RISK"

        compliance_findings = [
            "DPIIT registration is not reported.",
            "Additional procurement eligibility review is required.",
        ]

    # ---------------------------------------------------------
    # FINANCIAL SUSTAINABILITY
    # ---------------------------------------------------------

    financial_score = 60.0

    financial_findings = [
        "Financial sustainability requires verification of runway.",
        "Debt obligations should be reviewed.",
        "GST compliance should be verified.",
        "Municipal payment-cycle readiness should be confirmed.",
    ]

    # ---------------------------------------------------------
    # PILOT FEASIBILITY
    # ---------------------------------------------------------

    if trl >= 7 and deployments >= 1:
        pilot_score = 85.0
        pilot_status = "LOW_RISK"
    elif trl >= 6:
        pilot_score = 65.0
        pilot_status = "MODERATE_RISK"
    else:
        pilot_score = 40.0
        pilot_status = "HIGH_RISK"

    pilot_findings = [
        f"TRL-{trl} with {deployments} previous deployment(s).",
        "Pilot should use measurable KPIs.",
        "Deployment should be staged before city-wide rollout.",
    ]

    # ---------------------------------------------------------
    # OVERALL SCORE
    # ---------------------------------------------------------

    overall_score = round(
        (
            technical_score * 0.25
            + deployment_score * 0.25
            + compliance_score * 0.20
            + financial_score * 0.15
            + pilot_score * 0.15
        ),
        2,
    )

    if overall_score >= 75:
        recommendation = "PROCEED_TO_PILOT"
    elif overall_score >= 50:
        recommendation = "CONDITIONAL_APPROVAL"
    else:
        recommendation = "REJECT"

    if overall_score >= 75:
        overall_safeguards = [
            "Define measurable pilot KPIs.",
            "Require periodic municipal progress reports.",
            "Use staged deployment before city-wide rollout.",
            "Include data security and exit clauses.",
        ]
    elif overall_score >= 50:
        overall_safeguards = [
            "Require additional compliance verification.",
            "Define measurable pilot KPIs.",
            "Use milestone-based pilot approval.",
            "Require periodic municipal progress reports.",
            "Include data security and exit clauses.",
        ]
    else:
        overall_safeguards = [
            "Do not proceed to full municipal deployment.",
            "Resolve identified compliance and readiness gaps.",
            "Require additional technical validation.",
        ]

    return InnovationReadinessReport(
        startup_id=str(
            startup_profile.get("id")
        ),
        startup_name=str(
            startup_profile.get("name")
        ),
        overall_readiness_score=overall_score,
        recommendation=recommendation,

        technical_capability={
            "score": technical_score,
            "status": (
                "LOW_RISK"
                if technical_score >= 75
                else "MODERATE_RISK"
                if technical_score >= 50
                else "HIGH_RISK"
            ),
            "findings": technical_findings,
        },

        deployment_readiness={
            "score": deployment_score,
            "status": deployment_status,
            "findings": deployment_findings,
        },

        compliance_security={
            "score": compliance_score,
            "status": compliance_status,
            "findings": compliance_findings,
        },

        financial_sustainability={
            "score": financial_score,
            "status": "MODERATE_RISK",
            "findings": financial_findings,
        },

        pilot_feasibility={
            "score": pilot_score,
            "status": pilot_status,
            "findings": pilot_findings,
        },

        suggested_sandbox_safeguards=overall_safeguards,
    )


def evaluate_startup_risk(
    problem: ProblemSpecification,
    startup_profile: dict
) -> InnovationReadinessReport:

    prompt_payload = f"""
MUNICIPAL PROBLEM SPECIFICATION:

{json.dumps(
    problem.model_dump(),
    indent=2
)}

CANDIDATE STARTUP VERIFIED DOSSIER:

{json.dumps(
    startup_profile,
    indent=2
)}
"""

    try:
        response = client.models.generate_content(
            model="gemini-3.6-flash",
            contents=[
                RISK_EVAL_PROMPT,
                prompt_payload,
            ],
            config={
                "response_mime_type": "application/json",
                "response_schema": InnovationReadinessReport,
            },
        )

        if not response.text:
            raise ValueError(
                "Gemini returned an empty readiness response."
            )

        return InnovationReadinessReport.model_validate_json(
            response.text
        )

    except Exception as e:

        print(
            f"Gemini readiness evaluation unavailable: {e}"
        )

        print(
            "Using rule-based readiness fallback."
        )

        return fallback_readiness(
            problem,
            startup_profile,
        )