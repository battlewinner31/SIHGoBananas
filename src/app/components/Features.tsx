import { Shield, Scan, FileCheck, Lock, Users, Key, Database, GitBranch } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Digital Identity Authentication",
    description: "Paperless Aadhaar Offline e-KYC and DigiLocker Integration for seamless verification",
  },
  {
    icon: Scan,
    title: "Face Verification with Liveness Detection",
    description: "Advanced biometric verification with real-time liveness checks to prevent fraud",
  },
  {
    icon: FileCheck,
    title: "Tamper-Evident Audit Trails",
    description: "Immutable ledger-based logging for complete transparency and accountability",
  },
  {
    icon: Lock,
    title: "Consent-Based Data Sharing",
    description: "User-controlled data access with explicit consent management and revocation",
  },
  {
    icon: Users,
    title: "Secure Access to Government Departments",
    description: "Unified authentication across multiple government services and departments",
  },
  {
    icon: Key,
    title: "End-to-End Encryption & KMS Integration",
    description: "Military-grade encryption with Hardware Security Module key management",
  },
  {
    icon: Database,
    title: "W3C Verifiable Credentials",
    description: "Standard-compliant digital credentials for interoperable identity verification",
  },
  {
    icon: GitBranch,
    title: "APISetu Integration",
    description: "Seamless integration with India's API marketplace for service delivery",
  },
];

export function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-[#1a237e] mb-4">Key Features</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive suite of security and authentication features designed for transparent governance
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border border-gray-200 hover:border-[#1a237e] hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-[#1a237e] rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[#1a237e] mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
