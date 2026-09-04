import { FileText, Shield, Users, Globe, CheckCircle } from "lucide-react";

const compliances = [
  {
    icon: FileText,
    title: "DPDP Act Alignment",
    description: "Full compliance with Digital Personal Data Protection Act, 2023 for citizen data rights",
  },
  {
    icon: Shield,
    title: "UIDAI Device & Authentication Guidelines",
    description: "Adherence to UIDAI's technical and security specifications for Aadhaar-based services",
  },
  {
    icon: Users,
    title: "WCAG 2.1 Accessibility Standards",
    description: "Level AA accessibility compliance for inclusive digital service delivery",
  },
  {
    icon: Globe,
    title: "Public Digital Infrastructure Principles",
    description: "Built on India Stack principles: open, interoperable, and privacy-preserving",
  },
  {
    icon: CheckCircle,
    title: "ISO 27001 Security Best Practices",
    description: "International standard for information security management systems",
  },
];

export function Compliance() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-[#1a237e] mb-4">Compliance & Policy</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Adhering to the highest standards of legal compliance, security, and accessibility
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {compliances.map((compliance, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-[#1a237e] transition-all"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#1a237e] to-[#283593] rounded-lg flex items-center justify-center mb-4">
                  <compliance.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-[#1a237e] mb-2">{compliance.title}</h3>
                <p className="text-gray-600">{compliance.description}</p>
              </div>
            ))}
          </div>

          {/* Regulatory information */}
          <div className="mt-12 bg-white p-8 rounded-xl border border-gray-200">
            <h3 className="text-[#1a237e] mb-6 text-center">Regulatory Oversight</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-[#1a237e] mb-3">Data Protection Measures</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Purpose limitation and data minimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>User consent management and withdrawal rights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Data breach notification protocols</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Right to access and correction mechanisms</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-[#1a237e] mb-3">Accessibility Features</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Screen reader compatibility and ARIA labels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Keyboard navigation support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>High contrast modes and readable fonts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Multi-language support (English & Hindi)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
