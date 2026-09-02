import { Shield, Database, Key, Lock, FileCheck, Server, Globe, Fingerprint } from "lucide-react";

const technologies = [
  {
    icon: Shield,
    title: "UIDAI-Compliant Verification",
    description: "Full compliance with UIDAI authentication and device security guidelines",
  },
  {
    icon: Database,
    title: "APISetu & DigiLocker Integration",
    description: "Seamless integration with India's API marketplace and digital document locker",
  },
  {
    icon: Fingerprint,
    title: "FIDO2 / WebAuthn Device Attestation",
    description: "Passwordless authentication with hardware-backed security keys",
  },
  {
    icon: Lock,
    title: "AES-256 + TLS 1.3 Encryption",
    description: "Military-grade encryption standards for data in transit and at rest",
  },
  {
    icon: FileCheck,
    title: "Immutable Audit Logs",
    description: "Blockchain-inspired ledger technology for tamper-evident record keeping",
  },
  {
    icon: Key,
    title: "HSM / KMS Key Management",
    description: "Hardware Security Module and Key Management Service for cryptographic operations",
  },
  {
    icon: Globe,
    title: "W3C Verifiable Credentials",
    description: "International standard for interoperable digital identity credentials",
  },
  {
    icon: Server,
    title: "Zero-Knowledge Architecture",
    description: "Privacy-preserving verification without exposing personal information",
  },
];

export function Technology() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-[#1a237e] mb-4">Technology & Security</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built on world-class security standards and cutting-edge identity verification technology
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg border border-gray-200 hover:border-[#FF9933] hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#1a237e] to-[#283593] rounded-lg flex items-center justify-center mb-4">
                  <tech.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-[#1a237e] mb-2">{tech.title}</h4>
                <p className="text-sm text-gray-600">{tech.description}</p>
              </div>
            ))}
          </div>

          {/* Technology stack details */}
          <div className="mt-12 bg-[#1a237e] text-white p-8 rounded-xl">
            <h3 className="mb-6 text-center">Security Architecture</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-[#FF9933] mb-3">Authentication Layer</h4>
                <ul className="space-y-2 text-sm text-white/90">
                  <li>• Multi-factor authentication</li>
                  <li>• Biometric verification</li>
                  <li>• Device fingerprinting</li>
                  <li>• Session management</li>
                </ul>
              </div>
              <div>
                <h4 className="text-[#FF9933] mb-3">Data Protection</h4>
                <ul className="space-y-2 text-sm text-white/90">
                  <li>• End-to-end encryption</li>
                  <li>• Data minimization</li>
                  <li>• Secure key storage</li>
                  <li>• Privacy by design</li>
                </ul>
              </div>
              <div>
                <h4 className="text-[#FF9933] mb-3">Infrastructure</h4>
                <ul className="space-y-2 text-sm text-white/90">
                  <li>• Government cloud hosting</li>
                  <li>• DDoS protection</li>
                  <li>• Intrusion detection</li>
                  <li>• Regular security audits</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
