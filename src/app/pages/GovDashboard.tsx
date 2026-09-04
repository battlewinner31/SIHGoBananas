import { useState } from "react";
import { Link } from "react-router";

import {
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Loader2,
  FileText,
  PlayCircle,
  Target,
  CheckCircle2,
  Plus,
  ClipboardCheck,
  Trophy,
} from "lucide-react";

import {
  processDemand,
  auditReadiness,
  createPilot,
  createKPI,
  updateKPIResult,
  createMilestone,
  completeMilestone,
  evaluatePilot,
  createFinalDecision,
  type ProblemSpecification,
  type StartupMatchResult,
  type InnovationReadinessReport,
  type Pilot,
  type KPI,
  type Milestone,
  type PilotEvaluation,
  type FinalDecision,
} from "../api";


export function GovDashboard() {

  // ==========================================================
  // STAGE 1
  // ==========================================================

  const [statement, setStatement] =
    useState("");

  const DEMO_CHALLENGE_ID = 1;

  const [isLoading, setIsLoading] =
    useState(false);

  const [spec, setSpec] =
    useState<ProblemSpecification | null>(
      null
    );

  const [matches, setMatches] =
    useState<StartupMatchResult[]>([]);

  const [error, setError] =
    useState<string | null>(null);


  // ==========================================================
  // STAGE 2
  // ==========================================================

  const [
    selectedMatchId,
    setSelectedMatchId,
  ] = useState<number | null>(null);

  const [
    selectedStartupId,
    setSelectedStartupId,
  ] = useState<string | null>(null);

  const [
    auditLoading,
    setAuditLoading,
  ] = useState(false);

  const [
    auditReport,
    setAuditReport,
  ] = useState<InnovationReadinessReport | null>(
    null
  );


  // ==========================================================
  // STAGE 3
  // PILOT
  // ==========================================================

  const [pilot, setPilot] =
    useState<Pilot | null>(null);

  const [
    pilotLoading,
    setPilotLoading,
  ] = useState(false);


  // ==========================================================
  // KPI
  // ==========================================================

  const [kpis, setKpis] =
    useState<KPI[]>([]);

  const [kpiName, setKpiName] =
    useState("");

  const [kpiBaseline, setKpiBaseline] =
    useState("");

  const [kpiTarget, setKpiTarget] =
    useState("");

  const [kpiActuals, setKpiActuals] =
    useState<Record<number, string>>({});

  const [kpiLoading, setKpiLoading] =
    useState(false);


  // ==========================================================
  // MILESTONES
  // ==========================================================

  const [milestones, setMilestones] =
    useState<Milestone[]>([]);

  const [milestoneTitle, setMilestoneTitle] =
    useState("");

  const [
    milestoneLoading,
    setMilestoneLoading,
  ] = useState(false);


  // ==========================================================
  // EVALUATION
  // ==========================================================

  const [
    evaluation,
    setEvaluation,
  ] = useState<PilotEvaluation | null>(
    null
  );

  const [
    finalDecision,
    setFinalDecision,
  ] = useState<FinalDecision | null>(
    null
  );

  const [
    evaluationLoading,
    setEvaluationLoading,
  ] = useState(false);


  // ==========================================================
  // STAGE 1
  // ==========================================================

  const handleProcessDemand = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (!statement.trim()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    setSpec(null);
    setMatches([]);

    setAuditReport(null);
    setSelectedMatchId(null);
    setSelectedStartupId(null);

    setPilot(null);
    setKpis([]);
    setMilestones([]);
    setEvaluation(null);
    setFinalDecision(null);

    try {

      const response =
        await processDemand(
          statement,
          DEMO_CHALLENGE_ID
        );

      setSpec(
        response.structured_specification
      );

      setMatches(
        response.matched_candidates
      );

    } catch (err: any) {

      console.error(
        "Stage 1 error:",
        err
      );

      setError(
        err.message ||
          "Failed to process challenge statement."
      );

    } finally {

      setIsLoading(false);
    }
  };


  // ==========================================================
  // STAGE 2
  // READINESS AUDIT
  // ==========================================================

  const handleRunAudit = async (
    startup: StartupMatchResult
  ) => {

    if (startup.match_id == null) {

      setError(
        "This startup does not have a valid database match ID."
      );

      return;
    }

    setSelectedMatchId(
      startup.match_id
    );

    setSelectedStartupId(
      startup.startup_id
    );

    setAuditLoading(true);
    setError(null);

    setPilot(null);
    setKpis([]);
    setMilestones([]);
    setEvaluation(null);
    setFinalDecision(null);

    try {

      const report =
        await auditReadiness(
          startup.match_id
        );

      // Ensure frontend has the startup
      // information even if backend's
      // stored assessment response doesn't.
      const completeReport = {
        ...report,

        startup_id:
          report.startup_id ||
          startup.startup_id,

        startup_name:
          report.startup_name ||
          startup.startup_name,

        match_id:
          report.match_id ||
          startup.match_id,
      };

      setAuditReport(
        completeReport
      );

    } catch (err: any) {

      console.error(
        "Readiness audit error:",
        err
      );

      setError(
        err.message ||
          "Failed to complete readiness audit."
      );

    } finally {

      setAuditLoading(false);
    }
  };


  // ==========================================================
  // CREATE PILOT
  // ==========================================================

  const handleCreatePilot = async () => {

    if (selectedMatchId == null) {

      setError(
        "No startup match is selected."
      );

      return;
    }

    setPilotLoading(true);
    setError(null);

    try {

      const createdPilot =
        await createPilot(
          selectedMatchId
        );

      setPilot(
        createdPilot
      );

      setKpis([]);
      setMilestones([]);
      setEvaluation(null);
      setFinalDecision(null);

    } catch (err: any) {

      console.error(
        "Pilot creation error:",
        err
      );

      setError(
        err.message ||
          "Failed to create pilot."
      );

    } finally {

      setPilotLoading(false);
    }
  };


  // ==========================================================
  // CREATE KPI
  // ==========================================================

  const handleCreateKPI = async () => {

    if (!pilot) {
      return;
    }

    if (
      !kpiName.trim() ||
      !kpiBaseline.trim() ||
      !kpiTarget.trim()
    ) {

      setError(
        "Enter KPI name, baseline and target."
      );

      return;
    }

    setKpiLoading(true);
    setError(null);

    try {

      const kpi =
        await createKPI(
          pilot.id,
          kpiName,
          kpiBaseline,
          kpiTarget
        );

      setKpis(
        (current) => [
          ...current,
          kpi,
        ]
      );

      setKpiName("");
      setKpiBaseline("");
      setKpiTarget("");

    } catch (err: any) {

      console.error(
        "KPI creation error:",
        err
      );

      setError(
        err.message ||
          "Failed to create KPI."
      );

    } finally {

      setKpiLoading(false);
    }
  };


  // ==========================================================
  // UPDATE KPI ACTUAL
  // ==========================================================

  const handleUpdateKPI = async (
    kpiId: number
  ) => {

    const actual =
      kpiActuals[kpiId];

    if (!actual?.trim()) {

      setError(
        "Enter an actual KPI result first."
      );

      return;
    }

    setKpiLoading(true);
    setError(null);

    try {

      const updated =
        await updateKPIResult(
          kpiId,
          actual
        );

      setKpis(
        (current) =>
          current.map(
            (kpi) =>
              kpi.id === kpiId
                ? updated
                : kpi
          )
      );

    } catch (err: any) {

      console.error(
        "KPI result error:",
        err
      );

      setError(
        err.message ||
          "Failed to update KPI."
      );

    } finally {

      setKpiLoading(false);
    }
  };


  // ==========================================================
  // CREATE MILESTONE
  // ==========================================================

  const handleCreateMilestone =
    async () => {

      if (!pilot) {
        return;
      }

      if (!milestoneTitle.trim()) {

        setError(
          "Enter a milestone title."
        );

        return;
      }

      setMilestoneLoading(true);
      setError(null);

      try {

        const milestone =
          await createMilestone(
            pilot.id,
            milestoneTitle
          );

        setMilestones(
          (current) => [
            ...current,
            milestone,
          ]
        );

        setMilestoneTitle("");

      } catch (err: any) {

        console.error(
          "Milestone creation error:",
          err
        );

        setError(
          err.message ||
            "Failed to create milestone."
        );

      } finally {

        setMilestoneLoading(false);
      }
    };


  // ==========================================================
  // COMPLETE MILESTONE
  // ==========================================================

  const handleCompleteMilestone =
    async (
      milestoneId: number
    ) => {

      setMilestoneLoading(true);
      setError(null);

      try {

        const updated =
          await completeMilestone(
            milestoneId
          );

        setMilestones(
          (current) =>
            current.map(
              (milestone) =>
                milestone.id === milestoneId
                  ? updated
                  : milestone
            )
        );

      } catch (err: any) {

        console.error(
          "Milestone completion error:",
          err
        );

        setError(
          err.message ||
            "Failed to complete milestone."
        );

      } finally {

        setMilestoneLoading(false);
      }
    };


  // ==========================================================
  // EVALUATE PILOT
  // ==========================================================

  const handleEvaluatePilot =
    async () => {

      if (!pilot) {
        return;
      }

      setEvaluationLoading(true);
      setError(null);

      try {

        const result =
          await evaluatePilot(
            pilot.id
          );

        setEvaluation(
          result
        );

        setFinalDecision(null);

      } catch (err: any) {

        console.error(
          "Pilot evaluation error:",
          err
        );

        setError(
          err.message ||
            "Failed to evaluate pilot."
        );

      } finally {

        setEvaluationLoading(false);
      }
    };


  // ==========================================================
  // FINAL DECISION
  // ==========================================================

  const handleFinalDecision =
    async () => {

      if (!pilot) {
        return;
      }

      setEvaluationLoading(true);
      setError(null);

      try {

        const decision =
          await createFinalDecision(
            pilot.id
          );

        setFinalDecision(
          decision
        );

      } catch (err: any) {

        console.error(
          "Final decision error:",
          err
        );

        setError(
          err.message ||
            "Failed to create final decision."
        );

      } finally {

        setEvaluationLoading(false);
      }
    };


  // ==========================================================
  // UI
  // ==========================================================

  return (
    <div className="min-h-screen bg-gray-50 pb-16">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="bg-[#1a237e] text-white py-8 border-b border-indigo-950">

        <div className="container mx-auto px-4">

          <div className="flex items-start justify-between gap-4 flex-wrap">

            <div>

              <p className="text-[#FF9933] text-sm font-semibold uppercase tracking-wider mb-1">
                GovProcure AI Intelligence Desk
              </p>

              <h1 className="text-2xl font-bold">
                Ministry of Housing & Urban Affairs
              </h1>

              <p className="text-white/70 text-sm mt-1">
                Convert municipal challenges into structured
                specifications, match startups, run pilots,
                track KPIs and make procurement decisions.
              </p>

            </div>

            <div className="flex gap-2">

              <Link
                to="/challenges"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm"
              >
                Browse Public Challenges
              </Link>

            </div>

          </div>

        </div>

      </div>


      <div className="container mx-auto px-4 mt-8 max-w-6xl space-y-8">


        {/* ====================================================
            STAGE 1
        ==================================================== */}

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">

          <div className="flex items-center gap-2 text-[#1a237e] font-semibold mb-2">

            <Sparkles className="w-5 h-5 text-[#FF9933]" />

            <h2>
              Stage 1: AI Challenge Formulation & Semantic Matching
            </h2>

          </div>

          <p className="text-sm text-gray-600 mb-4">
            Enter a municipal problem statement to extract
            technical specifications, constraints and evaluate
            startups.
          </p>


          <form
            onSubmit={handleProcessDemand}
            className="space-y-4"
          >

            <textarea
              rows={4}
              value={statement}
              onChange={(e) =>
                setStatement(
                  e.target.value
                )
              }
              placeholder="e.g. In Pune ward 4, tipper trucks are mixing dry and wet garbage. We need edge camera detection on tippers to check contamination before unloading, and offline tracking because cell network is bad around the river dump site."
              className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a237e]/30 focus:border-[#1a237e] outline-none"
            />


            <div className="flex justify-between items-center">

              <button
                type="button"
                onClick={() =>
                  setStatement(
                    "In Pune ward 4, tipper trucks are mixing dry and wet garbage. We need edge camera detection on tippers to check contamination before unloading, and offline tracking because cell network is bad around the river dump site."
                  )
                }
                className="text-xs text-gray-500 hover:text-[#1a237e] underline"
              >
                Insert Sample Grievance
              </button>


              <button
                type="submit"
                disabled={
                  isLoading ||
                  !statement.trim()
                }
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#FF9933] hover:bg-[#e8871e] text-white font-semibold rounded-lg text-sm transition-colors disabled:opacity-50"
              >

                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Structuring & Matching...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Run AI Intake Pipeline
                  </>
                )}

              </button>

            </div>

          </form>


          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg flex items-center gap-2">

              <AlertTriangle className="w-4 h-4 flex-shrink-0" />

              {error}

            </div>
          )}

        </div>


        {/* ====================================================
            STAGE 1 RESULTS
        ==================================================== */}

        {spec && (

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


            {/* STRUCTURED SPEC */}

            <div className="lg:col-span-1 bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">

              <div className="flex items-center gap-2 text-gray-800 font-semibold border-b pb-2">

                <FileText className="w-4 h-4 text-[#1a237e]" />

                <h3>
                  Structured RFP Specification
                </h3>

              </div>


              <div>

                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Domain
                </span>

                <p className="text-sm font-medium text-gray-800">
                  {spec.domain}
                </p>

              </div>


              <div>

                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Summary
                </span>

                <p className="text-xs text-gray-600 mt-0.5">
                  {spec.summary}
                </p>

              </div>


              <div>

                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Technical Specs
                </span>

                <ul className="text-xs text-gray-600 list-disc list-inside mt-1 space-y-1">

                  {spec.technical_requirements.map(
                    (req, i) => (
                      <li key={i}>
                        {req}
                      </li>
                    )
                  )}

                </ul>

              </div>


              <div>

                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Operational Constraints
                </span>

                <ul className="text-xs text-gray-600 list-disc list-inside mt-1 space-y-1">

                  {spec.operational_constraints.map(
                    (constraint, i) => (
                      <li key={i}>
                        {constraint}
                      </li>
                    )
                  )}

                </ul>

              </div>


              <div className="pt-2 border-t flex justify-between text-xs text-gray-500">

                <span>
                  Est. Budget: ₹
                  {spec.estimated_budget_inr
                    ? (
                        spec.estimated_budget_inr /
                        100000
                      ).toFixed(1)
                    : "5.0"}{" "}
                  Lakhs
                </span>

                <span>
                  Pilot:{" "}
                  {spec.pilot_duration_days}
                  {" "}Days
                </span>

              </div>

            </div>


            {/* STARTUPS */}

            <div className="lg:col-span-2 space-y-4">

              <h3 className="font-semibold text-gray-800 flex items-center justify-between">

                <span>
                  Top{" "}
                  {Math.min(
                    matches.length,
                    10
                  )}{" "}
                  Startup Solutions
                </span>

                <span className="text-xs font-normal text-gray-500">
                  Heuristic + Semantic Fit
                </span>

              </h3>


              {matches
                .slice(0, 10)
                .map(
                  (
                    startup,
                    idx
                  ) => (

                    <div
                      key={
                        startup.match_id ??
                        startup.startup_id
                      }
                      className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-[#1a237e]/40 transition-colors"
                    >

                      <div className="flex items-start justify-between gap-4">

                        <div>

                          <div className="flex items-center gap-2">

                            <span className="text-xs font-bold px-2 py-0.5 bg-gray-100 rounded text-gray-600">
                              #{idx + 1}
                            </span>

                            <h4 className="font-bold text-gray-900">
                              {startup.startup_name}
                            </h4>

                          </div>


                          <p className="text-xs text-gray-600 mt-2">
                            {startup.match_justification}
                          </p>

                        </div>


                        <div className="text-right flex-shrink-0">

                          <div className="text-2xl font-black text-[#1a237e]">

                            {Math.round(
                              startup.scores
                                ?.overall_match_score ??
                                0
                            )}
                            %

                          </div>

                          <span className="text-[11px] text-gray-400 uppercase">
                            Match Score
                          </span>

                        </div>

                      </div>


                      {/* SUB SCORES */}

                      <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t text-xs">

                        <div className="bg-gray-50 p-2 rounded text-center">

                          <p className="text-gray-500 text-[10px]">
                            Tech Relevance
                          </p>

                          <p className="font-semibold">
                            {Math.round(
                              startup.scores
                                ?.tech_relevance_score ??
                                0
                            )}
                            %
                          </p>

                        </div>


                        <div className="bg-gray-50 p-2 rounded text-center">

                          <p className="text-gray-500 text-[10px]">
                            Compliance
                          </p>

                          <p className="font-semibold">
                            {Math.round(
                              startup.scores
                                ?.compliance_score ??
                                0
                            )}
                            %
                          </p>

                        </div>


                        <div className="bg-gray-50 p-2 rounded text-center">

                          <p className="text-gray-500 text-[10px]">
                            Deployment
                          </p>

                          <p className="font-semibold">
                            {Math.round(
                              startup.scores
                                ?.deployment_readiness_score ??
                                0
                            )}
                            %
                          </p>

                        </div>

                      </div>


                      {/* GAPS */}

                      {startup.flagged_gaps &&
                        startup.flagged_gaps.length >
                          0 && (

                          <div className="mt-3 flex flex-wrap gap-1 items-center">

                            <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                              Gaps:
                            </span>

                            {startup.flagged_gaps.map(
                              (
                                gap,
                                i
                              ) => (

                                <span
                                  key={i}
                                  className="text-[10px] text-gray-600 bg-gray-100 px-2 py-0.5 rounded"
                                >
                                  {gap}
                                </span>

                              )
                            )}

                          </div>

                        )}


                      {/* AUDIT */}

                      <div className="mt-4 pt-3 border-t flex justify-end">

                        <button
                          onClick={() =>
                            handleRunAudit(
                              startup
                            )
                          }
                          disabled={
                            auditLoading &&
                            selectedMatchId ===
                              startup.match_id
                          }
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1a237e] hover:bg-indigo-900 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                        >

                          {auditLoading &&
                          selectedMatchId ===
                            startup.match_id ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              Running Due Diligence...
                            </>
                          ) : (
                            <>
                              <ShieldCheck className="w-3.5 h-3.5 text-[#FF9933]" />
                              Run Innovation Readiness Audit
                            </>
                          )}

                        </button>

                      </div>

                    </div>

                  )
                )}

            </div>

          </div>

        )}


        {/* ====================================================
            STAGE 2
        ==================================================== */}

        {auditReport && (

          <div className="bg-white border-2 border-[#1a237e] rounded-xl p-6 shadow-md space-y-6">

            <div className="flex items-start justify-between border-b pb-4">

              <div>

                <div className="flex items-center gap-2">

                  <ShieldCheck className="w-6 h-6 text-[#1a237e]" />

                  <h3 className="text-lg font-bold text-gray-900">

                    Stage 2 Readiness Audit:{" "}
                    {auditReport.startup_name}

                  </h3>

                </div>

                <p className="text-xs text-gray-500 mt-1">
                  Automated 5-Dimension Due Diligence
                  & Sandboxed Risk Evaluation
                </p>

              </div>


              <div className="text-right">

                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    auditReport.recommendation ===
                    "PROCEED_TO_PILOT"
                      ? "bg-green-100 text-green-800"
                      : auditReport.recommendation ===
                        "CONDITIONAL_APPROVAL"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {auditReport.recommendation.replace(
                    /_/g,
                    " "
                  )}
                </span>

                <p className="text-xl font-black text-[#1a237e] mt-1">
                  {Math.round(
                    auditReport.overall_readiness_score
                  )}
                  /100
                </p>

              </div>

            </div>


            {/* DIMENSIONS */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {[
                {
                  label:
                    "Technical Capability",
                  data:
                    auditReport.technical_capability,
                },
                {
                  label:
                    "Deployment Readiness",
                  data:
                    auditReport.deployment_readiness,
                },
                {
                  label:
                    "Compliance & Security",
                  data:
                    auditReport.compliance_security,
                },
                {
                  label:
                    "Financial Sustainability",
                  data:
                    auditReport.financial_sustainability,
                },
                {
                  label:
                    "Pilot Feasibility",
                  data:
                    auditReport.pilot_feasibility,
                },
              ].map(
                (
                  dimension,
                  idx
                ) => (

                  <div
                    key={idx}
                    className="border border-gray-200 rounded-lg p-3 bg-gray-50/50"
                  >

                    <div className="flex justify-between items-center mb-1">

                      <span className="text-xs font-semibold text-gray-700">
                        {dimension.label}
                      </span>

                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          dimension.data.status ===
                          "LOW_RISK"
                            ? "bg-green-100 text-green-700"
                            : dimension.data.status ===
                              "MODERATE_RISK"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {dimension.data.status}
                      </span>

                    </div>


                    <div className="text-sm font-bold text-gray-900 mb-2">
                      {Math.round(
                        dimension.data.score
                      )}
                      /100
                    </div>


                    <ul className="text-[11px] text-gray-600 list-disc list-inside space-y-1">

                      {dimension.data.findings.map(
                        (
                          finding,
                          i
                        ) => (
                          <li key={i}>
                            {finding}
                          </li>
                        )
                      )}

                    </ul>

                  </div>

                )
              )}

            </div>


            {/* SAFEGUARDS */}

            <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-4">

              <h4 className="text-xs font-bold uppercase text-amber-800 tracking-wide mb-2 flex items-center gap-1.5">

                <AlertTriangle className="w-4 h-4 text-amber-600" />

                Recommended RFP Sandbox Safeguards

              </h4>


              <ul className="text-xs text-amber-900 list-disc list-inside space-y-1">

                {auditReport
                  .suggested_sandbox_safeguards
                  .map(
                    (
                      item,
                      i
                    ) => (
                      <li key={i}>
                        {item}
                      </li>
                    )
                  )}

              </ul>

            </div>


            {/* PROCEED TO PILOT */}

            <div className="border-t pt-5 flex justify-end">

              <button
                onClick={
                  handleCreatePilot
                }
                disabled={
                  pilotLoading ||
                  selectedMatchId == null
                }
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg text-sm disabled:opacity-50"
              >

                {pilotLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating Pilot...
                  </>
                ) : (
                  <>
                    <PlayCircle className="w-5 h-5" />
                    Proceed to Pilot
                  </>
                )}

              </button>

            </div>

          </div>

        )}


        {/* ====================================================
            STAGE 3
            PILOT EXECUTION
        ==================================================== */}

        {pilot && (

          <div className="bg-white border-2 border-green-600 rounded-xl p-6 shadow-md space-y-8">

            <div className="flex items-start justify-between border-b pb-4">

              <div>

                <div className="flex items-center gap-2">

                  <PlayCircle className="w-6 h-6 text-green-600" />

                  <h3 className="text-lg font-bold text-gray-900">
                    Stage 3: Pilot Execution
                  </h3>

                </div>

                <p className="text-xs text-gray-500 mt-1">
                  Controlled sandbox execution with measurable
                  KPIs and milestone tracking.
                </p>

              </div>


              <div className="text-right">

                <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-100 text-green-800">
                  {pilot.status}
                </span>

                <p className="text-xs text-gray-500 mt-1">
                  Pilot ID: #{pilot.id}
                </p>

              </div>

            </div>


            {/* =================================================
                KPI SECTION
            ================================================= */}

            <div>

              <div className="flex items-center gap-2 mb-4">

                <Target className="w-5 h-5 text-[#1a237e]" />

                <h4 className="font-bold text-gray-900">
                  Pilot KPIs
                </h4>

              </div>


              {/* ADD KPI */}

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-5">

                <input
                  value={kpiName}
                  onChange={(e) =>
                    setKpiName(
                      e.target.value
                    )
                  }
                  placeholder="KPI name"
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1a237e]"
                />

                <input
                  value={kpiBaseline}
                  onChange={(e) =>
                    setKpiBaseline(
                      e.target.value
                    )
                  }
                  placeholder="Baseline"
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1a237e]"
                />

                <input
                  value={kpiTarget}
                  onChange={(e) =>
                    setKpiTarget(
                      e.target.value
                    )
                  }
                  placeholder="Target"
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1a237e]"
                />

                <button
                  onClick={
                    handleCreateKPI
                  }
                  disabled={
                    kpiLoading
                  }
                  className="inline-flex items-center justify-center gap-2 bg-[#1a237e] hover:bg-indigo-900 text-white rounded-lg px-4 py-2 text-sm font-semibold disabled:opacity-50"
                >

                  <Plus className="w-4 h-4" />

                  Add KPI

                </button>

              </div>


              {/* KPI LIST */}

              {kpis.length === 0 ? (

                <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center text-sm text-gray-500">
                  No KPIs added yet. Add baseline and target values for the pilot.
                </div>

              ) : (

                <div className="space-y-3">

                  {kpis.map(
                    (kpi) => (

                      <div
                        key={kpi.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">

                          <div>

                            <p className="text-[10px] uppercase text-gray-400 font-semibold">
                              KPI
                            </p>

                            <p className="text-sm font-bold text-gray-900">
                              {kpi.name}
                            </p>

                          </div>


                          <div>

                            <p className="text-[10px] uppercase text-gray-400 font-semibold">
                              Baseline
                            </p>

                            <p className="text-sm text-gray-700">
                              {kpi.baseline}
                            </p>

                          </div>


                          <div>

                            <p className="text-[10px] uppercase text-gray-400 font-semibold">
                              Target
                            </p>

                            <p className="text-sm text-gray-700">
                              {kpi.target}
                            </p>

                          </div>


                          <div>

                            <p className="text-[10px] uppercase text-gray-400 font-semibold mb-1">
                              Actual Result
                            </p>

                            <div className="flex gap-2">

                              <input
                                value={
                                  kpiActuals[
                                    kpi.id
                                  ] ??
                                  kpi.actual ??
                                  ""
                                }
                                onChange={(
                                  e
                                ) =>
                                  setKpiActuals(
                                    (
                                      current
                                    ) => ({
                                      ...current,
                                      [kpi.id]:
                                        e.target
                                          .value,
                                    })
                                  )
                                }
                                placeholder="Actual"
                                className="min-w-0 flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                              />

                              <button
                                onClick={() =>
                                  handleUpdateKPI(
                                    kpi.id
                                  )
                                }
                                disabled={
                                  kpiLoading
                                }
                                className="px-3 py-2 bg-[#FF9933] hover:bg-[#e8871e] text-white rounded-lg text-xs font-semibold disabled:opacity-50"
                              >
                                Save
                              </button>

                            </div>

                          </div>

                        </div>

                      </div>

                    )
                  )}

                </div>

              )}

            </div>


            {/* =================================================
                MILESTONES
            ================================================= */}

            <div className="border-t pt-6">

              <div className="flex items-center gap-2 mb-4">

                <CheckCircle2 className="w-5 h-5 text-green-600" />

                <h4 className="font-bold text-gray-900">
                  Pilot Milestones
                </h4>

              </div>


              <div className="flex gap-3 mb-5">

                <input
                  value={
                    milestoneTitle
                  }
                  onChange={(e) =>
                    setMilestoneTitle(
                      e.target.value
                    )
                  }
                  placeholder="e.g. Deploy solution in Ward 4"
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1a237e]"
                />

                <button
                  onClick={
                    handleCreateMilestone
                  }
                  disabled={
                    milestoneLoading
                  }
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a237e] hover:bg-indigo-900 text-white rounded-lg text-sm font-semibold disabled:opacity-50"
                >

                  <Plus className="w-4 h-4" />

                  Add Milestone

                </button>

              </div>


              {milestones.length === 0 ? (

                <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center text-sm text-gray-500">
                  No milestones added yet.
                </div>

              ) : (

                <div className="space-y-2">

                  {milestones.map(
                    (
                      milestone
                    ) => (

                      <div
                        key={
                          milestone.id
                        }
                        className="flex items-center justify-between border border-gray-200 rounded-lg p-3"
                      >

                        <div className="flex items-center gap-3">

                          <CheckCircle2
                            className={`w-5 h-5 ${
                              milestone.status ===
                              "COMPLETED"
                                ? "text-green-600"
                                : "text-gray-300"
                            }`}
                          />

                          <div>

                            <p className="text-sm font-semibold text-gray-900">
                              {
                                milestone.title
                              }
                            </p>

                            <p className="text-[10px] uppercase text-gray-400">
                              {
                                milestone.status
                              }
                            </p>

                          </div>

                        </div>


                        {milestone.status !==
                          "COMPLETED" && (

                          <button
                            onClick={() =>
                              handleCompleteMilestone(
                                milestone.id
                              )
                            }
                            disabled={
                              milestoneLoading
                            }
                            className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-semibold disabled:opacity-50"
                          >
                            Complete
                          </button>

                        )}

                      </div>

                    )
                  )}

                </div>

              )}

            </div>


            {/* =================================================
                EVALUATION
            ================================================= */}

            <div className="border-t pt-6">

              <div className="flex items-center gap-2 mb-4">

                <ClipboardCheck className="w-5 h-5 text-[#1a237e]" />

                <h4 className="font-bold text-gray-900">
                  Pilot Evaluation
                </h4>

              </div>


              <button
                onClick={
                  handleEvaluatePilot
                }
                disabled={
                  evaluationLoading
                }
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1a237e] hover:bg-indigo-900 text-white rounded-lg text-sm font-semibold disabled:opacity-50"
              >

                {evaluationLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Evaluating...
                  </>
                ) : (
                  <>
                    <ClipboardCheck className="w-4 h-4" />
                    Evaluate Pilot
                  </>
                )}

              </button>


              {evaluation && (

                <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-3">

                  <div className="bg-gray-50 rounded-lg p-4">

                    <p className="text-xs text-gray-500">
                      KPI Score
                    </p>

                    <p className="text-2xl font-black text-[#1a237e]">
                      {Math.round(
                        evaluation.kpi_score
                      )}
                      %
                    </p>

                    <p className="text-[10px] text-gray-400">
                      {
                        evaluation.kpis_measured
                      }/
                      {
                        evaluation.total_kpis
                      } measured
                    </p>

                  </div>


                  <div className="bg-gray-50 rounded-lg p-4">

                    <p className="text-xs text-gray-500">
                      Milestone Score
                    </p>

                    <p className="text-2xl font-black text-[#1a237e]">
                      {Math.round(
                        evaluation.milestone_score
                      )}
                      %
                    </p>

                    <p className="text-[10px] text-gray-400">
                      {
                        evaluation.milestones_completed
                      }/
                      {
                        evaluation.total_milestones
                      } completed
                    </p>

                  </div>


                  <div className="bg-gray-50 rounded-lg p-4">

                    <p className="text-xs text-gray-500">
                      Overall Score
                    </p>

                    <p className="text-2xl font-black text-[#1a237e]">
                      {Math.round(
                        evaluation.overall_score
                      )}
                      %
                    </p>

                  </div>


                  <div className="bg-gray-50 rounded-lg p-4">

                    <p className="text-xs text-gray-500">
                      Recommendation
                    </p>

                    <p className="text-sm font-bold text-gray-900 mt-2">
                      {evaluation.recommendation.replace(
                        /_/g,
                        " "
                      )}
                    </p>

                  </div>

                </div>

              )}

            </div>


            {/* =================================================
                FINAL DECISION
            ================================================= */}

            {evaluation && (

              <div className="border-t pt-6">

                <div className="flex items-center justify-between gap-4 flex-wrap">

                  <div>

                    <div className="flex items-center gap-2">

                      <Trophy className="w-5 h-5 text-[#FF9933]" />

                      <h4 className="font-bold text-gray-900">
                        Final Procurement Decision
                      </h4>

                    </div>

                    <p className="text-xs text-gray-500 mt-1">
                      Convert pilot evidence into a government
                      procurement decision.
                    </p>

                  </div>


                  <button
                    onClick={
                      handleFinalDecision
                    }
                    disabled={
                      evaluationLoading
                    }
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF9933] hover:bg-[#e8871e] text-white rounded-lg text-sm font-bold disabled:opacity-50"
                  >

                    {evaluationLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Deciding...
                      </>
                    ) : (
                      <>
                        <Trophy className="w-4 h-4" />
                        Generate Final Decision
                      </>
                    )}

                  </button>

                </div>


                {finalDecision && (

                  <div
                    className={`mt-5 rounded-xl border-2 p-5 ${
                      finalDecision.decision ===
                      "SCALE"
                        ? "border-green-500 bg-green-50"
                        : finalDecision.decision ===
                          "EXTEND_PILOT"
                        ? "border-amber-500 bg-amber-50"
                        : "border-red-500 bg-red-50"
                    }`}
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Government Decision
                        </p>

                        <h5 className="text-2xl font-black text-gray-900 mt-1">
                          {
                            finalDecision.decision
                          }
                        </h5>

                        <p className="text-sm text-gray-700 mt-2">
                          {
                            finalDecision.reason
                          }
                        </p>

                      </div>


                      <div className="text-right">

                        <p className="text-xs text-gray-500">
                          Pilot Score
                        </p>

                        <p className="text-3xl font-black text-[#1a237e]">
                          {Math.round(
                            finalDecision.overall_score
                          )}
                        </p>

                        <p className="text-[10px] text-gray-400">
                          / 100
                        </p>

                      </div>

                    </div>

                  </div>

                )}

              </div>

            )}

          </div>

        )}

      </div>

    </div>
  );
}