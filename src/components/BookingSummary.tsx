
import { format } from 'date-fns';
import { Shield, Check } from 'lucide-react';

interface PriceDetails {
  basePrice: number;
  insuranceCost?: number;
  taxFee?: number;
  serviceFee: number;
  total: number;
}

interface BookingSummaryProps {
  item: any;
  type: string;
  duration: number;
  dates: {
    start: Date;
    end: Date;
  };
  priceDetails: PriceDetails;
}

const BookingSummary = ({ item, type, duration, dates, priceDetails }: BookingSummaryProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-4">
      <div className="p-6">
        <h2 className="text-lg font-bold mb-4">Booking Summary</h2>
        
        <div className="flex mb-4">
          <div className="w-20 h-20 bg-gray-200 rounded overflow-hidden mr-3">
            <img 
              src={item.image} 
              alt={item.name || item.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium">{item.name || item.title}</h3>
            <p className="text-sm text-gray-600">
              {type === 'car' ? `${item.category} - ${item.transmission}` : 
               type === 'hotel' ? `${item.location} - ${item.rating} Stars` :
               type === 'tour' ? `${item.location} - ${item.duration}` : ''}
            </p>
          </div>
        </div>
        
        <div className="border-t border-b border-gray-100 py-4 mb-4">
          <div className="mb-1 text-sm">
            <span className="font-medium">Duration:</span> {duration} days
          </div>
          <div className="mb-1 text-sm">
            <span className="font-medium">Dates:</span> {format(dates.start, "MMM d")} - {format(dates.end, "MMM d, yyyy")}
          </div>
        </div>
        
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Base Rate ({duration} days)</span>
            <span>${priceDetails.basePrice}</span>
          </div>
          
          {priceDetails.insuranceCost && priceDetails.insuranceCost > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Insurance</span>
              <span>${priceDetails.insuranceCost}</span>
            </div>
          )}
          
          {priceDetails.taxFee && priceDetails.taxFee > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax</span>
              <span>${priceDetails.taxFee}</span>
            </div>
          )}
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Service Fee</span>
            <span>${priceDetails.serviceFee}</span>
          </div>
          
          <div className="flex justify-between pt-3 border-t border-gray-100 font-bold">
            <span>Total</span>
            <span>${priceDetails.total}</span>
          </div>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-green-600 mr-3" />
            <div>
              <p className="font-medium text-sm">Free Cancellation</p>
              <p className="text-xs text-gray-500">Up to 48 hours before pickup</p>
            </div>
          </div>
          <div className="flex items-center">
            <Check className="h-5 w-5 text-green-600 mr-3" />
            <div>
              <p className="font-medium text-sm">No Hidden Fees</p>
              <p className="text-xs text-gray-500">Taxes and fees included</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4">
        <h3 className="font-medium mb-3 text-sm">Need Help?</h3>
        <p className="text-xs text-gray-600 mb-2">
          For assistance with your booking, contact our customer support:
        </p>
        <p className="text-xs font-medium">support@travelbooking.com</p>
        <p className="text-xs font-medium">+1 (800) 123-4567</p>
      </div>
    </div>
  );
};

export default BookingSummary;
