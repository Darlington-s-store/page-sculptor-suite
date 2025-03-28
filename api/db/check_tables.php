
<?php
// Include database connection
include_once '../config/Database.php';

function checkAndCreateTables() {
    $database = new Database();
    $conn = $database->getConnection();
    
    if (!$conn) {
        return [
            'status' => 'error',
            'message' => 'Database connection failed'
        ];
    }
    
    try {
        // Check if tables exist
        $stmt = $conn->query("SHOW TABLES");
        $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
        
        $requiredTables = ['users', 'bookings', 'payments'];
        $missingTables = array_diff($requiredTables, $tables);
        
        if (empty($missingTables)) {
            return [
                'status' => 'success',
                'message' => 'All required tables exist',
                'tables' => $tables
            ];
        }
        
        // Tables are missing, create them
        $sql = file_get_contents("schema.sql");
        $conn->exec($sql);
        
        return [
            'status' => 'success',
            'message' => 'Missing tables created',
            'created' => $missingTables
        ];
        
    } catch(PDOException $e) {
        return [
            'status' => 'error',
            'message' => 'Table check failed: ' . $e->getMessage()
        ];
    }
}

// If this file is accessed directly, run the check
if (basename($_SERVER['PHP_SELF']) == 'check_tables.php') {
    header("Content-Type: application/json; charset=UTF-8");
    echo json_encode(checkAndCreateTables());
}
?>
