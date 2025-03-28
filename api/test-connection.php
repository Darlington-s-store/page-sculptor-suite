
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
    try {
        // Test query
        $stmt = $conn->query("SELECT DATABASE() as db_name");
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        $dbName = $result['db_name'];
        
        // Check if tables exist
        $stmt = $conn->query("SHOW TABLES");
        $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
        
        http_response_code(200);
        echo json_encode([
            "status" => "success",
            "message" => "Database connection established successfully",
            "database" => $dbName,
            "tables" => $tables,
            "timestamp" => date('Y-m-d H:i:s')
        ]);
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode([
            "status" => "error",
            "message" => "Database connected but query failed: " . $e->getMessage(),
            "timestamp" => date('Y-m-d H:i:s')
        ]);
    }
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
