
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
            // JWT secret key - use the provided secure key
            $jwtSecret = "66065fee2ed4e486123593a265f4ef633ca542e3d51359b0e55ca83f0a4382a44ab615fa3a7a503762d5da246a30fcb44311750ae53bbefe68af821f43eb4f4fe169bb06bceef7eb834d5cb766d74f767d488be10ce643fc83edf62efb8447a24f153d8958c383120172f9a9646f4dee05acb4e4cf3952075ea814a6b3a476ba32c8b8e0fd6449517204cab2f967fb751c996a1c3ac40fa70a6a628315d955cfb627d00febcc1382301cafc245bf7d7e19c9696c1f99818ae251630e8cd2e3684cc5227253644b753078d376a18a2b148d2b046b51aa2cea73e0311979cac2ac0b766fad050f9de5b330f5e3af0cd287b093835715e28adc33e50d41546b2c61";
            
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
