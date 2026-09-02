import { Link } from "react-router";
import { Plus, FileText, Eye, CheckCircle2, Clock, AlertCircle } from "lucide-react";

const MY_CHALLENGES = [
  { id: "ch-001", name: "Real-Time Waste Monitoring in Urban Municipal Areas", applications: 14, status: "Open" },
  { id: "ch-004", name: "Smart Street Lighting Management System", applications: 9, status: "Pilot" },
  { id: "ch-003", name: "Telemedicine Platform for Primary Health Centres", applications: 18, status: "In Review" },
];

const RECENT_APPLICATIONS = [
  { startup: "CleanRoute Technologies", challenge: "Real-Time Waste Monitoring", status: "Under Review" },
  { startup: "LumiGrid Systems", challenge: "Smart Street Lighting", status: "Shortlisted" },
  { startup: "Nirogyam Health", challenge: "Telemedicine Platform", status: "Under Review" },
  { startup: "AgriSense AI", challenge: "Telemedicine Platform", status: "Pending" },
];

const STATUS_COLOR: Record<string, string> = {
  Open: "bg-green-100 text-green-800",
  "In Review": "bg-blue-100 text-blue-800",
  Pilot: "bg-purple-100 text-purple-800",
  Closed: "bg-gray-100 text-gray-600",
  "Under Review": "bg-yellow-100 text-yellow-800",
  Shortlisted: "bg-green-100 text-green-800",
  Pending: "bg-gray-100 text-gray-600",
};

const STATUS_ICON: Record<string, React.ElementType> = {
  Open: CheckCircle2,
  "In Review": Clock,
  Pilot: AlertCircle,
};

export function GovDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1a237e] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-[#FF9933] text-sm font-semibold uppercase tracking-wider mb-1">Government Dashboard</p>
              <h1 className="text-2xl font-bold">Welcome, Ministry of Housing & Urban Affairs</h1>
              <p className="text-white/70 text-sm mt-1">Manage your challenges and review incoming applications.</p>
            </div>
            <Link
              to="/challenges"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF9933] text-white font-semibold rounded-lg hover:bg-[#e8871e] transition-colors no-underline text-sm flex-shrink-0"
            >
              <Plus className="w-4 h-4" />
              Post a Challenge
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-wrap gap-8">
            {[
              { label: "Total Challenges", value: "3" },
              { label: "Total Applications", value: "41" },
              { label: "Active Pilots", value: "1" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-[#1a237e]">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* My Challenges */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-[#1a237e]">My Challenges</h2>
              <Link to="/challenges" className="text-sm text-[#FF9933] font-semibold hover:text-[#e8871e] no-underline transition-colors">
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {MY_CHALLENGES.map((ch) => {
                const Icon = STATUS_ICON[ch.status] ?? CheckCircle2;
                return (
                  <div key={ch.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#1a237e] transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-2">{ch.name}</h3>
                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLOR[ch.status]}`}>
                            {ch.status}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <FileText className="w-3.5 h-3.5" />
                            {ch.applications} applications
                          </span>
                        </div>
                      </div>
                      <Link
                        to={`/challenges/${ch.id}`}
                        className="text-xs font-semibold text-[#1a237e] hover:text-[#FF9933] no-underline transition-colors flex items-center gap-1 flex-shrink-0"
                      >
                        <Eye className="w-3.5 h-3.5" /> View
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Applications */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-[#1a237e]">Recent Applications</h2>
              <span className="text-sm text-gray-500">{RECENT_APPLICATIONS.length} total</span>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Startup</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Challenge</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {RECENT_APPLICATIONS.map((app, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 font-medium text-gray-900">{app.startup}</td>
                      <td className="px-5 py-4 text-gray-600 hidden sm:table-cell text-xs">{app.challenge}</td>
                      <td className="px-5 py-4">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLOR[app.status]}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button className="text-xs font-semibold text-[#1a237e] hover:text-[#FF9933] transition-colors">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
