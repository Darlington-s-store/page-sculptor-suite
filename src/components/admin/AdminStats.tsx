
import { 
  TrendingUp, Users, ShoppingBag, Clock, ArrowUpRight, ArrowDownRight, DollarSign, Calendar
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { bookingApi } from '@/services/api';

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
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchComparisonData = async () => {
      setIsLoading(true);
      try {
        // In a real app, you would fetch comparison data from the API
        // For now, we'll simulate it
        
        // We could connect to a real API endpoint like:
        // const response = await fetch(`${API_BASE_URL}/admin/stats/comparison`);
        // const data = await response.json();
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
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
      } catch (error) {
        console.error("Error fetching comparison data:", error);
        toast({
          title: "Error",
          description: "Failed to load comparison data",
          variant: "destructive",
          duration: 5000,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchComparisonData();
  }, [toast]);

  const refreshStats = () => {
    // This would refresh the stats from the parent component
    toast({
      title: "Refreshing Stats",
      description: "Fetching the latest data...",
      duration: 2000,
    });
  };

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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Business Overview</h2>
        <button 
          onClick={refreshStats}
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4 animate-pulse" />
              Updating...
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              Refresh Stats
            </span>
          )}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
    </div>
  );
};

export default AdminStats;
