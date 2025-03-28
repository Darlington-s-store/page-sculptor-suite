
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminStats from '@/components/admin/AdminStats';
import RecentBookings from '@/components/admin/RecentBookings';
import BookingChart from '@/components/admin/BookingChart';
import RevenueChart from '@/components/admin/RevenueChart';
import { bookingApi, adminApi } from '@/services/api';

const AdminDashboard = () => {
  const [timeframe, setTimeframe] = useState<'day' | 'week' | 'month' | 'year'>('month');
  
  // Use the admin dashboard data endpoint
  const { data: dashboardData, isLoading: dashboardLoading } = useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: adminApi.getDashboardData,
  });
  
  // Fallback to separate queries if the dashboard endpoint fails
  const { data: bookings, isLoading: bookingsLoading } = useQuery({
    queryKey: ['admin-bookings'],
    queryFn: bookingApi.getAllBookings,
    enabled: !dashboardData,
  });
  
  const loading = dashboardLoading || (bookingsLoading && !dashboardData);
  
  // Use dashboard data if available, otherwise use fallback data
  const stats = dashboardData?.stats || {
    totalBookings: bookings?.length || 0,
    totalRevenue: 0,
    totalUsers: 0,
    pendingBookings: 0,
  };
  
  // Use dashboard data if available, otherwise use fallback data
  const recentBookings = dashboardData?.recentBookings || (bookings?.slice(0, 10) || []);

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
                <BookingChart 
                  bookings={bookings || []} 
                  timeframe={timeframe} 
                />
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-6">Revenue Overview</h2>
                <RevenueChart 
                  payments={dashboardData?.monthlyRevenue || []} 
                  timeframe={timeframe} 
                />
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
                    bookings={recentBookings || []} 
                    type="recent"
                  />
                </TabsContent>
                
                <TabsContent value="pending">
                  <RecentBookings 
                    bookings={(recentBookings || []).filter(
                      (b: any) => b.status === 'pending'
                    )}
                    type="pending"
                  />
                </TabsContent>
                
                <TabsContent value="confirmed">
                  <RecentBookings 
                    bookings={(recentBookings || []).filter(
                      (b: any) => b.status === 'confirmed'
                    )}
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
