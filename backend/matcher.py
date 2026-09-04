from typing import List
from models import ProblemSpecification, StartupMatchResult, ScoreBreakdown

from db.database import SessionLocal
from db.models import Startup

MOCK_STARTUP_DB = [
    
    {
        "id": "ST-002",
        "name": "EcoRoute Fleet Systems",
        "dpiit_registered": True,
        "trl_level": 8,
        "capabilities": [
            "municipal route dynamic optimization",
            "gps bin sensor monitoring",
            "fuel consumption anomaly detection"
        ],
        "past_deployments": 5,
        "active_litigation": False
    },
    {
        "id": "ST-003",
        "name": "Apex Infra Suppliers",
        "dpiit_registered": False,
        "trl_level": 3,
        "capabilities": [
            "supplying manual dustbins and tipper trucks"
        ],
        "past_deployments": 0,
        "active_litigation": False
    },
    # Add these detailed fields to your candidates in matcher.py:
    {
    "id": "ST-001",
    "name": "SwachhTech AI Solutions",
    "dpiit_registered": True,
    "incorporation_year": 2024,
    "trl_level": 7,
    "ip_status": "Patent Pending (Edge AI Segregation Sensor)",
    "capabilities": [
        "edge ai computer vision on collection tippers",
        "real-time wet and dry waste segregation detection",
        "offline inference with cellular sync"
    ],
    "financials": {
        "annual_turnover_inr": 2400000,
        "cash_runway_months": 11,
        "gst_compliant": True,
        "active_loans": False
    },
    "compliance": {
        "iso_27001_certified": True,
        "data_stored_in_india": True,
        "blacklisted_any_state": False
    },
    "past_deployments": 2
    }
]

def calculate_match(problem: ProblemSpecification, startup: dict) -> StartupMatchResult:
    has_litigation = startup.get("active_litigation", False)
    is_dpiit = startup.get("dpiit_registered", False)

    compliance_score = 100.0 if is_dpiit and not has_litigation else 15.0

    matched_reqs = []
    gaps = []
    all_caps = " ".join(startup["capabilities"]).lower()

    for req in problem.technical_requirements:
        keywords = [w.lower() for w in req.split() if len(w) > 3]
        match_found = any(kw in all_caps for kw in keywords)
        if match_found:
            matched_reqs.append(req)
        else:
            gaps.append(req)

    tech_score = round((len(matched_reqs) / max(len(problem.technical_requirements), 1)) * 100, 2)
    readiness_score = round(min(100.0, (startup["trl_level"] / 9.0) * 100), 2)
    overall = round((tech_score * 0.50) + (compliance_score * 0.30) + (readiness_score * 0.20), 2)

    justification = (
        f"Matches {len(matched_reqs)}/{len(problem.technical_requirements)} technical requirements. "
        f"DPIIT Compliance: {'Verified (Eligible for GFR 173 waiver)' if startup['dpiit_registered'] else 'Failed (Shell/Non-DPIIT)'}. "
        f"Readiness: TRL-{startup['trl_level']}."
    )

    return StartupMatchResult(
        startup_id=startup["id"],
        startup_name=startup["name"],
        scores=ScoreBreakdown(
            tech_relevance_score=tech_score,
            compliance_score=compliance_score,
            deployment_readiness_score=readiness_score,
            overall_match_score=overall
        ),
        match_justification=justification,
        flagged_gaps=gaps
    )

def get_startups_from_db():
    db = SessionLocal()

    try:
        startups = db.query(Startup).all()

        return [
            {
                "id": startup.id,
                "name": startup.name,
                "dpiit_registered": startup.dpiit_registered,
                "trl_level": startup.trl_level,
                "past_deployments": startup.past_deployments,
                "active_litigation": startup.active_litigation,
                "capabilities": (
                    startup.capabilities.split(",")
                    if startup.capabilities
                    else []
                ),
            }
            for startup in startups
        ]
    finally:
        db.close()

def rank_startups(problem: ProblemSpecification) -> List[StartupMatchResult]:
    startups = get_startups_from_db()

    results = [calculate_match(problem, s) for s in startups]

    return sorted(
        results,
        key=lambda x: x.scores.overall_match_score,
        reverse=True
    )