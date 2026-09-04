import { useParams, Link, Navigate } from "react-router";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { SOLUTION_AREAS, getStartupsByArea } from "../data";

export function StartupList() {
  const { areaId } = useParams();
  const area = SOLUTION_AREAS.find((a) => a.id === areaId);

  if (!area) return <Navigate to="/solutions" replace />;

  const startups = getStartupsByArea(areaId!);

  return (
    <div>
      {/* Back nav */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="container mx-auto px-4">
          <Link
            to="/solutions"
            className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#1a237e] transition-colors no-underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Solutions
          </Link>
        </div>
      </div>

      {/* Header */}
      <section className="bg-[#1a237e] text-white py-14">
        <div className="container mx-auto px-4">
          <p className="text-[#FF9933] text-sm font-semibold uppercase tracking-widest mb-2">{area.label}</p>
          <h1 className="text-3xl font-bold mb-3">{area.label} Solutions</h1>
          <p className="text-white/75 max-w-2xl">
            Explore startups developing solutions for {area.label.toLowerCase()} and related public-sector challenges.
          </p>
        </div>
      </section>

      {/* Startup list */}
      <section className="py-12 bg-gray-50 min-h-[60vh]">
        <div className="container mx-auto px-4">
          {startups.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-lg font-medium mb-2">No startups registered in this area yet</p>
              <p className="text-sm mb-6">Be the first to register and contribute.</p>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1a237e] text-white rounded-md text-sm font-semibold no-underline hover:bg-[#283593] transition-colors"
              >
                Register as Startup
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {startups.map((startup) => (
                <div
                  key={startup.id}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:border-[#1a237e] hover:shadow-md transition-all flex flex-col"
                >
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-[#1a237e] rounded-lg flex items-center justify-center mb-4">
                      <span className="text-white font-bold text-lg">{startup.name[0]}</span>
                    </div>
                    <h2 className="font-bold text-[#1a237e] text-lg leading-snug">{startup.name}</h2>
                    <p className="text-sm text-[#FF9933] font-medium mt-1">{startup.tagline}</p>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1 line-clamp-3">{startup.solution}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {startup.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                    {startup.technologies.length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">
                        +{startup.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                  <Link
                    to={`/startups/${startup.id}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a237e] hover:text-[#FF9933] transition-colors no-underline"
                  >
                    View Startup <ChevronRight className="w-4 h-4" />
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
