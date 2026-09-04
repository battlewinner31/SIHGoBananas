import { Link } from "react-router";
import { Trash2, Sprout, HeartPulse, BookOpen, Building2, Zap, Bus, Landmark, ChevronRight } from "lucide-react";
import { SOLUTION_AREAS, STARTUPS } from "../data";

const ICON_MAP: Record<string, React.ElementType> = {
  Trash2,
  Sprout,
  HeartPulse,
  BookOpen,
  Building2,
  Zap,
  Bus,
  Landmark,
};

export function Solutions() {
  return (
    <div>
      {/* Page header */}
      <section className="bg-[#1a237e] text-white py-14">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-3">Explore Solutions by Area</h1>
          <p className="text-white/75 max-w-2xl">
            Discover startups developing innovative solutions across key public-sector domains.
          </p>
        </div>
      </section>

      {/* Area grid */}
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SOLUTION_AREAS.map((area) => {
              const Icon = ICON_MAP[area.icon] ?? Building2;
              const count = STARTUPS.filter((s) => s.areas.includes(area.id)).length;
              return (
                <Link
                  key={area.id}
                  to={`/solutions/${area.id}`}
                  className="group bg-white border border-gray-200 rounded-xl p-7 hover:border-[#1a237e] hover:shadow-md transition-all no-underline flex flex-col"
                >
                  <div className="w-13 h-13 w-12 h-12 bg-[#1a237e] rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#FF9933] transition-colors">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="font-bold text-[#1a237e] text-lg mb-2">{area.label}</h2>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">{area.description}</p>
                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-400">{count} startup{count !== 1 ? "s" : ""}</span>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#1a237e] group-hover:text-[#FF9933] transition-colors">
                      Explore <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 text-center max-w-xl">
          <h2 className="text-2xl font-bold text-[#1a237e] mb-3">Are you a startup?</h2>
          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            Register your startup to showcase your solution, discover government opportunities, and participate in challenges.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1a237e] text-white font-semibold rounded-md hover:bg-[#283593] transition-colors no-underline"
          >
            Register as Startup <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
