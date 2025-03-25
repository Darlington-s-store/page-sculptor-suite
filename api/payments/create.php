
<?php
// Required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Get database connection
include_once '../config/Database.php';
include_once '../models/Payment.php';

$database = new Database();
$db = $database->getConnection();

$payment = new Payment($db);

// Get posted data
$data = json_decode(file_get_contents("php://input"));

// Make sure data is not empty
if(
    !empty($data->bookingId) &&
    !empty($data->userId) &&
    !empty($data->amount) &&
    !empty($data->paymentMethod)
) {
    // Set payment property values
    $payment->id = "payment_" . time(); // Generate a unique ID
    $payment->bookingId = $data->bookingId;
    $payment->userId = $data->userId;
    $payment->amount = $data->amount;
    $payment->paymentMethod = $data->paymentMethod;
    $payment->status = "pending"; // Initial status
    $payment->transactionId = $data->transactionId ?? null;
    $payment->paymentDetails = $data->paymentDetails ?? null;

    // Create the payment
    if($payment->create()) {
        // Set response code - 201 created
        http_response_code(201);
        
        // Tell the user
        echo json_encode(array(
            "message" => "Payment was created successfully.",
            "payment" => array(
                "id" => $payment->id,
                "bookingId" => $payment->bookingId,
                "userId" => $payment->userId,
                "amount" => $payment->amount,
                "paymentMethod" => $payment->paymentMethod,
                "status" => $payment->status,
                "transactionId" => $payment->transactionId,
                "paymentDetails" => $payment->paymentDetails
            )
        ));
    } else {
        // Set response code - 503 service unavailable
        http_response_code(503);
        
        // Tell the user
        echo json_encode(array("message" => "Unable to create payment."));
    }
} else {
    // Set response code - 400 bad request
    http_response_code(400);
    
    // Tell the user
    echo json_encode(array("message" => "Unable to create payment. Data is incomplete."));
}
?>
