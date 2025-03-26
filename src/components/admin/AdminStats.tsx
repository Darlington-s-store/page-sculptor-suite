
import { 
  TrendingUp, Users, ShoppingBag, Clock
} from 'lucide-react';

interface StatsProps {
  stats: {
    totalBookings: number;
    totalRevenue: number;
    totalUsers: number;
    pendingBookings: number;
  };
}

const AdminStats = ({ stats }: StatsProps) => {
  const statsItems = [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: TrendingUp,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Total Bookings',
      value: stats.totalBookings.toLocaleString(),
      icon: ShoppingBag,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'Pending Bookings',
      value: stats.pendingBookings.toLocaleString(),
      icon: Clock,
      color: 'bg-amber-100 text-amber-600',
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {statsItems.map((item, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">{item.title}</p>
              <h3 className="text-2xl font-bold mt-1">{item.value}</h3>
            </div>
            <div className={`${item.color} p-3 rounded-full`}>
              <item.icon className="h-6 w-6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminStats;
