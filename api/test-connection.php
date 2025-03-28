
<?php
// Required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Include database connection
include_once './config/Database.php';

// Create database connection
$database = new Database();
$conn = $database->getConnection();

// Check connection
if($conn) {
    // Connection successful
    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "message" => "Database connection established successfully",
        "timestamp" => date('Y-m-d H:i:s')
    ]);
} else {
    // Connection failed
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Failed to connect to database",
        "timestamp" => date('Y-m-d H:i:s')
    ]);
}
?>
