
import { MessageCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const WhatsAppButton = () => {
  const [expanded, setExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const { toast } = useToast();
  const whatsappNumber = "+1234567890"; // Replace with your actual WhatsApp number
  
  useEffect(() => {
    // Show button after a short delay for better UX
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const openWhatsApp = (message: string) => {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    toast({
      title: "WhatsApp Opening",
      description: "Connecting you to our customer support team",
      duration: 3000,
    });
    setExpanded(false);
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  if (!showButton) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" role="region" aria-label="WhatsApp Support">
      {expanded && (
        <div className="mb-4 bg-white rounded-lg shadow-xl p-4 w-72 animate-fade-in">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-800">Contact Support</h3>
            <button 
              onClick={toggleExpanded} 
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close support menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <p className="text-sm text-gray-600 mb-3">How can we help you today?</p>
          
          <div className="space-y-2">
            <button 
              onClick={() => openWhatsApp("Hello TravelGo, I need assistance with booking a tour.")}
              className="w-full text-left text-sm p-2 rounded hover:bg-gray-100 transition-colors"
              aria-label="Get assistance with tour booking"
            >
              Assistance with tour booking
            </button>
            
            <button 
              onClick={() => openWhatsApp("Hello TravelGo, I'd like to inquire about hotel availability.")}
              className="w-full text-left text-sm p-2 rounded hover:bg-gray-100 transition-colors"
              aria-label="Inquire about hotel availability"
            >
              Hotel availability inquiry
            </button>
            
            <button 
              onClick={() => openWhatsApp("Hello TravelGo, I have a question about car rentals.")}
              className="w-full text-left text-sm p-2 rounded hover:bg-gray-100 transition-colors"
              aria-label="Ask about car rentals"
            >
              Question about car rentals
            </button>
            
            <button 
              onClick={() => openWhatsApp("Hello TravelGo, I need help with my existing booking.")}
              className="w-full text-left text-sm p-2 rounded hover:bg-gray-100 transition-colors"
              aria-label="Get help with existing booking"
            >
              Help with existing booking
            </button>
          </div>
        </div>
      )}
      
      <button
        onClick={toggleExpanded}
        className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center"
        aria-label="Contact us on WhatsApp"
        aria-expanded={expanded}
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  );
};

export default WhatsAppButton;
