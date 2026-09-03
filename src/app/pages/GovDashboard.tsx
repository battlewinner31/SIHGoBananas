import { useState } from "react";
import { Link } from "react-router";
import { 
  Sparkles, ShieldCheck, AlertTriangle, 
  Loader2, FileText 
} from "lucide-react";
import { 
  processDemand, 
  auditReadiness, 
  type ProblemSpecification, 
  type StartupMatchResult, 
  type InnovationReadinessReport 
} from "../api";

export function GovDashboard() {
  const [statement, setStatement] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [spec, setSpec] = useState<ProblemSpecification | null>(null);
  const [matches, setMatches] = useState<StartupMatchResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Audit state
  const [selectedStartupId, setSelectedStartupId] = useState<string | null>(null);
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditReport, setAuditReport] = useState<InnovationReadinessReport | null>(null);

  const handleProcessDemand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!statement.trim()) return;

    setIsLoading(true);
    setError(null);
    setSpec(null);
    setMatches([]);
    setAuditReport(null);

    try {
      const response = await processDemand(statement);
      setSpec(response.structured_specification);
      setMatches(response.matched_candidates);
    } catch (err: any) {
      setError(err.message || "Failed to process challenge statement.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRunAudit = async (startupId: string) => {
    if (!spec) return;
    setSelectedStartupId(startupId);
    setAuditLoading(true);
    setError(null);
    try {
      const report = await auditReadiness(spec, startupId);
      setAuditReport(report);
    } catch (err: any) {
      setError(err.message || "Failed to complete readiness audit.");
    } finally {
      setAuditLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Top Header */}
      <div className="bg-[#1a237e] text-white py-8 border-b border-indigo-950">
        <div className="container mx-auto px-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-[#FF9933] text-sm font-semibold uppercase tracking-wider mb-1">
                GovProcure AI Intelligence Desk
              </p>
              <h1 className="text-2xl font-bold">Ministry of Housing & Urban Affairs</h1>
              <p className="text-white/70 text-sm mt-1">
                Convert municipal challenges into structured specifications and match audited startups.
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
        {/* Stage 1 Intake */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-2 text-[#1a237e] font-semibold mb-2">
            <Sparkles className="w-5 h-5 text-[#FF9933]" />
            <h2>Stage 1: AI Challenge Formulation & Semantic Matching</h2>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Enter a municipal problem statement to extract technical specs, constraints, and evaluate startups.
          </p>

          <form onSubmit={handleProcessDemand} className="space-y-4">
            <textarea
              rows={4}
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
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
                disabled={isLoading || !statement.trim()}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#FF9933] hover:bg-[#e8871e] text-white font-semibold rounded-lg text-sm transition-colors disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Structuring & Matching...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> Run AI Intake Pipeline
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

        {/* Stage 1 Results */}
        {spec && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-gray-800 font-semibold border-b pb-2">
                <FileText className="w-4 h-4 text-[#1a237e]" />
                <h3>Structured RFP Specification</h3>
              </div>

              <div>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Domain</span>
                <p className="text-sm font-medium text-gray-800">{spec.domain}</p>
              </div>

              <div>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Summary</span>
                <p className="text-xs text-gray-600 mt-0.5">{spec.summary}</p>
              </div>

              <div>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Technical Specs</span>
                <ul className="text-xs text-gray-600 list-disc list-inside mt-1 space-y-1">
                  {spec.technical_requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Operational Constraints</span>
                <ul className="text-xs text-gray-600 list-disc list-inside mt-1 space-y-1">
                  {spec.operational_constraints.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t flex justify-between text-xs text-gray-500">
                <span>Est. Budget: ₹{spec.estimated_budget_inr ? (spec.estimated_budget_inr / 100000).toFixed(1) : "5.0"} Lakhs</span>
                <span>Pilot: {spec.pilot_duration_days} Days</span>
              </div>
            </div>

            {/* Candidates */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-semibold text-gray-800 flex items-center justify-between">
                <span>Ranked Startup Solutions ({matches.length})</span>
                <span className="text-xs font-normal text-gray-500">Heuristic + Semantic Fit</span>
              </h3>

              {matches.map((startup, idx) => (
                <div
                  key={startup.startup_id}
                  className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-[#1a237e]/40 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2 py-0.5 bg-gray-100 rounded text-gray-600">
                          #{idx + 1}
                        </span>
                        <h4 className="font-bold text-gray-900">{startup.startup_name}</h4>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">{startup.match_justification}</p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="text-2xl font-black text-[#1a237e]">
                        {Math.round(startup.scores?.overall_match_score ?? 0)}%
                      </div>
                      <span className="text-[11px] text-gray-400 uppercase">Match Score</span>
                    </div>
                  </div>

                  {/* Sub-scores mapped to ScoreBreakdown */}
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t text-xs">
                    <div className="bg-gray-50 p-2 rounded text-center">
                      <p className="text-gray-500 text-[10px]">Tech Relevance</p>
                      <p className="font-semibold">{Math.round(startup.scores?.tech_relevance_score ?? 0)}%</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded text-center">
                      <p className="text-gray-500 text-[10px]">Compliance</p>
                      <p className="font-semibold">{Math.round(startup.scores?.compliance_score ?? 0)}%</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded text-center">
                      <p className="text-gray-500 text-[10px]">Deployment</p>
                      <p className="font-semibold">{Math.round(startup.scores?.deployment_readiness_score ?? 0)}%</p>
                    </div>
                  </div>

                  {startup.flagged_gaps && startup.flagged_gaps.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1 items-center">
                      <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                        Gaps:
                      </span>
                      {startup.flagged_gaps.map((gap, i) => (
                        <span key={i} className="text-[10px] text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                          {gap}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 pt-3 border-t flex justify-end">
                    <button
                      onClick={() => handleRunAudit(startup.startup_id)}
                      disabled={auditLoading && selectedStartupId === startup.startup_id}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1a237e] hover:bg-indigo-900 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {auditLoading && selectedStartupId === startup.startup_id ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" /> Running Due Diligence...
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-3.5 h-3.5 text-[#FF9933]" /> Run Innovation Readiness Audit
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stage 2 Audit Panel */}
        {auditReport && (
          <div className="bg-white border-2 border-[#1a237e] rounded-xl p-6 shadow-md space-y-6">
            <div className="flex items-start justify-between border-b pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-[#1a237e]" />
                  <h3 className="text-lg font-bold text-gray-900">
                    Stage 2 Readiness Audit: {auditReport.startup_name}
                  </h3>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Automated 5-Dimension Due Diligence & Sandboxed Risk Evaluation
                </p>
              </div>

              <div className="text-right">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    auditReport.recommendation === "PROCEED_TO_PILOT"
                      ? "bg-green-100 text-green-800"
                      : auditReport.recommendation === "CONDITIONAL_APPROVAL"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {auditReport.recommendation.replace(/_/g, " ")}
                </span>
                <p className="text-xl font-black text-[#1a237e] mt-1">
                  {auditReport.overall_readiness_score}/100
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Technical Capability", data: auditReport.technical_capability },
                { label: "Deployment Readiness", data: auditReport.deployment_readiness },
                { label: "Compliance & Security", data: auditReport.compliance_security },
                { label: "Financial Sustainability", data: auditReport.financial_sustainability },
                { label: "Pilot Feasibility", data: auditReport.pilot_feasibility },
              ].map((dim, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-3 bg-gray-50/50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-semibold text-gray-700">{dim.label}</span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        dim.data.status === "LOW_RISK"
                          ? "bg-green-100 text-green-700"
                          : dim.data.status === "MODERATE_RISK"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {dim.data.status}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-gray-900 mb-2">{dim.data.score}/100</div>
                  <ul className="text-[11px] text-gray-600 list-disc list-inside space-y-1">
                    {dim.data.findings.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-4">
              <h4 className="text-xs font-bold uppercase text-amber-800 tracking-wide mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Recommended RFP Sandbox Safeguards
              </h4>
              <ul className="text-xs text-amber-900 list-disc list-inside space-y-1">
                {auditReport.suggested_sandbox_safeguards.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}