
<?php
// Database installation script
// Run this file to create the database and tables

// Include database connection
require_once '../config/Database.php';

// Create a database connection without selecting a database
try {
    $conn = new PDO("mysql:host=localhost", "root", "");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Create database
    $sql = "CREATE DATABASE IF NOT EXISTS travel_booking";
    $conn->exec($sql);
    echo "Database created successfully<br>";
    
    // Connect to the newly created database
    $conn = new PDO("mysql:host=localhost;dbname=travel_booking", "root", "");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Read and execute SQL schema
    $sql = file_get_contents("schema.sql");
    $conn->exec($sql);
    echo "Tables created successfully<br>";
    
    echo "Database setup completed successfully.<br>";
    echo "You can now run the seed_database.php script to populate the database with sample data.";
    
} catch(PDOException $e) {
    echo "Installation failed: " . $e->getMessage();
}
?>
