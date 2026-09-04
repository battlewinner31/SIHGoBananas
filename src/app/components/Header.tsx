import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, Lightbulb } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Challenges", path: "/challenges" },
  { label: "Solutions", path: "/solutions" },
  { label: "How It Works", path: "/how-it-works" },
  { label: "About", path: "/about" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <header className="sticky top-0 z-50 bg-white border-b-4 border-[#FF9933] shadow-sm">
      {/* Main header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 no-underline">
            <div className="w-12 h-12 bg-[#1a237e] rounded-lg flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-7 h-7 text-[#FF9933]" />
            </div>
            <div>
              <p className="text-[#1a237e] font-bold text-lg leading-tight tracking-tight">InnovateGov</p>
              <p className="text-xs text-gray-500 leading-tight">Empowering Innovation for Public Good</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors no-underline ${
                  isActive(link.path)
                    ? "text-[#1a237e] bg-[#1a237e]/8 font-semibold"
                    : "text-gray-700 hover:text-[#1a237e] hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-[#1a237e] border border-[#1a237e] rounded-md hover:bg-[#1a237e] hover:text-white transition-colors no-underline"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 text-sm font-medium bg-[#FF9933] text-white rounded-md hover:bg-[#e8871e] transition-colors no-underline"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:text-[#1a237e]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-gray-100 space-y-1 pb-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium no-underline ${
                  isActive(link.path)
                    ? "text-[#1a237e] bg-[#1a237e]/8 font-semibold"
                    : "text-gray-700 hover:text-[#1a237e]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 flex gap-2">
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="flex-1 text-center px-4 py-2 text-sm font-medium text-[#1a237e] border border-[#1a237e] rounded-md no-underline"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="flex-1 text-center px-4 py-2 text-sm font-medium bg-[#FF9933] text-white rounded-md no-underline"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
