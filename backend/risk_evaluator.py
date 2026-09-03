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

def evaluate_startup_risk(problem: ProblemSpecification, startup_profile: dict) -> InnovationReadinessReport:
    prompt_payload = f"""
    MUNICIPAL PROBLEM SPECIFICATION:
    {json.dumps(problem.model_dump(), indent=2)}

    CANDIDATE STARTUP VERIFIED DOSSIER:
    {json.dumps(startup_profile, indent=2)}
    """

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[RISK_EVAL_PROMPT, prompt_payload],
        config={
            "response_mime_type": "application/json",
            "response_schema": InnovationReadinessReport,
        },
    )
    
    return InnovationReadinessReport.model_validate_json(response.text)