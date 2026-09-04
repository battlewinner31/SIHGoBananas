import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

const faqs = [
  {
    question: "What is CivicSecure Identity Gateway?",
    answer: "CSIG is a government digital identity verification platform that enables citizens to authenticate themselves and access government services directly without intermediaries, paperwork, or physical documentation.",
  },
  {
    question: "How is my identity verified?",
    answer: "Identity verification uses UIDAI-compliant Aadhaar Offline e-KYC XML or DigiLocker integration, combined with live facial verification and liveness detection. The process is end-to-end encrypted and complies with all government security standards.",
  },
  {
    question: "Is my personal data safe?",
    answer: "Yes. All data is encrypted using AES-256 and TLS 1.3 standards. We follow DPDP Act guidelines, use Hardware Security Modules (HSM) for key management, and maintain tamper-evident audit logs. Your data is processed securely and never shared without your explicit consent.",
  },
  {
    question: "What is consent-based data sharing?",
    answer: "You have complete control over your data. Before any information is accessed or shared, explicit consent is obtained. You can view what data is being accessed, for what purpose, and you can withdraw consent at any time through the platform.",
  },
  {
    question: "Which government services can I access?",
    answer: "You can access certificate issuance, PDS services, scholarship verification, municipal services (birth/death certificates), ration card management, social welfare schemes, grievance redressal, and many other government services.",
  },
  {
    question: "Do I need Aadhaar to use CSIG?",
    answer: "While Aadhaar-based verification is the primary method, we also support DigiLocker integration and are working on alternative verification methods to ensure inclusive access for all citizens.",
  },
  {
    question: "What if I face an error during verification?",
    answer: "Our system provides detailed error messages and step-by-step guidance. You can access our help center, use the AI chatbot for assistance, or contact our support team through the grievance portal. Each transaction has a unique reference ID for tracking.",
  },
  {
    question: "Is CSIG available in regional languages?",
    answer: "Currently, CSIG is available in English and Hindi. We are actively working on adding more regional languages to ensure accessibility for all Indian citizens.",
  },
  {
    question: "How long does the verification process take?",
    answer: "The complete identity verification process typically takes 2-3 minutes. Once verified, accessing government services is instant. Service delivery times depend on the specific department and service type.",
  },
  {
    question: "Is CSIG accessible for persons with disabilities?",
    answer: "Yes. CSIG is WCAG 2.1 Level AA compliant, with screen reader support, keyboard navigation, high contrast modes, and other accessibility features to ensure inclusive access for all citizens.",
  },
];

export function FAQ() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-[#1a237e] mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Common questions about identity verification, security, and service access
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white border border-gray-200 rounded-lg px-6"
              >
                <AccordionTrigger className="text-left text-[#1a237e] hover:text-[#FF9933]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Additional help */}
          <div className="mt-12 bg-white p-8 rounded-lg border border-gray-200 text-center">
            <h3 className="text-[#1a237e] mb-3">Still have questions?</h3>
            <p className="text-gray-600 mb-6">
              Our support team is available to help you with any queries or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#1a237e] text-white rounded-lg hover:bg-[#283593] transition-colors"
              >
                Contact Support
              </a>
              <a
                href="#documentation"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-[#1a237e] text-[#1a237e] rounded-lg hover:bg-[#1a237e] hover:text-white transition-colors"
              >
                View Documentation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
