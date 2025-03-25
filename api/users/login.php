
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
            // Set response code - 200 OK
            http_response_code(200);
            
            // Tell the user login success and return user data
            echo json_encode(array(
                "message" => "Login successful.",
                "user" => array(
                    "id" => $user->id,
                    "firstName" => $user->firstName,
                    "lastName" => $user->lastName,
                    "email" => $user->email,
                    "phone" => $user->phone
                )
            ));
        } else {
            // Set response code - 401 Unauthorized
            http_response_code(401);
            
            // Tell the user login failed
            echo json_encode(array("message" => "Invalid password."));
        }
    } else {
        // Set response code - 404 Not found
        http_response_code(404);
        
        // Tell the user no user found
        echo json_encode(array("message" => "User not found."));
    }
} else {
    // Set response code - 400 bad request
    http_response_code(400);
    
    // Tell the user
    echo json_encode(array("message" => "Unable to login. Data is incomplete."));
}
?>
