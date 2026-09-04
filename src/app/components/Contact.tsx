import { Mail, Phone, MessageCircle, FileText, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-[#1a237e] mb-4">Contact & Support</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with us for assistance, queries, or grievance redressal
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact form */}
          <div>
            <h3 className="text-[#1a237e] mb-6">Submit Grievance / Query</h3>
            <form className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="mt-2"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="mt-2"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Mobile Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  className="mt-2"
                  required
                />
              </div>

              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="Brief description of your query"
                  className="mt-2"
                  required
                />
              </div>

              <div>
                <Label htmlFor="message">Message / Grievance Details *</Label>
                <Textarea
                  id="message"
                  placeholder="Provide detailed information about your query or grievance"
                  rows={6}
                  className="mt-2"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-[#1a237e] hover:bg-[#283593] text-white">
                Submit Request
              </Button>
            </form>
          </div>

          {/* Contact information */}
          <div>
            <h3 className="text-[#1a237e] mb-6">Get Help</h3>
            <div className="space-y-6">
              {/* Helpline */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1a237e] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-[#1a237e] mb-2">Helpline</h4>
                    <p className="text-gray-600 mb-2">
                      Toll-Free: <strong>1800-XXX-XXXX</strong>
                    </p>
                    <p className="text-sm text-gray-500">Available 24x7</p>
                  </div>
                </div>
              </div>

              {/* Email Support */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1a237e] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-[#1a237e] mb-2">Email Support</h4>
                    <p className="text-gray-600 mb-2">
                      <strong>support@csig.gov.in</strong>
                    </p>
                    <p className="text-sm text-gray-500">Response within 24 hours</p>
                  </div>
                </div>
              </div>

              {/* AI Chatbot */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1a237e] rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-[#1a237e] mb-2">AI Assistant</h4>
                    <p className="text-gray-600 mb-3">
                      Chat with our AI-powered assistant for instant help
                    </p>
                    <Button variant="outline" size="sm" className="border-[#1a237e] text-[#1a237e]">
                      Start Chat
                    </Button>
                  </div>
                </div>
              </div>

              {/* Documentation */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1a237e] rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-[#1a237e] mb-2">Documentation</h4>
                    <p className="text-gray-600 mb-3">
                      Access user guides, FAQs, and technical documentation
                    </p>
                    <Button variant="outline" size="sm" className="border-[#1a237e] text-[#1a237e]">
                      View Docs
                    </Button>
                  </div>
                </div>
              </div>

              {/* Office Address */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1a237e] rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-[#1a237e] mb-2">Office Address</h4>
                    <p className="text-gray-600">
                      National Informatics Centre<br />
                      Ministry of Electronics & IT<br />
                      A-Block, CGO Complex<br />
                      Lodhi Road, New Delhi - 110003
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
