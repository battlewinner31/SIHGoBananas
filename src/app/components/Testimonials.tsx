import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "CSIG has transformed how we deliver services to citizens. The elimination of intermediaries has significantly reduced corruption and improved efficiency in our district.",
    name: "Dr. Rajesh Kumar",
    role: "District Collector, Maharashtra",
    department: "Department of Revenue",
  },
  {
    quote: "As a citizen, I no longer need to visit multiple offices or rely on agents. I got my income certificate in just 10 minutes from my home. This is the India we dreamed of.",
    name: "Priya Sharma",
    role: "Citizen, Delhi",
    department: "Service Beneficiary",
  },
  {
    quote: "The security architecture of CSIG sets a new benchmark for digital governance. The end-to-end encryption and audit trails ensure complete transparency and accountability.",
    name: "K. Venkatesh",
    role: "Chief Technology Officer",
    department: "National Informatics Centre",
  },
  {
    quote: "We've seen a 85% reduction in service delivery time and complete elimination of unauthorized middlemen. Citizens can now access their rightful benefits with dignity.",
    name: "Sunita Patel",
    role: "Secretary, Rural Development",
    department: "Government of Gujarat",
  },
  {
    quote: "The UIDAI-compliant verification process is seamless and secure. We've onboarded over 50,000 beneficiaries in our pilot program with zero security incidents.",
    name: "Anil Mehta",
    role: "Program Director",
    department: "Ministry of Electronics & IT",
  },
  {
    quote: "CSIG's accessibility features ensure that every citizen, regardless of their digital literacy, can access government services. This is true digital inclusion.",
    name: "Dr. Meena Singh",
    role: "Accessibility Consultant",
    department: "Department of Empowerment of Persons with Disabilities",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-[#1a237e] mb-4">Pilot Program Impact</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Testimonials from government officials, administrators, and citizens
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg border border-gray-200 hover:border-[#FF9933] transition-all"
            >
              <Quote className="w-8 h-8 text-[#FF9933] mb-4" />
              <p className="text-gray-700 mb-6 leading-relaxed italic">"{testimonial.quote}"</p>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-[#1a237e]">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
                <p className="text-sm text-gray-500">{testimonial.department}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Impact statistics */}
        <div className="mt-16 max-w-5xl mx-auto bg-gradient-to-br from-[#1a237e] to-[#283593] text-white p-8 rounded-xl">
          <h3 className="text-center mb-8">Pilot Program Results</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl text-[#FF9933] mb-2">500K+</div>
              <div className="text-sm text-white/90">Citizens Verified</div>
            </div>
            <div className="text-center">
              <div className="text-4xl text-[#FF9933] mb-2">85%</div>
              <div className="text-sm text-white/90">Time Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl text-[#FF9933] mb-2">100%</div>
              <div className="text-sm text-white/90">Corruption Elimination</div>
            </div>
            <div className="text-center">
              <div className="text-4xl text-[#FF9933] mb-2">12</div>
              <div className="text-sm text-white/90">States Deployed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
