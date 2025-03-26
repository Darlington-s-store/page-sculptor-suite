
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { bookingApi, paymentApi } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const UserDashboard = () => {
  const { user } = useAuth();
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

  // Fetch user bookings
  const { 
    data: bookingsData, 
    isLoading: bookingsLoading,
    error: bookingsError,
    refetch: refetchBookings
  } = useQuery({
    queryKey: ['bookings', user?.id],
    queryFn: () => bookingApi.getUserBookings(user?.id || ''),
    enabled: !!user?.id,
  });

  // Fetch payments for selected booking
  const { 
    data: paymentsData, 
    isLoading: paymentsLoading,
    refetch: refetchPayments
  } = useQuery({
    queryKey: ['payments', selectedBookingId],
    queryFn: () => paymentApi.getPaymentsByBookingId(selectedBookingId || ''),
    enabled: !!selectedBookingId,
  });

  useEffect(() => {
    if (bookingsData?.bookings && bookingsData.bookings.length > 0 && !selectedBookingId) {
      setSelectedBookingId(bookingsData.bookings[0].id);
    }
  }, [bookingsData, selectedBookingId]);

  const handleStatusUpdate = async (bookingId: string, newStatus: string) => {
    try {
      const result = await bookingApi.updateBookingStatus(bookingId, newStatus);
      if (result) {
        toast({
          title: "Status Updated",
          description: "Booking status has been updated successfully",
        });
        refetchBookings();
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
      toast({
        title: "Update Failed",
        description: "Failed to update booking status",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Please Log In</h1>
          <p className="text-gray-600 mb-6">You need to log in to view your dashboard.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>
        
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="payments">Payment History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="bookings">
            {bookingsLoading ? (
              <div className="text-center py-12">Loading your bookings...</div>
            ) : bookingsError ? (
              <div className="text-center py-12 text-red-500">Error loading bookings</div>
            ) : !bookingsData?.bookings || bookingsData.bookings.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">You don't have any bookings yet.</p>
                <Button variant="outline" onClick={() => window.location.href = '/hotels'}>
                  Start Booking
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 space-y-4">
                  <h3 className="font-semibold text-lg mb-4">Your Bookings</h3>
                  {bookingsData.bookings.map((booking: any) => (
                    <Card 
                      key={booking.id} 
                      className={`cursor-pointer hover:shadow-md transition ${selectedBookingId === booking.id ? 'border-primary' : ''}`}
                      onClick={() => setSelectedBookingId(booking.id)}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                          {booking.itemType.charAt(0).toUpperCase() + booking.itemType.slice(1)} Booking
                        </CardTitle>
                        <CardDescription className="text-xs">
                          {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="pt-2 flex justify-between">
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status.toUpperCase()}
                        </Badge>
                        <span className="text-sm font-semibold">${booking.totalAmount}</span>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                
                <div className="md:col-span-2">
                  {selectedBookingId && bookingsData.bookings.map((booking: any) => 
                    booking.id === selectedBookingId ? (
                      <Card key={`details-${booking.id}`} className="shadow-sm">
                        <CardHeader>
                          <CardTitle>Booking Details</CardTitle>
                          <CardDescription>
                            Reference ID: {booking.id}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Booking Type</p>
                              <p className="font-medium">{booking.itemType}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Status</p>
                              <Badge className={getStatusColor(booking.status)}>
                                {booking.status.toUpperCase()}
                              </Badge>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Check-in</p>
                              <p className="font-medium">{new Date(booking.startDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Check-out</p>
                              <p className="font-medium">{new Date(booking.endDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Guests</p>
                              <p className="font-medium">{booking.guestCount || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Total Amount</p>
                              <p className="font-medium">${booking.totalAmount}</p>
                            </div>
                          </div>
                          
                          {booking.specialRequests && (
                            <>
                              <Separator />
                              <div>
                                <p className="text-sm text-gray-500 mb-1">Special Requests</p>
                                <p className="text-sm">{booking.specialRequests}</p>
                              </div>
                            </>
                          )}
                        </CardContent>
                        <CardFooter className="flex justify-end space-x-2">
                          {booking.status === 'pending' && (
                            <>
                              <Button 
                                variant="outline" 
                                onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                              >
                                Cancel Booking
                              </Button>
                              <Button 
                                onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                              >
                                Confirm Booking
                              </Button>
                            </>
                          )}
                          {booking.status === 'confirmed' && (
                            <Button 
                              variant="outline" 
                              onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                            >
                              Cancel Booking
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    ) : null
                  )}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="payments">
            {!selectedBookingId ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Select a booking to view payment history</p>
              </div>
            ) : paymentsLoading ? (
              <div className="text-center py-12">Loading payment data...</div>
            ) : !paymentsData?.payments || paymentsData.payments.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No payment records found for this booking.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <h3 className="font-semibold text-lg">Payment History</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {paymentsData.payments.map((payment: any) => (
                    <Card key={payment.id} className="shadow-sm">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base">Payment</CardTitle>
                          <Badge className={payment.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}>
                            {payment.status.toUpperCase()}
                          </Badge>
                        </div>
                        <CardDescription>
                          {new Date(payment.createdAt).toLocaleDateString()} at {new Date(payment.createdAt).toLocaleTimeString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Amount</span>
                            <span className="font-semibold">${payment.amount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Method</span>
                            <span>{payment.paymentMethod}</span>
                          </div>
                          {payment.transactionId && (
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Transaction ID</span>
                              <span className="text-sm font-mono">{payment.transactionId}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
