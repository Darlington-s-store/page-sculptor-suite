
<?php
// Required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Include database and authentication utilities
include_once '../config/Database.php';
include_once '../config/auth_utils.php';

// Create database connection
$database = new Database();
$db = $database->getConnection();

// Verify token and get user data
$user = authenticateRequest($db);

if ($user) {
    // Token is valid
    http_response_code(200);
    echo json_encode([
        "message" => "Valid authentication",
        "user" => $user
    ]);
} else {
    // Token is invalid
    http_response_code(401);
    echo json_encode([
        "message" => "Invalid or expired token"
    ]);
}
?>
