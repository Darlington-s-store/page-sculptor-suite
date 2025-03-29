
<?php
// Required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    // Get database connection
    include_once '../config/Database.php';
    include_once '../models/Booking.php';
    include_once '../config/auth_utils.php';

    $database = new Database();
    $db = $database->getConnection();

    // Verify authentication first
    $user = authenticateRequest($db);
    
    if (!$user) {
        http_response_code(401);
        echo json_encode(["message" => "Unauthorized access"]);
        exit();
    }
    
    $booking = new Booking($db);

    // Get user ID from URL
    $requestedUserId = isset($_GET['userId']) ? $_GET['userId'] : '';
    
    // Only allow users to view their own bookings, or admins to view any bookings
    if ($user['role'] !== 'admin' && $user['id'] !== $requestedUserId) {
        http_response_code(403);
        echo json_encode(["message" => "Access denied. You can only view your own bookings."]);
        exit();
    }
    
    // Set the user ID for the query
    $booking->userId = $requestedUserId;

    // Read bookings by user ID
    $stmt = $booking->getBookingsByUserId();
    $num = $stmt->rowCount();

    // Check if any bookings found
    if($num > 0) {
        // Bookings array
        $bookings_arr = array();
        $bookings_arr["bookings"] = array();

        // Retrieve table contents
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $booking_item = array(
                "id" => $id,
                "userId" => $userId,
                "itemId" => $itemId,
                "itemType" => $itemType,
                "startDate" => $startDate,
                "endDate" => $endDate,
                "totalAmount" => $totalAmount,
                "status" => $status,
                "guestCount" => $guestCount,
                "specialRequests" => $specialRequests,
                "createdAt" => $createdAt,
                "updatedAt" => $updatedAt
            );

            array_push($bookings_arr["bookings"], $booking_item);
        }

        // Set response code - 200 OK
        http_response_code(200);

        // Show bookings data in JSON format
        echo json_encode($bookings_arr);
    } else {
        // Set response code - 200 OK with empty array (not 404)
        http_response_code(200);

        // Return empty bookings array
        echo json_encode(["bookings" => []]);
    }
} catch (Exception $e) {
    // Server error
    http_response_code(500);
    echo json_encode([
        "message" => "Server error: " . $e->getMessage()
    ]);
}
?>
