
<?php
// Include database connection
require_once '../config/Database.php';

// Create a database connection
$database = new Database();
$db = $database->getConnection();

try {
    // Start transaction
    $db->beginTransaction();
    
    // Check if we already have data
    $stmt = $db->query("SELECT COUNT(*) as count FROM users");
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($row['count'] > 1) {
        echo "Database already has data. Skipping seed process.<br>";
        exit;
    }
    
    // Insert sample users
    $users = [
        [
            'id' => 'user_1',
            'firstName' => 'John',
            'lastName' => 'Doe',
            'email' => 'john@example.com',
            'password' => password_hash('password123', PASSWORD_BCRYPT),
            'phone' => '+1234567890',
            'role' => 'user'
        ],
        [
            'id' => 'user_2',
            'firstName' => 'Jane',
            'lastName' => 'Smith',
            'email' => 'jane@example.com',
            'password' => password_hash('password123', PASSWORD_BCRYPT),
            'phone' => '+0987654321',
            'role' => 'user'
        ]
    ];
    
    foreach ($users as $user) {
        $query = "INSERT INTO users (id, firstName, lastName, email, password, phone, role, createdAt, updatedAt) 
                 VALUES (:id, :firstName, :lastName, :email, :password, :phone, :role, NOW(), NOW())";
        
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $user['id']);
        $stmt->bindParam(':firstName', $user['firstName']);
        $stmt->bindParam(':lastName', $user['lastName']);
        $stmt->bindParam(':email', $user['email']);
        $stmt->bindParam(':password', $user['password']);
        $stmt->bindParam(':phone', $user['phone']);
        $stmt->bindParam(':role', $user['role']);
        $stmt->execute();
    }
    
    // Insert sample bookings
    $bookings = [
        [
            'id' => 'booking_1',
            'userId' => 'user_1',
            'itemId' => 'hotel_1',
            'itemType' => 'hotel',
            'startDate' => '2025-04-15',
            'endDate' => '2025-04-20',
            'totalAmount' => 850.00,
            'status' => 'confirmed',
            'guestCount' => 2,
            'specialRequests' => 'Early check-in if possible'
        ],
        [
            'id' => 'booking_2',
            'userId' => 'user_1',
            'itemId' => 'car_3',
            'itemType' => 'car',
            'startDate' => '2025-04-21',
            'endDate' => '2025-04-25',
            'totalAmount' => 320.00,
            'status' => 'pending',
            'guestCount' => 1,
            'specialRequests' => ''
        ],
        [
            'id' => 'booking_3',
            'userId' => 'user_2',
            'itemId' => 'tour_2',
            'itemType' => 'tour',
            'startDate' => '2025-05-10',
            'endDate' => '2025-05-15',
            'totalAmount' => 1200.00,
            'status' => 'confirmed',
            'guestCount' => 3,
            'specialRequests' => 'Vegetarian meal options'
        ]
    ];
    
    foreach ($bookings as $booking) {
        $query = "INSERT INTO bookings (id, userId, itemId, itemType, startDate, endDate, totalAmount, status, guestCount, specialRequests, createdAt, updatedAt) 
                 VALUES (:id, :userId, :itemId, :itemType, :startDate, :endDate, :totalAmount, :status, :guestCount, :specialRequests, NOW(), NOW())";
        
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $booking['id']);
        $stmt->bindParam(':userId', $booking['userId']);
        $stmt->bindParam(':itemId', $booking['itemId']);
        $stmt->bindParam(':itemType', $booking['itemType']);
        $stmt->bindParam(':startDate', $booking['startDate']);
        $stmt->bindParam(':endDate', $booking['endDate']);
        $stmt->bindParam(':totalAmount', $booking['totalAmount']);
        $stmt->bindParam(':status', $booking['status']);
        $stmt->bindParam(':guestCount', $booking['guestCount']);
        $stmt->bindParam(':specialRequests', $booking['specialRequests']);
        $stmt->execute();
    }
    
    // Insert sample payments
    $payments = [
        [
            'id' => 'payment_1',
            'bookingId' => 'booking_1',
            'userId' => 'user_1',
            'amount' => 850.00,
            'paymentMethod' => 'credit_card',
            'status' => 'paid',
            'transactionId' => 'tx_12345678',
            'paymentDetails' => json_encode([
                'cardLastFour' => '4242',
                'expiryDate' => '04/25'
            ])
        ],
        [
            'id' => 'payment_3',
            'bookingId' => 'booking_3',
            'userId' => 'user_2',
            'amount' => 1200.00,
            'paymentMethod' => 'bank_transfer',
            'status' => 'paid',
            'transactionId' => 'tx_98765432',
            'paymentDetails' => json_encode([
                'bankReference' => 'REF123456'
            ])
        ]
    ];
    
    foreach ($payments as $payment) {
        $query = "INSERT INTO payments (id, bookingId, userId, amount, paymentMethod, status, transactionId, paymentDetails, createdAt, updatedAt) 
                 VALUES (:id, :bookingId, :userId, :amount, :paymentMethod, :status, :transactionId, :paymentDetails, NOW(), NOW())";
        
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $payment['id']);
        $stmt->bindParam(':bookingId', $payment['bookingId']);
        $stmt->bindParam(':userId', $payment['userId']);
        $stmt->bindParam(':amount', $payment['amount']);
        $stmt->bindParam(':paymentMethod', $payment['paymentMethod']);
        $stmt->bindParam(':status', $payment['status']);
        $stmt->bindParam(':transactionId', $payment['transactionId']);
        $stmt->bindParam(':paymentDetails', $payment['paymentDetails']);
        $stmt->execute();
    }
    
    // Commit transaction
    $db->commit();
    
    echo "Database seeded successfully!<br>";
    echo "Admin login: admin@travelgo.com<br>";
    echo "Admin password: admin123<br>";
    echo "User logins: john@example.com and jane@example.com<br>";
    echo "User password: password123";
    
} catch (PDOException $e) {
    // Rollback transaction if something went wrong
    $db->rollBack();
    echo "Database seeding failed: " . $e->getMessage();
}
?>
