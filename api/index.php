
<?php
// API Root entry point
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Return basic API info
echo json_encode([
    'name' => 'TravelGo API',
    'version' => '1.0.0',
    'status' => 'online',
    'timestamp' => date('Y-m-d H:i:s'),
    'endpoints' => [
        '/users' => 'User management',
        '/bookings' => 'Booking management',
        '/payments' => 'Payment processing'
    ]
]);
?>
