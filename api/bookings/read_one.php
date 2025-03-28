
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

// Get ID from URL
$booking->id = isset($_GET['id']) ? $_GET['id'] : die();

// Read booking details
if($booking->readOne()) {
    // Create array
    $booking_arr = array(
        "id" => $booking->id,
        "userId" => $booking->userId,
        "itemId" => $booking->itemId,
        "itemType" => $booking->itemType,
        "startDate" => $booking->startDate,
        "endDate" => $booking->endDate,
        "totalAmount" => $booking->totalAmount,
        "status" => $booking->status,
        "guestCount" => $booking->guestCount,
        "specialRequests" => $booking->specialRequests,
        "createdAt" => $booking->createdAt,
        "updatedAt" => $booking->updatedAt
    );

    // Set response code - 200 OK
    http_response_code(200);

    // Make it json format
    echo json_encode($booking_arr);
} else {
    // Set response code - 404 Not found
    http_response_code(404);

    // Tell the user booking does not exist
    echo json_encode(array("message" => "Booking does not exist."));
}
?>
