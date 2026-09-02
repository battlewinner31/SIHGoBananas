import { useParams, Link, Navigate } from "react-router";
import { ArrowLeft, Building2, Calendar, Tag, Users, CheckCircle, ArrowRight } from "lucide-react";
import { CHALLENGES, SOLUTION_AREAS } from "../data";

const STATUS_COLOR: Record<string, string> = {
  Open: "bg-green-100 text-green-800",
  "In Review": "bg-blue-100 text-blue-800",
  Pilot: "bg-purple-100 text-purple-800",
  Closed: "bg-gray-100 text-gray-600",
};

export function ChallengeDetail() {
  const { id } = useParams();
  const challenge = CHALLENGES.find((c) => c.id === id);

  if (!challenge) return <Navigate to="/challenges" replace />;

  const areaLabel = SOLUTION_AREAS.find((a) => a.id === challenge.area)?.label ?? challenge.area;

  return (
    <div>
      {/* Back nav */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="container mx-auto px-4">
          <Link
            to="/challenges"
            className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#1a237e] transition-colors no-underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Challenges
          </Link>
        </div>
      </div>

      {/* Header */}
      <section className="bg-[#1a237e] text-white py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-wrap gap-3 mb-4">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_COLOR[challenge.status]}`}>
              {challenge.status}
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white/90">
              {areaLabel}
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold leading-tight mb-4">{challenge.title}</h1>
          <div className="flex flex-wrap gap-6 text-sm text-white/75">
            <span className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#FF9933]" />
              {challenge.department}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#FF9933]" />
              Deadline:{" "}
              {new Date(challenge.deadline).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#FF9933]" />
              {challenge.applications} applications received
            </span>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <h2 className="text-lg font-bold text-[#1a237e] mb-4">Challenge Description</h2>
                <p className="text-gray-700 leading-relaxed">{challenge.description}</p>
              </div>

              {/* Requirements */}
              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <h2 className="text-lg font-bold text-[#1a237e] mb-4">Requirements</h2>
                <ul className="space-y-3">
                  {challenge.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#1a237e] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Expected outcomes */}
              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <h2 className="text-lg font-bold text-[#1a237e] mb-4">Expected Outcomes</h2>
                <ul className="space-y-3">
                  {challenge.expectedOutcomes.map((outcome, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#FF9933] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-gray-700 text-sm">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Key facts */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-[#1a237e] mb-4">Challenge Details</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">Department</p>
                    <p className="text-gray-800 font-medium">{challenge.department}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">Area / Domain</p>
                    <p className="text-gray-800 font-medium">{areaLabel}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">Status</p>
                    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLOR[challenge.status]}`}>
                      {challenge.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">Application Deadline</p>
                    <p className="text-gray-800 font-medium">
                      {new Date(challenge.deadline).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">Applications Received</p>
                    <p className="text-gray-800 font-medium">{challenge.applications}</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-[#1a237e] rounded-xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Have a solution?</h3>
                <p className="text-white/75 text-sm mb-5 leading-relaxed">
                  Register as a startup and submit your solution proposal for this challenge.
                </p>
                <Link
                  to="/register"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#FF9933] text-white font-semibold rounded-lg hover:bg-[#e8871e] transition-colors no-underline text-sm"
                >
                  Submit Your Solution <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Related area */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-[#FF9933]" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Related Area</span>
                </div>
                <Link
                  to={`/solutions/${challenge.area}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a237e] hover:text-[#FF9933] transition-colors no-underline"
                >
                  Browse {areaLabel} solutions <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
