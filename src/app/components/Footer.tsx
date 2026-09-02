import { Link } from "react-router";
import { Lightbulb, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1a237e] text-white pt-14 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 bg-white rounded-lg flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-[#1a237e]" />
              </div>
              <span className="font-bold text-lg">InnovateGov</span>
            </div>
            <p className="text-white/75 text-sm leading-relaxed">
              A Government of India initiative connecting public-sector challenges with startup innovation to create better public services.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold mb-4 text-[#FF9933]">Platform</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Challenges", path: "/challenges" },
                { label: "Solutions", path: "/solutions" },
                { label: "How It Works", path: "/how-it-works" },
                { label: "About", path: "/about" },
              ].map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-white/75 hover:text-[#FF9933] transition-colors no-underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-semibold mb-4 text-[#FF9933]">Account</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Register as Government", path: "/register" },
                { label: "Register as Startup", path: "/register" },
                { label: "Login", path: "/login" },
              ].map((l, i) => (
                <li key={i}>
                  <Link to={l.path} className="text-white/75 hover:text-[#FF9933] transition-colors no-underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-[#FF9933]">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5 text-white/75">
                <Mail className="w-4 h-4 text-[#FF9933] flex-shrink-0 mt-0.5" />
                <span>support@innovategov.gov.in</span>
              </li>
              <li className="flex items-start gap-2.5 text-white/75">
                <Phone className="w-4 h-4 text-[#FF9933] flex-shrink-0 mt-0.5" />
                <span>1800-XXX-XXXX (Toll Free)</span>
              </li>
              <li className="flex items-start gap-2.5 text-white/75">
                <MapPin className="w-4 h-4 text-[#FF9933] flex-shrink-0 mt-0.5" />
                <span>123, MG Road,&nbsp;&nbsp;Bengaluru, Karnataka, 560001<br /><br /></span>
              </li>
            </ul>
          </div>
        </div>

        

        
      </div>
    </footer>
  );
}
