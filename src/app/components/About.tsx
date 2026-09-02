import { Target, Eye, Award } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-[#1a237e] mb-4">About CivicSecure Identity Gateway</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Building a transparent, secure, and citizen-centric digital governance ecosystem
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Mission */}
          <div className="bg-white p-8 rounded-xl border-2 border-gray-200 hover:border-[#1a237e] transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-[#1a237e] to-[#283593] rounded-xl flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-[#1a237e] mb-4">Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              Eliminating corruption by removing intermediaries in public service access. We enable citizens
              to directly authenticate their identity and access government services without paperwork,
              agents, or delays—ensuring transparency and accountability at every step.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white p-8 rounded-xl border-2 border-gray-200 hover:border-[#1a237e] transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-[#1a237e] to-[#283593] rounded-xl flex items-center justify-center mb-6">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-[#1a237e] mb-4">Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              A transparent, citizen-centric digital governance ecosystem where every Indian can access
              their rightful government services with dignity, security, and ease. We envision a future
              where technology empowers citizens and eliminates systemic inefficiencies.
            </p>
          </div>

          {/* Values */}
          <div className="bg-white p-8 rounded-xl border-2 border-gray-200 hover:border-[#1a237e] transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-[#1a237e] to-[#283593] rounded-xl flex items-center justify-center mb-6">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-[#1a237e] mb-4">Values</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#FF9933] rounded-full"></div>
                <span className="text-gray-600">Security & Privacy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#FF9933] rounded-full"></div>
                <span className="text-gray-600">Accessibility & Inclusion</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#FF9933] rounded-full"></div>
                <span className="text-gray-600">Transparency & Accountability</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#FF9933] rounded-full"></div>
                <span className="text-gray-600">Trust & Integrity</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#FF9933] rounded-full"></div>
                <span className="text-gray-600">Innovation & Excellence</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional context */}
        <div className="mt-12 max-w-4xl mx-auto bg-white p-8 rounded-xl border border-gray-200">
          <p className="text-gray-700 leading-relaxed text-center">
            CivicSecure Identity Gateway (CSIG) is a Government of India initiative designed to transform
            public service delivery through secure digital identity authentication. By leveraging UIDAI-compliant
            verification, DigiLocker integration, and W3C Verifiable Credentials, we create a seamless bridge
            between citizens and government services—removing bureaucratic barriers and establishing a new
            standard for digital governance.
          </p>
        </div>
      </div>
    </section>
  );
}
