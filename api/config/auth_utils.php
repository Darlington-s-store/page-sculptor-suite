
<?php
// Authentication utilities

/**
 * Generate JWT token
 * 
 * @param array $payload Data to encode in the token
 * @param string $secret Secret key to sign the token
 * @param int $expiry Token expiry time in seconds
 * @return string JWT token
 */
function generateJWT($payload, $secret, $expiry = 3600) {
    $header = json_encode([
        'typ' => 'JWT',
        'alg' => 'HS256'
    ]);
    
    // Set expiry time
    $payload['exp'] = time() + $expiry;
    $payload['iat'] = time();
    
    // Encode Header
    $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
    
    // Encode Payload
    $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode(json_encode($payload)));
    
    // Create Signature
    $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $secret, true);
    $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
    
    // Create JWT
    $jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    
    return $jwt;
}

/**
 * Validate JWT token
 * 
 * @param string $token JWT token to validate
 * @param string $secret Secret key to verify the token
 * @return mixed Decoded payload if valid, false otherwise
 */
function validateJWT($token, $secret) {
    // Split the token
    $tokenParts = explode('.', $token);
    
    if (count($tokenParts) != 3) {
        return false;
    }
    
    $header = base64_decode(str_replace(['-', '_'], ['+', '/'], $tokenParts[0]));
    $payload = base64_decode(str_replace(['-', '_'], ['+', '/'], $tokenParts[1]));
    $signatureProvided = $tokenParts[2];
    
    // Check the expiration time
    $payloadObj = json_decode($payload);
    if (isset($payloadObj->exp) && $payloadObj->exp < time()) {
        return false;
    }
    
    // Verify the signature
    $base64UrlHeader = $tokenParts[0];
    $base64UrlPayload = $tokenParts[1];
    $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $secret, true);
    $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
    
    if ($base64UrlSignature !== $signatureProvided) {
        return false;
    }
    
    return $payloadObj;
}

/**
 * Check user authentication from Authorization header
 * 
 * @param PDO $db Database connection
 * @return mixed User data if authenticated, false otherwise
 */
function authenticateRequest($db) {
    // JWT secret key - should be stored in a secure environment variable
    $jwtSecret = "travelgo_jwt_secret_key";
    
    // Get all headers
    $headers = getallheaders();
    $authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : '';
    
    // Check if Authorization header exists and has Bearer token
    if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
        return false;
    }
    
    $jwt = $matches[1];
    
    // Validate the token
    $payload = validateJWT($jwt, $jwtSecret);
    
    if (!$payload) {
        return false;
    }
    
    // Get user from database to verify it exists
    include_once 'api/models/User.php';
    $user = new User($db);
    $user->id = $payload->userId;
    
    if (!$user->readOne()) {
        return false;
    }
    
    return [
        'id' => $user->id,
        'email' => $user->email,
        'firstName' => $user->firstName,
        'lastName' => $user->lastName,
        'role' => $user->role
    ];
}

/**
 * Require authentication and specific role
 * 
 * @param PDO $db Database connection
 * @param string $requiredRole Required role (admin, user, etc)
 * @return mixed User data if authenticated and has required role, exits otherwise
 */
function requireRole($db, $requiredRole = null) {
    $user = authenticateRequest($db);
    
    if (!$user) {
        // Set response code - 401 Unauthorized
        http_response_code(401);
        echo json_encode(["message" => "Unauthorized"]);
        exit;
    }
    
    if ($requiredRole && $user['role'] !== $requiredRole) {
        // Set response code - 403 Forbidden
        http_response_code(403);
        echo json_encode(["message" => "Access denied"]);
        exit;
    }
    
    return $user;
}
?>
