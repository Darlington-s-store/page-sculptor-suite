
<?php
// Required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
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

// Make sure booking ID is not empty
if(!empty($data->id)) {
    // Set booking ID
    $booking->id = $data->id;
    
    // Set booking status
    $booking->status = $data->status;
    
    // Update booking
    if($booking->update()) {
        // Set response code - 200 ok
        http_response_code(200);
        
        // Tell the user
        echo json_encode(array("message" => "Booking was updated."));
    } else {
        // Set response code - 503 service unavailable
        http_response_code(503);
        
        // Tell the user
        echo json_encode(array("message" => "Unable to update booking."));
    }
} else {
    // Set response code - 400 bad request
    http_response_code(400);
    
    // Tell the user
    echo json_encode(array("message" => "Unable to update booking. Booking ID is required."));
}
?>
