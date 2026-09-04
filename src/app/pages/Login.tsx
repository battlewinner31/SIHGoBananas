import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { Shield, Lightbulb, Eye, EyeOff } from "lucide-react";

export function Login() {
  const [searchParams] = useSearchParams();
  const defaultRole = searchParams.get("role") === "startup" ? "startup" : "government";
  const [role, setRole] = useState<"government" | "startup">(defaultRole as "government" | "startup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "government") {
      navigate("/dashboard/government");
    } else {
      navigate("/dashboard/startup");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <section className="bg-[#1a237e] text-white py-14 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-3">Sign in to InnovateGov</h1>
          <p className="text-white/75 max-w-md mx-auto">
            Access your dashboard and manage your work on the platform.
          </p>
        </div>
      </section>

      <section className="flex-1 py-14">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            {/* Role toggle */}
            <div className="flex rounded-lg border border-gray-200 p-1 mb-8">
              <button
                type="button"
                onClick={() => setRole("government")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-semibold transition-colors ${
                  role === "government"
                    ? "bg-[#1a237e] text-white"
                    : "text-gray-600 hover:text-[#1a237e]"
                }`}
              >
                <Shield className="w-4 h-4" /> Government
              </button>
              <button
                type="button"
                onClick={() => setRole("startup")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-semibold transition-colors ${
                  role === "startup"
                    ? "bg-[#FF9933] text-white"
                    : "text-gray-600 hover:text-[#FF9933]"
                }`}
              >
                <Lightbulb className="w-4 h-4" /> Startup
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={role === "government" ? "officer@ministry.gov.in" : "founder@startup.in"}
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e]/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e]/20 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  Remember me
                </label>
                <a href="#" className="text-[#1a237e] hover:text-[#FF9933] font-medium transition-colors no-underline">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className={`w-full py-3 font-semibold rounded-lg text-white transition-colors ${
                  role === "government"
                    ? "bg-[#1a237e] hover:bg-[#283593]"
                    : "bg-[#FF9933] hover:bg-[#e8871e]"
                }`}
              >
                Sign In as {role === "government" ? "Government" : "Startup"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              {"Don't have an account? "}
              <Link to="/register" className="text-[#1a237e] font-semibold hover:text-[#FF9933] no-underline transition-colors">
                Register now
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
