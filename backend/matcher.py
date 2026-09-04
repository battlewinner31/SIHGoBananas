from typing import List

from models import (
    ProblemSpecification,
    StartupMatchResult,
    ScoreBreakdown,
)

from db.models import Startup


def calculate_match(
    problem: ProblemSpecification,
    startup: dict
) -> StartupMatchResult:

    has_litigation = startup.get(
        "active_litigation",
        False
    )

    is_dpiit = startup.get(
        "dpiit_registered",
        False
    )

    # ---------------------------------------------------------
    # COMPLIANCE SCORE
    # ---------------------------------------------------------

    if is_dpiit and not has_litigation:
        compliance_score = 100.0
    elif is_dpiit:
        compliance_score = 40.0
    else:
        compliance_score = 15.0

    # ---------------------------------------------------------
    # CAPABILITY MATCHING
    # ---------------------------------------------------------

    matched_reqs = []
    gaps = []

    capabilities = startup.get(
        "capabilities",
        []
    )

    if isinstance(capabilities, str):
        capabilities = capabilities.split(",")

    all_caps = " ".join(
        str(capability)
        for capability in capabilities
    ).lower()

    requirements = problem.technical_requirements or []

    for req in requirements:

        keywords = [
            word.lower()
            for word in req.split()
            if len(word) > 3
        ]

        match_found = any(
            keyword in all_caps
            for keyword in keywords
        )

        if match_found:
            matched_reqs.append(req)
        else:
            gaps.append(req)

    tech_score = round(
        (
            len(matched_reqs)
            / max(len(requirements), 1)
        ) * 100,
        2
    )

    # ---------------------------------------------------------
    # DEPLOYMENT READINESS
    # ---------------------------------------------------------

    trl = startup.get(
        "trl_level",
        0
    ) or 0

    readiness_score = round(
        min(
            100.0,
            (trl / 9.0) * 100
        ),
        2
    )

    # ---------------------------------------------------------
    # OVERALL SCORE
    # ---------------------------------------------------------

    overall = round(
        (tech_score * 0.50)
        + (compliance_score * 0.30)
        + (readiness_score * 0.20),
        2
    )

    dpiit_text = (
        "Verified (Eligible for GFR 173 waiver)"
        if is_dpiit
        else "Not verified"
    )

    litigation_text = (
        "Active litigation reported"
        if has_litigation
        else "No active litigation reported"
    )

    justification = (
        f"Matches {len(matched_reqs)}/"
        f"{len(requirements)} technical requirements. "
        f"DPIIT Compliance: {dpiit_text}. "
        f"Legal Status: {litigation_text}. "
        f"Readiness: TRL-{trl}."
    )

    return StartupMatchResult(
        startup_id=startup["id"],
        startup_name=startup["name"],
        scores=ScoreBreakdown(
            tech_relevance_score=tech_score,
            compliance_score=compliance_score,
            deployment_readiness_score=readiness_score,
            overall_match_score=overall,
        ),
        match_justification=justification,
        flagged_gaps=gaps,
    )


def get_startups_from_db(db):
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
            "capabilities": (
                startup.capabilities.split(",")
                if startup.capabilities
                else []
            ),
        }
        for startup in startups
    ]


def rank_startups(
    problem: ProblemSpecification,
    db
) -> List[StartupMatchResult]:

    startups = get_startups_from_db(db)

    results = [
        calculate_match(
            problem,
            startup
        )
        for startup in startups
    ]

    return sorted(
        results,
        key=lambda result: (
            result.scores.overall_match_score
        ),
        reverse=True,
    )