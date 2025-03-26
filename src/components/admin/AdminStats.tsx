
import { 
  TrendingUp, Users, ShoppingBag, Clock, ArrowUpRight, ArrowDownRight, DollarSign, Calendar
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface StatsProps {
  stats: {
    totalBookings: number;
    totalRevenue: number;
    totalUsers: number;
    pendingBookings: number;
  };
}

const AdminStats = ({ stats }: StatsProps) => {
  const [comparisonStats, setComparisonStats] = useState({
    bookingsGrowth: 0,
    revenueGrowth: 0,
    usersGrowth: 0,
    pendingChange: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    // Simulate fetching comparison data
    // In a real app, this would come from the API
    setComparisonStats({
      bookingsGrowth: 12.5,
      revenueGrowth: 8.3,
      usersGrowth: 15.7,
      pendingChange: -5.2
    });

    toast({
      title: "Dashboard Updated",
      description: "Latest statistics have been loaded",
      duration: 3000,
    });
  }, [toast]);

  const statsItems = [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-green-100 text-green-600',
      growth: comparisonStats.revenueGrowth,
      period: 'vs last month'
    },
    {
      title: 'Total Bookings',
      value: stats.totalBookings.toLocaleString(),
      icon: Calendar,
      color: 'bg-blue-100 text-blue-600',
      growth: comparisonStats.bookingsGrowth,
      period: 'vs last month'
    },
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'bg-purple-100 text-purple-600',
      growth: comparisonStats.usersGrowth,
      period: 'vs last month'
    },
    {
      title: 'Pending Bookings',
      value: stats.pendingBookings.toLocaleString(),
      icon: Clock,
      color: 'bg-amber-100 text-amber-600',
      growth: comparisonStats.pendingChange,
      period: 'vs last month'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {statsItems.map((item, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">{item.title}</p>
              <h3 className="text-2xl font-bold mt-1">{item.value}</h3>
              
              <div className="flex items-center mt-2">
                <span className={`text-xs font-medium flex items-center ${
                  item.growth > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {item.growth > 0 ? 
                    <ArrowUpRight className="h-3 w-3 mr-1" /> : 
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  }
                  {Math.abs(item.growth)}%
                </span>
                <span className="text-xs text-gray-400 ml-1">{item.period}</span>
              </div>
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
