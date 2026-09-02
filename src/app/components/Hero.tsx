import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";

export function Hero() {
  return (
    <section id="home" className="relative bg-gradient-to-br from-[#1a237e] to-[#283593] text-white py-20 lg:py-32">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FF9933] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Government badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <CheckCircle className="w-4 h-4 text-[#FF9933]" />
            <span className="text-sm">Government of India Digital Initiative</span>
          </div>

          {/* Main heading */}
          <h1 className="mb-6">
            Secure Identity. Transparent Governance.
          </h1>

          {/* Subtext */}
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Authenticate yourself instantly and access government services without intermediaries or paperwork.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#FF9933] hover:bg-[#FF9933]/90 text-white"
            >
              Begin Verification
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 text-white border-white hover:bg-white hover:text-[#1a237e]"
            >
              Explore Services
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#FF9933]" />
              <span>UIDAI Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#FF9933]" />
              <span>End-to-End Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#FF9933]" />
              <span>WCAG 2.1 Accessible</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
