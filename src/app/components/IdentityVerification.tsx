import { Upload, Link2, Camera, CheckCircle, Shield } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Aadhaar Offline e-KYC XML",
    description: "Securely upload your Aadhaar Offline e-KYC XML file with ZIP encryption",
    indicator: "Step 1",
  },
  {
    icon: Link2,
    title: "Connect DigiLocker Account",
    description: "Link your DigiLocker account via APISetu for seamless document access",
    indicator: "Step 2",
  },
  {
    icon: Camera,
    title: "Capture Live Selfie",
    description: "Take a live selfie with liveness detection to verify your identity",
    indicator: "Step 3",
  },
  {
    icon: CheckCircle,
    title: "Verify & Receive Digital Credential",
    description: "Get your W3C Verifiable Credential instantly upon successful verification",
    indicator: "Step 4",
  },
];

export function IdentityVerification() {
  return (
    <section id="authentication" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#1a237e]/10 px-4 py-2 rounded-full mb-4">
            <Shield className="w-5 h-5 text-[#1a237e]" />
            <span className="text-sm text-[#1a237e]">UIDAI Compliant Process</span>
          </div>
          <h2 className="text-[#1a237e] mb-4">Identity Verification Module</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Secure, encrypted, and compliant identity verification process
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl border-2 border-gray-200 hover:border-[#FF9933] transition-all"
              >
                {/* Indicator badge */}
                <div className="absolute top-4 right-4">
                  <span className="text-xs text-[#1a237e] bg-[#FF9933]/20 px-3 py-1 rounded-full">
                    {step.indicator}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-[#1a237e] to-[#283593] rounded-xl flex items-center justify-center mb-4">
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-[#1a237e] mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>

                {/* Security indicator */}
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Encrypted & Secure</span>
                </div>
              </div>
            ))}
          </div>

          {/* Security notice */}
          <div className="mt-8 bg-[#1a237e] text-white p-6 rounded-lg">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-[#FF9933] flex-shrink-0 mt-1" />
              <div>
                <h4 className="mb-2">End-to-End Security Guarantee</h4>
                <p className="text-white/90">
                  All data transmission is encrypted using AES-256 and TLS 1.3. Your personal information is
                  processed securely and never stored on external servers. Keys are managed through HSM/KMS
                  integration for maximum security.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
