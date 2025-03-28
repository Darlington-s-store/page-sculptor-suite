
<?php
// Required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Include database and authentication utilities
include_once '../config/Database.php';
include_once '../config/auth_utils.php';

// Create database connection
$database = new Database();
$db = $database->getConnection();

// Require admin role
$user = requireRole($db, 'admin');

// Query to count users
$userQuery = "SELECT COUNT(*) as total_users FROM users WHERE role = 'user'";
$userStmt = $db->prepare($userQuery);
$userStmt->execute();
$userCount = $userStmt->fetch(PDO::FETCH_ASSOC)['total_users'];

// Query to count bookings
$bookingQuery = "SELECT COUNT(*) as total_bookings FROM bookings";
$bookingStmt = $db->prepare($bookingQuery);
$bookingStmt->execute();
$bookingCount = $bookingStmt->fetch(PDO::FETCH_ASSOC)['total_bookings'];

// Query to sum payments
$paymentQuery = "SELECT SUM(amount) as total_revenue FROM payments WHERE status = 'paid'";
$paymentStmt = $db->prepare($paymentQuery);
$paymentStmt->execute();
$totalRevenue = $paymentStmt->fetch(PDO::FETCH_ASSOC)['total_revenue'] ?? 0;

// Query to count pending bookings
$pendingQuery = "SELECT COUNT(*) as pending_bookings FROM bookings WHERE status = 'pending'";
$pendingStmt = $db->prepare($pendingQuery);
$pendingStmt->execute();
$pendingCount = $pendingStmt->fetch(PDO::FETCH_ASSOC)['pending_bookings'];

// Recent bookings (last 10)
$recentBookingsQuery = "SELECT b.*, u.firstName, u.lastName FROM bookings b 
                        JOIN users u ON b.userId = u.id 
                        ORDER BY b.createdAt DESC LIMIT 10";
$recentBookingsStmt = $db->prepare($recentBookingsQuery);
$recentBookingsStmt->execute();
$recentBookings = $recentBookingsStmt->fetchAll(PDO::FETCH_ASSOC);

// Monthly revenue data
$monthlyRevenueQuery = "SELECT 
                          DATE_FORMAT(createdAt, '%Y-%m') as month,
                          SUM(amount) as revenue
                        FROM payments
                        WHERE status = 'paid'
                        GROUP BY DATE_FORMAT(createdAt, '%Y-%m')
                        ORDER BY month ASC";
$monthlyRevenueStmt = $db->prepare($monthlyRevenueQuery);
$monthlyRevenueStmt->execute();
$monthlyRevenue = $monthlyRevenueStmt->fetchAll(PDO::FETCH_ASSOC);

// Return dashboard data
http_response_code(200);
echo json_encode([
    "stats" => [
        "totalUsers" => (int)$userCount,
        "totalBookings" => (int)$bookingCount,
        "totalRevenue" => (float)$totalRevenue,
        "pendingBookings" => (int)$pendingCount
    ],
    "recentBookings" => $recentBookings,
    "monthlyRevenue" => $monthlyRevenue
]);
?>
