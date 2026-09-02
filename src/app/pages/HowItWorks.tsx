import { Link } from "react-router";
import { Search, Lightbulb, ClipboardCheck, FlaskConical, TrendingUp, ArrowRight } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: Search,
    title: "Identify",
    subtitle: "Government departments define real-world challenges",
    description:
      "Government departments articulate operational and service-delivery challenges they face. Each challenge is described with clear context, requirements, and expected outcomes so that innovators can propose targeted solutions.",
    who: "Government Departments",
    colour: "bg-[#1a237e]",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Discover",
    subtitle: "Startups discover relevant government opportunities",
    description:
      "Startups and innovators browse published challenges, filter by domain, and submit their solution proposals. The platform provides all the context needed for a well-matched, evidence-based submission.",
    who: "Startups & Innovators",
    colour: "bg-[#283593]",
  },
  {
    number: "03",
    icon: ClipboardCheck,
    title: "Evaluate",
    subtitle: "Promising solutions are reviewed",
    description:
      "Government departments review submitted solutions against the stated requirements and expected outcomes. Shortlisted startups may be invited for presentations or further discussions before a pilot is confirmed.",
    who: "Government Review Committee",
    colour: "bg-[#1a237e]",
  },
  {
    number: "04",
    icon: FlaskConical,
    title: "Pilot",
    subtitle: "Selected solutions are tested in a controlled environment",
    description:
      "Approved solutions undergo a structured pilot in a real-world government setting. Outcomes are measured against the agreed metrics and the startup receives structured feedback throughout the pilot period.",
    who: "Government + Startup",
    colour: "bg-[#283593]",
  },
  {
    number: "05",
    icon: TrendingUp,
    title: "Scale",
    subtitle: "Successful solutions move toward wider implementation",
    description:
      "Pilots that meet the success criteria are considered for wider rollout across the department or other relevant departments. The platform facilitates formal procurement and scale pathways under the relevant government frameworks.",
    who: "Government + Startup",
    colour: "bg-[#1a237e]",
  },
];

export function HowItWorks() {
  return (
    <div>
      {/* Page header */}
      <section className="bg-[#1a237e] text-white py-14">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-3">How It Works</h1>
          <p className="text-white/75 max-w-2xl">
            A clear, five-stage pathway from defining a public challenge to scaling an innovative solution.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200 hidden sm:block" />

            <div className="space-y-10">
              {STEPS.map((step) => (
                <div key={step.number} className="relative flex gap-8">
                  {/* Icon node */}
                  <div className={`flex-shrink-0 w-16 h-16 ${step.colour} rounded-xl flex flex-col items-center justify-center text-white z-10 shadow-sm`}>
                    <step.icon className="w-6 h-6" />
                  </div>

                  {/* Content */}
                  <div className="bg-white border border-gray-200 rounded-xl p-7 flex-1 hover:border-[#1a237e] hover:shadow-sm transition-all">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <span className="text-xs font-bold text-[#FF9933] uppercase tracking-widest">{step.number}</span>
                        <h2 className="text-xl font-bold text-[#1a237e] leading-tight mt-0.5">{step.title}</h2>
                        <p className="text-sm font-medium text-gray-700 mt-1">{step.subtitle}</p>
                      </div>
                      <span className="text-xs bg-[#1a237e]/8 text-[#1a237e] font-semibold px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                        {step.who}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-14 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-[#1a237e] mb-4">Ready to get started?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Browse open challenges or register your startup to begin your journey on the platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/challenges"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1a237e] text-white font-semibold rounded-md hover:bg-[#283593] transition-colors no-underline"
            >
              Browse Challenges <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#1a237e] text-[#1a237e] font-semibold rounded-md hover:bg-[#1a237e] hover:text-white transition-colors no-underline"
            >
              Register Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
