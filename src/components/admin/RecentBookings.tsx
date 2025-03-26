
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Check, X, MoreHorizontal, EyeIcon } from 'lucide-react';
import { bookingApi } from '@/services/api';
import { BookingStatus } from '@/services/db/models';

interface RecentBookingsProps {
  bookings: any[];
  type: 'recent' | 'pending' | 'confirmed';
}

const RecentBookings = ({ bookings, type }: RecentBookingsProps) => {
  const { toast } = useToast();
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  
  const handleStatusChange = async (bookingId: string, newStatus: BookingStatus) => {
    try {
      setUpdatingId(bookingId);
      await bookingApi.updateBookingStatus(bookingId, newStatus);
      toast({
        title: "Booking updated",
        description: `Booking status changed to ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: "Error updating booking",
        description: "There was a problem updating the booking status.",
        variant: "destructive",
      });
    } finally {
      setUpdatingId(null);
    }
  };
  
  const getStatusBadge = (status: string) => {
    const statusStyles = {
      pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
      confirmed: "bg-green-100 text-green-800 hover:bg-green-200",
      cancelled: "bg-red-100 text-red-800 hover:bg-red-200",
      completed: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    };
    
    return (
      <Badge className={statusStyles[status as keyof typeof statusStyles]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Item</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Dates</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                No bookings found
              </TableCell>
            </TableRow>
          ) : (
            bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.id.substring(0, 8)}...</TableCell>
                <TableCell>{booking.userId.substring(0, 8)}...</TableCell>
                <TableCell>
                  {booking.itemType.charAt(0).toUpperCase() + booking.itemType.slice(1)} - {booking.itemId.substring(0, 8)}...
                </TableCell>
                <TableCell>${parseFloat(booking.totalAmount).toFixed(2)}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{new Date(booking.startDate).toLocaleDateString()}</div>
                    <div className="text-gray-500">to {new Date(booking.endDate).toLocaleDateString()}</div>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(booking.status)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="cursor-pointer">
                        <EyeIcon className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="cursor-pointer"
                        onClick={() => handleStatusChange(booking.id, BookingStatus.CONFIRMED)}
                        disabled={booking.status === 'confirmed' || updatingId === booking.id}
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Confirm
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="cursor-pointer text-red-600 focus:text-red-600"
                        onClick={() => handleStatusChange(booking.id, BookingStatus.CANCELLED)}
                        disabled={booking.status === 'cancelled' || updatingId === booking.id}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentBookings;
