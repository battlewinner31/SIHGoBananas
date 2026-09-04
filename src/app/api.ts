const BASE_URL = "http://localhost:8000/api/v1";


// ============================================================
// TYPES
// ============================================================

export interface ProblemSpecification {
  domain: string;
  summary: string;
  technical_requirements: string[];
  operational_constraints: string[];
  target_kpis: string[];
  pilot_duration_days: number;
  estimated_budget_inr?: number;
}


export interface ScoreBreakdown {
  tech_relevance_score: number;
  compliance_score: number;
  deployment_readiness_score: number;
  overall_match_score: number;
}


export interface StartupMatchResult {
  match_id?: number;
  startup_id: string;
  startup_name: string;
  scores: ScoreBreakdown;
  match_justification: string;
  flagged_gaps: string[];
}


export interface MatchPipelineResponse {
  structured_specification: ProblemSpecification;
  matched_candidates: StartupMatchResult[];
}


export interface ReadinessDimension {
  score: number;
  status:
    | "LOW_RISK"
    | "MODERATE_RISK"
    | "HIGH_RISK"
    | string;
  findings: string[];
}


export interface InnovationReadinessReport {
  id?: number;
  match_id?: number;

  startup_id: string;
  startup_name: string;

  overall_readiness_score: number;

  recommendation:
    | "PROCEED_TO_PILOT"
    | "CONDITIONAL_APPROVAL"
    | "REJECT"
    | string;

  technical_capability: ReadinessDimension;
  deployment_readiness: ReadinessDimension;
  compliance_security: ReadinessDimension;
  financial_sustainability: ReadinessDimension;
  pilot_feasibility: ReadinessDimension;

  suggested_sandbox_safeguards: string[];
}


export interface Pilot {
  id: number;
  match_id: number;
  status: string;
  start_date?: string | null;
  end_date?: string | null;
}


export interface KPI {
  id: number;
  pilot_id: number;
  name: string;
  baseline?: string | null;
  target?: string | null;
  actual?: string | null;
}


export interface Milestone {
  id: number;
  pilot_id: number;
  title: string;
  status: string;
}


export interface PilotEvaluation {
  pilot_id: number;
  kpi_score: number;
  milestone_score: number;
  overall_score: number;
  recommendation: string;
  kpis_measured: number;
  total_kpis: number;
  milestones_completed: number;
  total_milestones: number;
}


export interface FinalDecision {
  id: number;
  pilot_id: number;
  decision: string;
  reason: string;
  overall_score: number;
}


// ============================================================
// HELPER
// ============================================================

async function parseError(
  response: Response,
  fallback: string
): Promise<never> {

  const data = await response
    .json()
    .catch(() => ({}));

  throw new Error(
    data.detail ||
      data.message ||
      fallback
  );
}


// ============================================================
// STAGE 1
// PROCESS DEMAND
// ============================================================

export async function processDemand(
  rawStatement: string,
  challengeId: number
): Promise<MatchPipelineResponse> {

  const response = await fetch(
    `${BASE_URL}/process-demand?challenge_id=${challengeId}`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        raw_department_statement:
          rawStatement,
      }),
    }
  );

  if (!response.ok) {

    await parseError(
      response,
      `Stage 1 error: ${response.statusText}`
    );
  }

  return response.json();
}


// ============================================================
// STAGE 2
// READINESS AUDIT
// ============================================================

export async function auditReadiness(
  matchId: number
): Promise<InnovationReadinessReport> {

  const response = await fetch(
    `${BASE_URL}/matches/${matchId}/readiness`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {

    await parseError(
      response,
      `Stage 2 audit error: ${response.statusText}`
    );
  }

  const data = await response.json();

  // Backend stores detailed findings in a
  // JSON object. Convert that into the
  // frontend InnovationReadinessReport shape.

  return {
    id: data.id,
    match_id: data.match_id,

    startup_id:
      data.startup_id || "",

    startup_name:
      data.startup_name || "",

    overall_readiness_score:
      Number(data.overall_score ?? 0),

    recommendation:
      data.recommendation,

    technical_capability: {
      score:
        Number(
          data.findings
            ?.technical_capability
            ?.score ?? 0
        ),

      status:
        data.findings
          ?.technical_capability
          ?.status ?? "MODERATE_RISK",

      findings:
        data.findings
          ?.technical_capability
          ?.findings ?? [],
    },

    deployment_readiness: {
      score:
        Number(
          data.findings
            ?.deployment_readiness
            ?.score ?? 0
        ),

      status:
        data.findings
          ?.deployment_readiness
          ?.status ?? "MODERATE_RISK",

      findings:
        data.findings
          ?.deployment_readiness
          ?.findings ?? [],
    },

    compliance_security: {
      score:
        Number(
          data.findings
            ?.compliance_security
            ?.score ?? 0
        ),

      status:
        data.findings
          ?.compliance_security
          ?.status ?? "MODERATE_RISK",

      findings:
        data.findings
          ?.compliance_security
          ?.findings ?? [],
    },

    financial_sustainability: {
      score:
        Number(
          data.findings
            ?.financial_sustainability
            ?.score ?? 0
        ),

      status:
        data.findings
          ?.financial_sustainability
          ?.status ?? "MODERATE_RISK",

      findings:
        data.findings
          ?.financial_sustainability
          ?.findings ?? [],
    },

    pilot_feasibility: {
      score:
        Number(
          data.findings
            ?.pilot_feasibility
            ?.score ?? 0
        ),

      status:
        data.findings
          ?.pilot_feasibility
          ?.status ?? "MODERATE_RISK",

      findings:
        data.findings
          ?.pilot_feasibility
          ?.findings ?? [],
    },

    suggested_sandbox_safeguards:
      data.findings
        ?.suggested_sandbox_safeguards ?? [],
  };
}


// ============================================================
// PILOT
// ============================================================

export async function createPilot(
  matchId: number
): Promise<Pilot> {

  const response = await fetch(
    `${BASE_URL}/pilots?match_id=${matchId}`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {

    await parseError(
      response,
      `Pilot creation error: ${response.statusText}`
    );
  }

  return response.json();
}


export async function getPilot(
  pilotId: number
): Promise<Pilot> {

  const response = await fetch(
    `${BASE_URL}/pilots/${pilotId}`
  );

  if (!response.ok) {

    await parseError(
      response,
      `Pilot fetch error: ${response.statusText}`
    );
  }

  return response.json();
}


// ============================================================
// KPI
// ============================================================

export async function createKPI(
  pilotId: number,
  name: string,
  baseline: string,
  target: string
): Promise<KPI> {

  const params = new URLSearchParams();

  params.set("name", name);
  params.set("baseline", baseline);
  params.set("target", target);

  const response = await fetch(
    `${BASE_URL}/pilots/${pilotId}/kpis?${params.toString()}`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {

    await parseError(
      response,
      `KPI creation error: ${response.statusText}`
    );
  }

  return response.json();
}


export async function getKPIs(
  pilotId: number
): Promise<KPI[]> {

  const response = await fetch(
    `${BASE_URL}/pilots/${pilotId}/kpis`
  );

  if (!response.ok) {

    await parseError(
      response,
      `KPI fetch error: ${response.statusText}`
    );
  }

  return response.json();
}


export async function updateKPIResult(
  kpiId: number,
  actual: string
): Promise<KPI> {

  const params = new URLSearchParams();

  params.set("actual", actual);

  const response = await fetch(
    `${BASE_URL}/kpis/${kpiId}/result?${params.toString()}`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {

    await parseError(
      response,
      `KPI result error: ${response.statusText}`
    );
  }

  return response.json();
}


// ============================================================
// MILESTONES
// ============================================================

export async function createMilestone(
  pilotId: number,
  title: string
): Promise<Milestone> {

  const params = new URLSearchParams();

  params.set("title", title);

  const response = await fetch(
    `${BASE_URL}/pilots/${pilotId}/milestones?${params.toString()}`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {

    await parseError(
      response,
      `Milestone creation error: ${response.statusText}`
    );
  }

  return response.json();
}


export async function getMilestones(
  pilotId: number
): Promise<Milestone[]> {

  const response = await fetch(
    `${BASE_URL}/pilots/${pilotId}/milestones`
  );

  if (!response.ok) {

    await parseError(
      response,
      `Milestone fetch error: ${response.statusText}`
    );
  }

  return response.json();
}


export async function completeMilestone(
  milestoneId: number
): Promise<Milestone> {

  const response = await fetch(
    `${BASE_URL}/milestones/${milestoneId}/complete`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {

    await parseError(
      response,
      `Milestone completion error: ${response.statusText}`
    );
  }

  return response.json();
}


// ============================================================
// EVALUATION
// ============================================================

export async function evaluatePilot(
  pilotId: number
): Promise<PilotEvaluation> {

  const response = await fetch(
    `${BASE_URL}/pilots/${pilotId}/evaluation`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {

    await parseError(
      response,
      `Pilot evaluation error: ${response.statusText}`
    );
  }

  return response.json();
}


// ============================================================
// FINAL DECISION
// ============================================================

export async function createFinalDecision(
  pilotId: number
): Promise<FinalDecision> {

  const response = await fetch(
    `${BASE_URL}/pilots/${pilotId}/decision`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {

    await parseError(
      response,
      `Final decision error: ${response.statusText}`
    );
  }

  return response.json();
}