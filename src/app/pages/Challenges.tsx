import { useState } from "react";
import { Link } from "react-router";
import { Search, Filter, ChevronRight } from "lucide-react";
import { CHALLENGES, SOLUTION_AREAS } from "../data";

const STATUS_COLOR: Record<string, string> = {
  Open: "bg-green-100 text-green-800",
  "In Review": "bg-blue-100 text-blue-800",
  Pilot: "bg-purple-100 text-purple-800",
  Closed: "bg-gray-100 text-gray-600",
};

export function Challenges() {
  const [search, setSearch] = useState("");
  const [areaFilter, setAreaFilter] = useState("all");

  const filtered = CHALLENGES.filter((ch) => {
    const matchSearch =
      ch.title.toLowerCase().includes(search.toLowerCase()) ||
      ch.department.toLowerCase().includes(search.toLowerCase()) ||
      ch.description.toLowerCase().includes(search.toLowerCase());
    const matchArea = areaFilter === "all" || ch.area === areaFilter;
    return matchSearch && matchArea;
  });

  return (
    <div>
      {/* Page header */}
      <section className="bg-[#1a237e] text-white py-14">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-3">Government Challenges</h1>
          <p className="text-white/75 max-w-2xl">
            Browse real challenges posted by government departments. Find an opportunity that matches your expertise and submit your innovative solution.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-200 py-5 sticky top-[5.5rem] z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search challenges..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e]/20"
              />
            </div>
            {/* Area filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={areaFilter}
                onChange={(e) => setAreaFilter(e.target.value)}
                className="pl-10 pr-8 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#1a237e] appearance-none bg-white cursor-pointer"
              >
                <option value="all">All Areas</option>
                {SOLUTION_AREAS.map((area) => (
                  <option key={area.id} value={area.id}>{area.label}</option>
                ))}
              </select>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Showing <strong>{filtered.length}</strong> of {CHALLENGES.length} challenges
          </p>
        </div>
      </section>

      {/* Challenge list */}
      <section className="py-10 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-lg font-medium mb-2">No challenges found</p>
              <p className="text-sm">Try adjusting your search or filter.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((ch) => (
                <div
                  key={ch.id}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:border-[#1a237e] hover:shadow-md transition-all flex flex-col"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLOR[ch.status]}`}>
                      {ch.status}
                    </span>
                    <span className="text-xs text-gray-400 flex-shrink-0">{ch.applications} applications</span>
                  </div>
                  <h2 className="font-bold text-[#1a237e] text-base leading-snug mb-2">{ch.title}</h2>
                  <p className="text-xs font-semibold text-[#FF9933] mb-1">{ch.department}</p>
                  <p className="text-xs text-gray-500 mb-3">
                    {SOLUTION_AREAS.find((a) => a.id === ch.area)?.label}
                    {" · Deadline: "}
                    {new Date(ch.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1 line-clamp-3">{ch.description}</p>
                  <Link
                    to={`/challenges/${ch.id}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a237e] hover:text-[#FF9933] transition-colors no-underline"
                  >
                    View Challenge <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
