
<?php
// Required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Get database connection
include_once '../config/Database.php';
include_once '../models/User.php';
include_once '../config/auth_utils.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

// Get posted data
$data = json_decode(file_get_contents("php://input"));

// Make sure data is not empty
if(
    !empty($data->firstName) &&
    !empty($data->lastName) &&
    !empty($data->email) &&
    !empty($data->password)
) {
    // Set user property values
    $user->id = "user_" . time(); // Generate a unique ID
    $user->firstName = $data->firstName;
    $user->lastName = $data->lastName;
    $user->email = $data->email;
    
    // Hash the password
    $user->password = password_hash($data->password, PASSWORD_BCRYPT);
    
    $user->phone = $data->phone ?? "";
    $user->role = isset($data->role) ? $data->role : "user";
    
    // Only allow setting admin role if the request is authenticated as admin
    if ($user->role === "admin") {
        $currentUser = authenticateRequest($db);
        if (!$currentUser || $currentUser['role'] !== "admin") {
            $user->role = "user"; // Default to user role if not admin
        }
    }

    // Check if email already exists
    $user->email = $data->email;
    if($user->getUserByEmail()) {
        // Response code - 400 bad request
        http_response_code(400);
        
        // Tell the user
        echo json_encode(["message" => "Email already exists."]);
        exit;
    }

    // Create the user
    if($user->create()) {
        // JWT secret key - should be stored in a secure environment variable
        $jwtSecret = "travelgo_jwt_secret_key";
        
        // Create token payload
        $tokenPayload = [
            'userId' => $user->id,
            'email' => $user->email,
            'role' => $user->role
        ];
        
        // Generate JWT token
        $token = generateJWT($tokenPayload, $jwtSecret, 86400); // 24 hours expiry
        
        // Set response code - 201 created
        http_response_code(201);
        
        // Tell the user
        echo json_encode([
            "message" => "User was created successfully.",
            "token" => $token,
            "user" => [
                "id" => $user->id,
                "firstName" => $user->firstName,
                "lastName" => $user->lastName,
                "email" => $user->email,
                "phone" => $user->phone,
                "role" => $user->role
            ]
        ]);
    } else {
        // Set response code - 503 service unavailable
        http_response_code(503);
        
        // Tell the user
        echo json_encode(["message" => "Unable to create user."]);
    }
} else {
    // Set response code - 400 bad request
    http_response_code(400);
    
    // Tell the user
    echo json_encode(["message" => "Unable to create user. Data is incomplete."]);
}
?>
