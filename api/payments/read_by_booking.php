
<?php
// Required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Get database connection
include_once '../config/Database.php';
include_once '../models/Payment.php';

$database = new Database();
$db = $database->getConnection();

$payment = new Payment($db);

// Get booking ID from URL
$payment->bookingId = isset($_GET['bookingId']) ? $_GET['bookingId'] : die();

// Read payments by booking ID
$stmt = $payment->getPaymentsByBookingId();
$num = $stmt->rowCount();

// Check if any payments found
if($num > 0) {
    // Payments array
    $payments_arr = array();
    $payments_arr["payments"] = array();

    // Retrieve table contents
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $payment_item = array(
            "id" => $id,
            "bookingId" => $bookingId,
            "userId" => $userId,
            "amount" => $amount,
            "paymentMethod" => $paymentMethod,
            "status" => $status,
            "transactionId" => $transactionId,
            "paymentDetails" => json_decode($paymentDetails),
            "createdAt" => $createdAt,
            "updatedAt" => $updatedAt
        );

        array_push($payments_arr["payments"], $payment_item);
    }

    // Set response code - 200 OK
    http_response_code(200);

    // Show payments data in JSON format
    echo json_encode($payments_arr);
} else {
    // Set response code - 404 Not found
    http_response_code(404);

    // Tell the user no payments found
    echo json_encode(array("message" => "No payments found for this booking."));
}
?>
