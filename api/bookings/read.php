
<?php
// Required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Include database connection
include_once '../config/Database.php';
include_once '../models/Booking.php';

// Initialize database and object
$database = new Database();
$db = $database->getConnection();

$booking = new Booking($db);

// Read all bookings
$stmt = $booking->readAll();
$num = $stmt->rowCount();

// Check if more than 0 record found
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
    // Set response code - 404 Not found
    http_response_code(404);

    // Tell the user no bookings found
    echo json_encode(array("message" => "No bookings found."));
}
?>
