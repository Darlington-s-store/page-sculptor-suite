
import { useState, ReactNode, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, Users, CreditCard, LogOut, ShoppingCart, 
  Settings, BarChart2, MessageCircle, Menu, X, AlertTriangle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  
  // Check if user is authenticated and is an admin
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('You must be logged in to access the admin area');
      navigate('/');
      return;
    }
    
    if (!isAdmin) {
      toast.error('Access denied. Admin privileges required.');
      navigate('/');
    }
  }, [isAuthenticated, isAdmin, navigate]);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Bookings', href: '/admin/bookings', icon: ShoppingCart },
    { name: 'Payments', href: '/admin/payments', icon: CreditCard },
    { name: 'Reports', href: '/admin/reports', icon: BarChart2 },
    { name: 'Customer Support', href: '/admin/support', icon: MessageCircle },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];
  
  if (!isAuthenticated || !isAdmin) {
    return null; // Don't render anything if not authorized
  }
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="bg-white p-4 shadow md:hidden flex justify-between items-center">
        <Link to="/admin" className="text-xl font-bold text-brand-yellow">
          TravelGo<span className="text-gray-800">Admin</span>
        </Link>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <X /> : <Menu />}
        </Button>
      </div>
      
      {/* Sidebar */}
      <div className={`
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transition-transform duration-300 ease-in-out
        fixed md:static top-0 left-0 h-screen w-64 bg-brand-dark text-white z-40 md:z-0
        overflow-y-auto
      `}>
        <div className="p-4 border-b border-white/10">
          <Link to="/admin" className="text-xl font-bold text-brand-yellow">
            TravelGo<span className="text-white">Admin</span>
          </Link>
        </div>
        
        <div className="p-4">
          <div className="mb-4 text-sm bg-brand-yellow/20 p-3 rounded">
            <div className="font-medium text-brand-yellow">Logged in as Admin</div>
            <div className="text-white/80 text-xs mt-1">
              {user?.firstName} {user?.lastName}
            </div>
          </div>
          
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    flex items-center px-4 py-3 text-sm font-medium rounded-md mb-1
                    ${isActive 
                      ? 'bg-brand-yellow text-black' 
                      : 'text-white hover:bg-white/10'}
                  `}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="p-4 mt-auto border-t border-white/10">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center border-white text-white hover:bg-white/10 hover:text-white"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1">
          {children}
        </main>
      </div>
      
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
