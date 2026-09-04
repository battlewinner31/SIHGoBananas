const BASE_URL = "http://localhost:8000/api/v1";

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
  status: "LOW_RISK" | "MODERATE_RISK" | "HIGH_RISK" | string;
  findings: string[];
}

export interface InnovationReadinessReport {
  startup_id: string;
  startup_name: string;
  overall_readiness_score: number;
  recommendation: "PROCEED_TO_PILOT" | "CONDITIONAL_APPROVAL" | "REJECT" | string;
  technical_capability: ReadinessDimension;
  deployment_readiness: ReadinessDimension;
  compliance_security: ReadinessDimension;
  financial_sustainability: ReadinessDimension;
  pilot_feasibility: ReadinessDimension;
  suggested_sandbox_safeguards: string[];
}

export async function processDemand(rawStatement: string): Promise<MatchPipelineResponse> {
  const response = await fetch(`${BASE_URL}/process-demand`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ raw_department_statement: rawStatement }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.detail || `Stage 1 error: ${response.statusText}`);
  }

  return response.json();
}

export async function auditReadiness(
  problemSpec: ProblemSpecification,
  startupId: string
): Promise<InnovationReadinessReport> {
  const response = await fetch(`${BASE_URL}/audit-readiness`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ problem_spec: problemSpec, startup_id: startupId }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.detail || `Stage 2 audit error: ${response.statusText}`);
  }

  return response.json();
}