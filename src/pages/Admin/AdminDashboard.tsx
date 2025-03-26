
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminStats from '@/components/admin/AdminStats';
import RecentBookings from '@/components/admin/RecentBookings';
import BookingChart from '@/components/admin/BookingChart';
import RevenueChart from '@/components/admin/RevenueChart';
import { bookingApi, paymentApi, userApi } from '@/services/api';

const AdminDashboard = () => {
  const [timeframe, setTimeframe] = useState<'day' | 'week' | 'month' | 'year'>('month');
  
  const { data: bookings, isLoading: bookingsLoading } = useQuery({
    queryKey: ['admin-bookings'],
    queryFn: bookingApi.getAllBookings,
  });
  
  const { data: payments, isLoading: paymentsLoading } = useQuery({
    queryKey: ['admin-payments'],
    queryFn: paymentApi.getAllPayments,
  });
  
  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: userApi.getAllUsers,
  });
  
  const loading = bookingsLoading || paymentsLoading || usersLoading;
  
  // Calculate stats
  const stats = {
    totalBookings: bookings?.length || 0,
    totalRevenue: payments ? payments.reduce((sum: number, payment: any) => sum + parseFloat(payment.amount), 0) : 0,
    totalUsers: users?.length || 0,
    pendingBookings: bookings ? bookings.filter((b: any) => b.status === 'pending').length : 0,
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        {loading ? (
          <div className="text-center py-10">Loading dashboard data...</div>
        ) : (
          <>
            <AdminStats stats={stats} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Booking Statistics</h2>
                  <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value as any)}
                    className="border rounded p-2"
                  >
                    <option value="day">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                  </select>
                </div>
                <BookingChart bookings={bookings} timeframe={timeframe} />
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-6">Revenue Overview</h2>
                <RevenueChart payments={payments} timeframe={timeframe} />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <Tabs defaultValue="recent">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Bookings</h2>
                  <TabsList>
                    <TabsTrigger value="recent">Recent</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="recent">
                  <RecentBookings 
                    bookings={bookings?.slice(0, 10) || []} 
                    type="recent"
                  />
                </TabsContent>
                
                <TabsContent value="pending">
                  <RecentBookings 
                    bookings={bookings?.filter((b: any) => b.status === 'pending').slice(0, 10) || []} 
                    type="pending"
                  />
                </TabsContent>
                
                <TabsContent value="confirmed">
                  <RecentBookings 
                    bookings={bookings?.filter((b: any) => b.status === 'confirmed').slice(0, 10) || []} 
                    type="confirmed"
                  />
                </TabsContent>
              </Tabs>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
