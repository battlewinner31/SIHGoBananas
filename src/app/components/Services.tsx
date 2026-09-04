import { FileText, Package, GraduationCap, Building2, Wallet, Heart, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const services = [
  {
    icon: FileText,
    title: "Certificate Issuance",
    description: "Income, caste, domicile, and other government certificates issued instantly",
  },
  {
    icon: Package,
    title: "Public Distribution System",
    description: "Access PDS services, check entitlements, and track ration distribution",
  },
  {
    icon: GraduationCap,
    title: "Scholarship Verification",
    description: "Student identity verification for scholarship applications and disbursement",
  },
  {
    icon: Building2,
    title: "Municipal Services",
    description: "Birth/death certificates, property tax, and local authority services",
  },
  {
    icon: Wallet,
    title: "Ration Card & Utility Services",
    description: "Ration card management and utility bill payments with verified identity",
  },
  {
    icon: Heart,
    title: "Social Welfare Schemes",
    description: "Access pension, healthcare, and other welfare schemes without intermediaries",
  },
  {
    icon: MessageSquare,
    title: "Grievance Redressal Portal",
    description: "Submit and track complaints with authenticated identity for accountability",
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-[#1a237e] mb-4">Government Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access a wide range of government services with verified digital identity
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-xl transition-all group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#1a237e] to-[#283593] rounded-lg flex items-center justify-center mb-4">
                <service.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-[#1a237e] mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>

              <Button
                variant="outline"
                size="sm"
                className="w-full border-[#1a237e] text-[#1a237e] hover:bg-[#1a237e] hover:text-white group-hover:bg-[#1a237e] group-hover:text-white transition-all"
              >
                Proceed
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
