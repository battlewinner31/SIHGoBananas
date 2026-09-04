import os
import json
from dotenv import load_dotenv
from google import genai
from models import InnovationReadinessReport, ProblemSpecification

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

RISK_EVAL_PROMPT = """
You are a Senior Municipal Due Diligence and Public Procurement Risk Auditor for Indian Urban Local Bodies (ULBs).
Analyze the startup's verified profile against the municipal problem statement.

Evaluate these 5 dimensions strictly:
1. Technical Capability: Does their proprietary tech actually solve the core problem without being generic re-packaged hardware?
2. Deployment Readiness: Technology Readiness Level (TRL 7+ is field-ready; TRL < 6 requires controlled lab sandbox).
3. Compliance & Security: DPIIT recognition, ISO certifications, data residency in India, GFR 173 waiver eligibility.
4. Financial Sustainability: Runway (>6 months needed for municipal payment cycles), debt, GST regular filings.
5. Pilot Feasibility: Field constraints (dust, water/leachate, rough terrain, offline cellular sync on collection trucks).

Return an outcome-based procurement recommendation and protective contractual safeguards for the Municipal Commissioner.
"""


def fallback_readiness(problem: ProblemSpecification, startup_profile: dict):
    """
    Rule-based fallback used when Gemini is temporarily unavailable.
    Keeps the readiness pipeline working during temporary AI outages.
    """

    trl = startup_profile.get("trl_level") or 0
    dpiit = startup_profile.get("dpiit_registered", False)
    deployments = startup_profile.get("past_deployments") or 0
    litigation = startup_profile.get("active_litigation", False)
    capabilities = startup_profile.get("capabilities") or ""

    # Start with a neutral score.
    score = 50

    # Deployment readiness
    if trl >= 8:
        score += 20
    elif trl >= 7:
        score += 15
    elif trl >= 6:
        score += 5
    else:
        score -= 10

    # DPIIT compliance
    if dpiit:
        score += 10
    else:
        score -= 5

    # Previous deployments
    if deployments >= 3:
        score += 10
    elif deployments >= 1:
        score += 5

    # Active litigation is a major risk
    if litigation:
        score -= 20

    score = max(0, min(100, score))

    if score >= 75:
        recommendation = "PROCEED_TO_PILOT"
    elif score >= 50:
        recommendation = "PROCEED_WITH_SAFEGUARDS"
    else:
        recommendation = "DO_NOT_PROCEED"

    # Build the exact structure expected by InnovationReadinessReport.
    return InnovationReadinessReport(
        startup_id=startup_profile.get("id"),
        startup_name=startup_profile.get("name"),
        overall_readiness_score=score,
        recommendation=recommendation,

        technical_capability={
            "status": "PASS" if capabilities else "REVIEW",
            "findings": (
                "Verified startup capabilities are available for evaluation."
                if capabilities
                else "Startup capability information is limited."
            ),
        },

        deployment_readiness={
            "status": (
                "PASS" if trl >= 7
                else "REVIEW" if trl >= 6
                else "RISK"
            ),
            "findings": f"Startup has TRL-{trl}. TRL 7+ is considered field-ready.",
        },

        compliance_security={
            "status": "PASS" if dpiit and not litigation else "REVIEW",
            "findings": (
                "DPIIT registration verified and no active litigation reported."
                if dpiit and not litigation
                else "Additional compliance or legal review is recommended."
            ),
        },

        financial_sustainability={
            "status": "REVIEW",
            "findings": (
                "Financial sustainability requires verification of runway, "
                "debt obligations, GST compliance and municipal payment-cycle readiness."
            ),
        },

        pilot_feasibility={
            "status": (
                "PASS" if trl >= 7 and deployments >= 1
                else "REVIEW"
            ),
            "findings": (
                f"TRL-{trl} with {deployments} previous deployment(s). "
                "Pilot should use measurable KPIs and staged deployment."
            ),
        },

        suggested_sandbox_safeguards=[
            "Define measurable pilot KPIs.",
            "Require periodic municipal progress reports.",
            "Use staged deployment before city-wide rollout.",
            "Include data security and exit clauses in the pilot agreement.",
        ],
    )

def evaluate_startup_risk(
    problem: ProblemSpecification,
    startup_profile: dict
) -> InnovationReadinessReport:

    prompt_payload = f"""
    MUNICIPAL PROBLEM SPECIFICATION:
    {json.dumps(problem.model_dump(), indent=2)}

    CANDIDATE STARTUP VERIFIED DOSSIER:
    {json.dumps(startup_profile, indent=2)}
    """

    try:
        response = client.models.generate_content(
            model="gemini-3.6-flash",
            contents=[RISK_EVAL_PROMPT, prompt_payload],
            config={
                "response_mime_type": "application/json",
                "response_schema": InnovationReadinessReport,
            },
        )

        return InnovationReadinessReport.model_validate_json(response.text)

    except Exception as e:
        print(f"Gemini readiness evaluation unavailable: {e}")
        print("Using rule-based readiness fallback.")

        return fallback_readiness(
            problem,
            startup_profile
        )