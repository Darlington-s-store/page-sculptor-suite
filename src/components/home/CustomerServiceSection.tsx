
import React from 'react';
import { Phone, MessageCircle, Mail, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/AnimatedSection';

const CustomerServiceSection = () => {
  const whatsappNumber = "+233 552945333"; // Replace with your actual WhatsApp number
  const openWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=Hello%20TravelGo,%20I%20need%20assistance%20with`, '_blank');
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Need Help? We're Here For You</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our customer service team is available 24/7 to assist you with any questions, concerns, or travel arrangements.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-brand-yellow p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Call Us</h3>
                    <p className="text-gray-600 mb-2">For immediate assistance</p>
                    <a href="tel:+233 552945333" className="text-brand-yellow font-medium hover:underline">
                      +233 (552) 945-333
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-500 p-3 rounded-full mr-4">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">WhatsApp Support</h3>
                    <p className="text-gray-600 mb-2">Chat with our agents</p>
                    <Button 
                      onClick={openWhatsApp}
                      className="bg-green-500 hover:bg-green-600 text-white"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Start WhatsApp Chat
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-500 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Email Us</h3>
                    <p className="text-gray-600 mb-2">For detailed inquiries</p>
                    <a href="mailto:support@mytravelgo.com" className="text-blue-500 font-medium hover:underline">
                      support@mytravelgo.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-brand-dark text-white p-8 rounded-xl">
              <h3 className="font-bold text-xl mb-4">Send Us a Message</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm mb-1">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    placeholder="John Doe" 
                    className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm mb-1">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="your@email.com" 
                    className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm mb-1">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    placeholder="How can we help you?" 
                    className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm mb-1">Message</label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    placeholder="Tell us what you need..." 
                    className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  />
                </div>
                
                <Button className="w-full bg-brand-yellow text-black hover:brightness-105">
                  <Headphones className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CustomerServiceSection;
