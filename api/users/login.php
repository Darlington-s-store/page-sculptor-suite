
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
    !empty($data->email) &&
    !empty($data->password)
) {
    // Set user email to check
    $user->email = $data->email;

    // Check if email exists
    if($user->getUserByEmail()) {
        // Verify the password
        if(password_verify($data->password, $user->password)) {
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
            
            // Set response code - 200 OK
            http_response_code(200);
            
            // Tell the user login success and return user data with token
            echo json_encode([
                "message" => "Login successful.",
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
            // Set response code - 401 Unauthorized
            http_response_code(401);
            
            // Tell the user login failed
            echo json_encode(["message" => "Invalid password."]);
        }
    } else {
        // Set response code - 404 Not found
        http_response_code(404);
        
        // Tell the user no user found
        echo json_encode(["message" => "User not found."]);
    }
} else {
    // Set response code - 400 bad request
    http_response_code(400);
    
    // Tell the user
    echo json_encode(["message" => "Unable to login. Data is incomplete."]);
}
?>
