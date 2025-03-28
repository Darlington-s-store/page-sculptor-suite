
<?php
// API Root entry point
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Database connection status
$dbStatus = "unknown";
try {
    require_once './config/Database.php';
    $database = new Database();
    $conn = $database->getConnection();
    $dbStatus = $conn ? "connected" : "disconnected";
} catch (Exception $e) {
    $dbStatus = "error: " . $e->getMessage();
}

// Return basic API info
echo json_encode([
    'name' => 'TravelGo API',
    'version' => '1.0.0',
    'status' => 'online',
    'database' => $dbStatus,
    'timestamp' => date('Y-m-d H:i:s'),
    'endpoints' => [
        '/test-connection.php' => 'Test database connection',
        '/users' => [
            '/create.php' => 'Create a new user',
            '/login.php' => 'User login',
            '/read.php' => 'Get all users',
            '/read_one.php' => 'Get user by ID',
            '/update.php' => 'Update user information'
        ],
        '/bookings' => [
            '/create.php' => 'Create a new booking',
            '/read.php' => 'Get all bookings',
            '/read_one.php' => 'Get booking by ID',
            '/read_by_user.php' => 'Get bookings by user ID',
            '/update.php' => 'Update booking status'
        ],
        '/payments' => [
            '/create.php' => 'Create a new payment',
            '/read_by_booking.php' => 'Get payments by booking ID'
        ]
    ]
]);
?>
