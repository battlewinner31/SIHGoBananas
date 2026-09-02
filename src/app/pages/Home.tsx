import { Link } from "react-router";
import { ArrowRight, CheckCircle, Search, Lightbulb, FlaskConical, TrendingUp, ChevronRight } from "lucide-react";
import { CHALLENGES } from "../data";

const STAGES = [
  {
    icon: Search,
    step: "01",
    title: "Identify",
    description: "Government departments define real-world challenges facing citizens and public services.",
  },
  {
    icon: Lightbulb,
    step: "02",
    title: "Discover",
    description: "Startups discover relevant government opportunities and submit innovative solutions.",
  },
  {
    icon: FlaskConical,
    step: "03",
    title: "Pilot",
    description: "Promising solutions are tested in controlled, real-world environments.",
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "Scale",
    description: "Successful solutions move toward wider implementation across departments.",
  },
];

const STATUS_COLOR: Record<string, string> = {
  Open: "bg-green-100 text-green-800",
  "In Review": "bg-blue-100 text-blue-800",
  Pilot: "bg-purple-100 text-purple-800",
  Closed: "bg-gray-100 text-gray-600",
};

export function Home() {
  const featured = CHALLENGES.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#1a237e] to-[#283593] text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-16 left-8 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-12 right-12 w-96 h-96 bg-[#FF9933] rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl lg:text-5xl font-bold leading-tight mb-5">
              Connecting Government Challenges<br />with Innovative Solutions
            </h1>
            <p className="text-lg text-white/85 mb-3 font-medium">Connecting Challenges with Innovation</p>
            <p className="text-base text-white/75 mb-10 max-w-2xl mx-auto">
              A platform connecting government departments with startups to discover, test, and scale innovative solutions for real-world public challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/challenges"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FF9933] text-white font-semibold rounded-md hover:bg-[#e8871e] transition-colors no-underline"
              >
                Explore Challenges
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/solutions"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 border border-white text-white font-semibold rounded-md hover:bg-white hover:text-[#1a237e] transition-colors no-underline"
              >
                For Startups
              </Link>
            </div>
            <div className="mt-14 flex flex-wrap justify-center gap-8 text-sm text-white/80">
              {["UIDAI Compliant Platform", "Secure & Transparent", "Government of India Backed"].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#FF9933]" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works overview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#1a237e] mb-3">How the Platform Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A structured four-stage journey from identifying public challenges to scaling proven solutions.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STAGES.map((stage) => (
              <div key={stage.step} className="relative">
                <div className="bg-white rounded-xl border border-gray-200 p-7 h-full hover:border-[#1a237e] hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 bg-[#1a237e] rounded-lg flex items-center justify-center">
                      <stage.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-3xl font-bold text-[#1a237e]/15">{stage.step}</span>
                  </div>
                  <h3 className="font-bold text-[#1a237e] mb-2 text-lg">{stage.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-2 text-[#1a237e] font-semibold hover:text-[#FF9933] transition-colors no-underline"
            >
              See the full process <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured challenges */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#1a237e] mb-2">Featured Challenges</h2>
              <p className="text-gray-600">Current opportunities from government departments</p>
            </div>
            <Link
              to="/challenges"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF9933] hover:text-[#e8871e] transition-colors no-underline whitespace-nowrap"
            >
              View all challenges <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((ch) => (
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
                <h3 className="font-bold text-[#1a237e] text-base mb-2 leading-snug">{ch.title}</h3>
                <p className="text-xs font-medium text-[#FF9933] mb-3">{ch.department}</p>
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
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-[#1a237e] py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">Ready to contribute?</h2>
          <p className="text-white/75 mb-8 max-w-xl mx-auto">
            Whether you lead a government department or a startup, the InnovateGov platform has a path for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#FF9933] text-white font-semibold rounded-md hover:bg-[#e8871e] transition-colors no-underline"
            >
              Join the Platform
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center px-6 py-3 bg-white/10 border border-white text-white font-semibold rounded-md hover:bg-white hover:text-[#1a237e] transition-colors no-underline"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
