
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface BookingChartProps {
  bookings: any[];
  timeframe: 'day' | 'week' | 'month' | 'year';
}

const BookingChart = ({ bookings, timeframe }: BookingChartProps) => {
  // Process data based on timeframe
  const processChartData = () => {
    if (!bookings || bookings.length === 0) {
      return [];
    }

    const currentDate = new Date();
    let data = [];
    
    if (timeframe === 'day') {
      // Group by hour
      const hours = Array.from({ length: 24 }, (_, i) => i);
      data = hours.map(hour => {
        const hourBookings = bookings.filter(booking => {
          const bookingDate = new Date(booking.createdAt);
          return bookingDate.getDate() === currentDate.getDate() &&
                 bookingDate.getMonth() === currentDate.getMonth() &&
                 bookingDate.getFullYear() === currentDate.getFullYear() &&
                 bookingDate.getHours() === hour;
        });
        
        return {
          name: `${hour}:00`,
          bookings: hourBookings.length
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
        
        const dayBookings = bookings.filter(booking => {
          const bookingDate = new Date(booking.createdAt);
          return bookingDate.getDate() === dayDate.getDate() &&
                 bookingDate.getMonth() === dayDate.getMonth() &&
                 bookingDate.getFullYear() === dayDate.getFullYear();
        });
        
        return {
          name: day,
          bookings: dayBookings.length
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
        const dayBookings = bookings.filter(booking => {
          const bookingDate = new Date(booking.createdAt);
          return bookingDate.getDate() === day &&
                 bookingDate.getMonth() === currentDate.getMonth() &&
                 bookingDate.getFullYear() === currentDate.getFullYear();
        });
        
        return {
          name: day.toString(),
          bookings: dayBookings.length
        };
      });
    }
    else if (timeframe === 'year') {
      // Group by month
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      data = months.map((month, index) => {
        const monthBookings = bookings.filter(booking => {
          const bookingDate = new Date(booking.createdAt);
          return bookingDate.getMonth() === index &&
                 bookingDate.getFullYear() === currentDate.getFullYear();
        });
        
        return {
          name: month,
          bookings: monthBookings.length
        };
      });
    }
    
    return data;
  };

  const chartData = processChartData();

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="bookings" fill="#8884d8" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BookingChart;
