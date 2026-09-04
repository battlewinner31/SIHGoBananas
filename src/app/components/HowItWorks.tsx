import { UserCheck, FileText, Upload, Scan, Award, CheckCircle, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: UserCheck,
    title: "User Identity Input",
    description: "Citizen provides basic identity information to initiate the verification process",
  },
  {
    icon: FileText,
    title: "Consent Capture",
    description: "Explicit consent obtained for data access and processing as per DPDP Act",
  },
  {
    icon: Upload,
    title: "Offline e-KYC XML Upload",
    description: "Upload Aadhaar Offline e-KYC XML or connect DigiLocker account",
  },
  {
    icon: Scan,
    title: "Realtime Liveness & Face Match",
    description: "Live selfie capture with liveness detection and biometric verification",
  },
  {
    icon: Award,
    title: "Digital Credential Issuance",
    description: "W3C Verifiable Credential issued upon successful authentication",
  },
  {
    icon: CheckCircle,
    title: "Access Government Services",
    description: "Direct access to services without middlemen or physical documentation",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-[#1a237e] mb-4">How the System Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A simple, secure, and transparent six-step process to verify your identity and access services
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-[#1a237e] via-[#FF9933] to-[#1a237e] opacity-20"></div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-[#FF9933] transition-all">
                    {/* Step number */}
                    <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#1a237e] text-white rounded-full flex items-center justify-center z-10">
                      <span>{index + 1}</span>
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 bg-gradient-to-br from-[#1a237e] to-[#283593] rounded-lg flex items-center justify-center mb-4 mx-auto">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-[#1a237e] text-center mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-center text-sm">{step.description}</p>
                  </div>

                  {/* Arrow for flow */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                      <ArrowRight className="w-8 h-8 text-[#FF9933]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
