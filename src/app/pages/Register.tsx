import { Link } from "react-router";
import { Shield, Lightbulb, ArrowRight } from "lucide-react";

export function Register() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Page header */}
      <section className="bg-[#1a237e] text-white py-14 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-3">Join the Innovation Platform</h1>
          <p className="text-white/75 max-w-lg mx-auto">
            Choose your role to get started with InnovateGov.
          </p>
        </div>
      </section>

      {/* Role selection */}
      <section className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Government */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 flex flex-col items-start hover:border-[#1a237e] hover:shadow-lg transition-all group">
              <div className="w-16 h-16 bg-[#1a237e] rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-bold text-[#1a237e] mb-2">Government Department</h2>
              <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-8">
                Post challenges, discover solutions and manage innovation initiatives for your department.
              </p>
              <Link
                to="/login?role=government"
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#1a237e] text-white font-semibold rounded-lg hover:bg-[#283593] transition-colors no-underline text-sm"
              >
                Register as Government <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Startup */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 flex flex-col items-start hover:border-[#FF9933] hover:shadow-lg transition-all group">
              <div className="w-16 h-16 bg-[#FF9933] rounded-xl flex items-center justify-center mb-6">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-bold text-[#1a237e] mb-2">Startup</h2>
              <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-8">
                Showcase your solution, discover government opportunities and participate in challenges.
              </p>
              <Link
                to="/login?role=startup"
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#FF9933] text-white font-semibold rounded-lg hover:bg-[#e8871e] transition-colors no-underline text-sm"
              >
                Register as Startup <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-[#1a237e] font-semibold hover:text-[#FF9933] no-underline transition-colors">
              Sign in here
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
