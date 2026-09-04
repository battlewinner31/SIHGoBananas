import { Link } from "react-router";
import { Search, User, FileText } from "lucide-react";

const MY_APPLICATIONS = [
  { challenge: "Real-Time Waste Monitoring in Urban Municipal Areas", department: "Ministry of Housing & Urban Affairs", status: "Under Review", id: "ch-001" },
  { challenge: "Smart Street Lighting Management System", department: "Ministry of Power", status: "Shortlisted", id: "ch-004" },
  { challenge: "Last-Mile Connectivity for Rural PDS", department: "Department of Food and Public Distribution", status: "Pending", id: "ch-005" },
];

const STATUS_COLOR: Record<string, string> = {
  "Under Review": "bg-yellow-100 text-yellow-800",
  Shortlisted: "bg-green-100 text-green-800",
  Pending: "bg-gray-100 text-gray-600",
  Rejected: "bg-red-100 text-red-800",
};

export function StartupDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1a237e] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-[#FF9933] text-sm font-semibold uppercase tracking-wider mb-1">Startup Dashboard</p>
              <h1 className="text-2xl font-bold">Welcome, CleanRoute Technologies</h1>
              <p className="text-white/70 text-sm mt-1">Track your applications and explore new opportunities.</p>
            </div>
            <Link
              to="/challenges"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF9933] text-white font-semibold rounded-lg hover:bg-[#e8871e] transition-colors no-underline text-sm flex-shrink-0"
            >
              <Search className="w-4 h-4" />
              Browse Challenges
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-wrap gap-8">
            {[
              { label: "Applications Submitted", value: "3" },
              { label: "Shortlisted", value: "1" },
              { label: "Active Pilots", value: "0" },
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
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile summary */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#1a237e]">My Profile</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 bg-[#1a237e] rounded-xl flex items-center justify-center">
                  <span className="text-white font-black text-xl">C</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900">CleanRoute Technologies</p>
                  <p className="text-sm text-[#FF9933]">Waste Management · Smart Infrastructure</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600 mb-5">
                <p className="flex items-center gap-2"><User className="w-4 h-4 text-gray-400" /> 42 team members</p>
                <p className="flex items-center gap-2"><FileText className="w-4 h-4 text-gray-400" /> Founded 2020</p>
              </div>
              <Link
                to="/startups/st-001"
                className="block w-full text-center py-2.5 border border-[#1a237e] text-[#1a237e] text-sm font-semibold rounded-lg hover:bg-[#1a237e] hover:text-white transition-colors no-underline"
              >
                View Public Profile
              </Link>
            </div>
          </div>

          {/* Applications */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-[#1a237e]">My Applications</h2>
              <span className="text-sm text-gray-500">{MY_APPLICATIONS.length} submitted</span>
            </div>
            <div className="space-y-4">
              {MY_APPLICATIONS.map((app, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#1a237e] transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1">{app.challenge}</h3>
                      <p className="text-xs text-[#FF9933] font-medium mb-3">{app.department}</p>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLOR[app.status]}`}>
                        {app.status}
                      </span>
                    </div>
                    <Link
                      to={`/challenges/${app.id}`}
                      className="text-xs font-semibold text-[#1a237e] hover:text-[#FF9933] no-underline transition-colors flex-shrink-0"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
