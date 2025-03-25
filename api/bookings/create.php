
<?php
// Required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Get database connection
include_once '../config/Database.php';
include_once '../models/Booking.php';

$database = new Database();
$db = $database->getConnection();

$booking = new Booking($db);

// Get posted data
$data = json_decode(file_get_contents("php://input"));

// Make sure data is not empty
if(
    !empty($data->userId) &&
    !empty($data->itemId) &&
    !empty($data->itemType) &&
    !empty($data->startDate) &&
    !empty($data->endDate) &&
    !empty($data->totalAmount)
) {
    // Set booking property values
    $booking->id = "booking_" . time(); // Generate a unique ID
    $booking->userId = $data->userId;
    $booking->itemId = $data->itemId;
    $booking->itemType = $data->itemType;
    $booking->startDate = $data->startDate;
    $booking->endDate = $data->endDate;
    $booking->totalAmount = $data->totalAmount;
    $booking->status = "pending"; // Initial status
    $booking->guestCount = $data->guestCount ?? null;
    $booking->specialRequests = $data->specialRequests ?? null;

    // Create the booking
    if($booking->create()) {
        // Set response code - 201 created
        http_response_code(201);
        
        // Tell the user
        echo json_encode(array(
            "message" => "Booking was created successfully.",
            "booking" => array(
                "id" => $booking->id,
                "userId" => $booking->userId,
                "itemId" => $booking->itemId,
                "itemType" => $booking->itemType,
                "startDate" => $booking->startDate,
                "endDate" => $booking->endDate,
                "totalAmount" => $booking->totalAmount,
                "status" => $booking->status,
                "guestCount" => $booking->guestCount,
                "specialRequests" => $booking->specialRequests
            )
        ));
    } else {
        // Set response code - 503 service unavailable
        http_response_code(503);
        
        // Tell the user
        echo json_encode(array("message" => "Unable to create booking."));
    }
} else {
    // Set response code - 400 bad request
    http_response_code(400);
    
    // Tell the user
    echo json_encode(array("message" => "Unable to create booking. Data is incomplete."));
}
?>
