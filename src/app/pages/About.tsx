import { Link } from "react-router";
import { Lightbulb, Shield, BarChart3, ArrowRight } from "lucide-react";

const PRINCIPLES = [
  {
    icon: Lightbulb,
    title: "Enable Innovation",
    description: "Create structured pathways for startups to propose, test, and scale solutions for government challenges — reducing the barriers between innovation and public impact.",
  },
  {
    icon: Shield,
    title: "Reduce Barriers",
    description: "Simplify procurement complexity and give startups a transparent route to working with government departments, removing traditional gatekeeping in public-sector contracting.",
  },
  {
    icon: BarChart3,
    title: "Support Evidence-Based Decisions",
    description: "Ensure that pilots are structured, outcomes are measured, and decisions to scale are grounded in real performance data rather than assumptions.",
  },
];

const STATS = [
  { value: "42", label: "Active Challenges" },
  { value: "180+", label: "Registered Startups" },
  { value: "12", label: "Pilot Projects" },
  { value: "8", label: "Ministries Involved" },
];

export function About() {
  return (
    <div>
      {/* Page header */}
      <section className="bg-[#1a237e] text-white py-14">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-3">About InnovateGov</h1>
          <p className="text-white/75 max-w-2xl">
            Understanding the platform, its purpose, and the principles that guide it.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-3 space-y-6">
              <div>
                <span className="text-xs font-bold text-[#FF9933] uppercase tracking-widest">Our Mission</span>
                <h2 className="text-2xl font-bold text-[#1a237e] mt-2 mb-4">Bridging Government Needs and Startup Innovation</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Government departments face complex challenges that require innovative solutions, while startups often lack a clear pathway to reach public-sector users.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our platform creates a structured connection between government needs and startup innovation, helping departments discover solutions and giving startups opportunities to contribute to public challenges.
              </p>
              <p className="text-gray-700 leading-relaxed">
                By making government challenges transparent and accessible, and by providing a clear process from discovery to pilot to scale, InnovateGov reduces the friction that has historically kept the public sector and the innovation ecosystem apart.
              </p>
            </div>
            <div className="lg:col-span-2">
              <div className="bg-[#1a237e] rounded-2xl p-8 text-white">
                <p className="text-white/70 text-sm font-medium uppercase tracking-widest mb-6">Platform at a Glance</p>
                <div className="grid grid-cols-2 gap-6">
                  {STATS.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-3xl font-bold text-[#FF9933]">{stat.value}</p>
                      <p className="text-white/75 text-sm mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#FF9933] uppercase tracking-widest">Our Principles</span>
            <h2 className="text-2xl font-bold text-[#1a237e] mt-2">What Guides Us</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="bg-white border border-gray-200 rounded-xl p-7 hover:border-[#1a237e] hover:shadow-sm transition-all">
                <div className="w-12 h-12 bg-[#1a237e] rounded-lg flex items-center justify-center mb-5">
                  <p.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-[#1a237e] text-lg mb-3">{p.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who uses it */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-gray-200 rounded-xl p-8 hover:border-[#1a237e] transition-colors">
              <div className="w-12 h-12 bg-[#FF9933] rounded-lg flex items-center justify-center mb-5">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-[#1a237e] text-xl mb-3">Government Departments</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                Post challenges, review incoming solution proposals, run structured pilots, and move proven solutions toward wider implementation — all within a single managed workflow.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a237e] hover:text-[#FF9933] transition-colors no-underline"
              >
                Register as Government <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="border border-gray-200 rounded-xl p-8 hover:border-[#1a237e] transition-colors">
              <div className="w-12 h-12 bg-[#1a237e] rounded-lg flex items-center justify-center mb-5">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-[#1a237e] text-xl mb-3">Startups & Innovators</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                Discover real government challenges, submit solution proposals, and gain access to government pilots — building a verifiable track record of public-sector deployment that supports scale and further procurement.
              </p>
              <Link
                to="/solutions"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a237e] hover:text-[#FF9933] transition-colors no-underline"
              >
                Explore Solutions Areas <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
