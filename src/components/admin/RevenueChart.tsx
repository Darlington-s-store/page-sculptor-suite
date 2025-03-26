
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface RevenueChartProps {
  payments: any[];
  timeframe: 'day' | 'week' | 'month' | 'year';
}

const RevenueChart = ({ payments, timeframe }: RevenueChartProps) => {
  // Process data based on timeframe
  const processChartData = () => {
    if (!payments || payments.length === 0) {
      return [];
    }

    const currentDate = new Date();
    let data = [];
    
    if (timeframe === 'day') {
      // Group by hour
      const hours = Array.from({ length: 24 }, (_, i) => i);
      data = hours.map(hour => {
        const hourPayments = payments.filter(payment => {
          const paymentDate = new Date(payment.createdAt);
          return paymentDate.getDate() === currentDate.getDate() &&
                 paymentDate.getMonth() === currentDate.getMonth() &&
                 paymentDate.getFullYear() === currentDate.getFullYear() &&
                 paymentDate.getHours() === hour;
        });
        
        const revenue = hourPayments.reduce((sum, payment) => sum + parseFloat(payment.amount), 0);
        
        return {
          name: `${hour}:00`,
          revenue
        };
      });
    } 
    else if (timeframe === 'week') {
      // Group by day of the week
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const dayStart = new Date(currentDate);
      dayStart.setDate(currentDate.getDate() - currentDate.getDay());
      
      data = days.map((day, index) => {
        const dayDate = new Date(dayStart);
        dayDate.setDate(dayStart.getDate() + index);
        
        const dayPayments = payments.filter(payment => {
          const paymentDate = new Date(payment.createdAt);
          return paymentDate.getDate() === dayDate.getDate() &&
                 paymentDate.getMonth() === dayDate.getMonth() &&
                 paymentDate.getFullYear() === dayDate.getFullYear();
        });
        
        const revenue = dayPayments.reduce((sum, payment) => sum + parseFloat(payment.amount), 0);
        
        return {
          name: day,
          revenue
        };
      });
    }
    else if (timeframe === 'month') {
      // Group by day of the month
      const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      ).getDate();
      
      data = Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;
        const dayPayments = payments.filter(payment => {
          const paymentDate = new Date(payment.createdAt);
          return paymentDate.getDate() === day &&
                 paymentDate.getMonth() === currentDate.getMonth() &&
                 paymentDate.getFullYear() === currentDate.getFullYear();
        });
        
        const revenue = dayPayments.reduce((sum, payment) => sum + parseFloat(payment.amount), 0);
        
        return {
          name: day.toString(),
          revenue
        };
      });
    }
    else if (timeframe === 'year') {
      // Group by month
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      data = months.map((month, index) => {
        const monthPayments = payments.filter(payment => {
          const paymentDate = new Date(payment.createdAt);
          return paymentDate.getMonth() === index &&
                 paymentDate.getFullYear() === currentDate.getFullYear();
        });
        
        const revenue = monthPayments.reduce((sum, payment) => sum + parseFloat(payment.amount), 0);
        
        return {
          name: month,
          revenue
        };
      });
    }
    
    return data;
  };

  const chartData = processChartData();

  return (
    <div className="w-full h-60">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            formatter={(value) => [`$${value}`, 'Revenue']}
          />
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="#22c55e" 
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
