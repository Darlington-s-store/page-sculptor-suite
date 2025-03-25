
<?php
// Database seeding script
// Run this file to populate your database with sample data

// Include database connection
include_once '../config/Database.php';

// Create database connection
$database = new Database();
$db = $database->getConnection();

// Clear existing data (optional)
$db->exec("SET FOREIGN_KEY_CHECKS = 0");
$db->exec("TRUNCATE TABLE payments");
$db->exec("TRUNCATE TABLE bookings");
$db->exec("TRUNCATE TABLE users");
$db->exec("SET FOREIGN_KEY_CHECKS = 1");

echo "Tables cleared successfully.\n";

// Seed Users Table
$users = [
    [
        'id' => 'user_1',
        'firstName' => 'John', 
        'lastName' => 'Doe',
        'email' => 'john@example.com',
        'password' => password_hash('password123', PASSWORD_DEFAULT),
        'phone' => '+233 20 123 4567',
        'createdAt' => date('Y-m-d H:i:s'),
        'updatedAt' => date('Y-m-d H:i:s')
    ],
    [
        'id' => 'user_2',
        'firstName' => 'Jane', 
        'lastName' => 'Smith',
        'email' => 'jane@example.com',
        'password' => password_hash('password123', PASSWORD_DEFAULT),
        'phone' => '+233 24 987 6543',
        'createdAt' => date('Y-m-d H:i:s'),
        'updatedAt' => date('Y-m-d H:i:s')
    ],
    [
        'id' => 'user_3',
        'firstName' => 'Michael', 
        'lastName' => 'Johnson',
        'email' => 'michael@example.com',
        'password' => password_hash('password123', PASSWORD_DEFAULT),
        'phone' => '+233 27 456 7890',
        'createdAt' => date('Y-m-d H:i:s'),
        'updatedAt' => date('Y-m-d H:i:s')
    ]
];

$stmt = $db->prepare("
    INSERT INTO users (id, firstName, lastName, email, password, phone, createdAt, updatedAt) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
");

foreach ($users as $user) {
    $stmt->execute([
        $user['id'],
        $user['firstName'],
        $user['lastName'],
        $user['email'],
        $user['password'],
        $user['phone'],
        $user['createdAt'],
        $user['updatedAt']
    ]);
}

echo "Users seeded successfully.\n";

// Seed Bookings Table
$bookings = [
    [
        'id' => 'booking_1',
        'userId' => 'user_1',
        'itemId' => 'car-1',
        'itemType' => 'car',
        'startDate' => '2023-11-15',
        'endDate' => '2023-11-20',
        'totalAmount' => 325.50,
        'status' => 'confirmed',
        'guestCount' => null,
        'specialRequests' => 'I would like a GPS system installed.',
        'createdAt' => date('Y-m-d H:i:s'),
        'updatedAt' => date('Y-m-d H:i:s')
    ],
    [
        'id' => 'booking_2',
        'userId' => 'user_1',
        'itemId' => 'hotel-3',
        'itemType' => 'hotel',
        'startDate' => '2023-12-10',
        'endDate' => '2023-12-15',
        'totalAmount' => 750.00,
        'status' => 'confirmed',
        'guestCount' => 2,
        'specialRequests' => 'We prefer a high floor with a sea view.',
        'createdAt' => date('Y-m-d H:i:s'),
        'updatedAt' => date('Y-m-d H:i:s')
    ],
    [
        'id' => 'booking_3',
        'userId' => 'user_2',
        'itemId' => 'tour-2',
        'itemType' => 'tour',
        'startDate' => '2024-01-05',
        'endDate' => '2024-01-08',
        'totalAmount' => 450.00,
        'status' => 'pending',
        'guestCount' => 4,
        'specialRequests' => 'We have a child in our group, please prepare accordingly.',
        'createdAt' => date('Y-m-d H:i:s'),
        'updatedAt' => date('Y-m-d H:i:s')
    ],
    [
        'id' => 'booking_4',
        'userId' => 'user_3',
        'itemId' => 'car-4',
        'itemType' => 'car',
        'startDate' => '2023-11-25',
        'endDate' => '2023-11-30',
        'totalAmount' => 275.00,
        'status' => 'completed',
        'guestCount' => null,
        'specialRequests' => 'Child seat required.',
        'createdAt' => date('Y-m-d H:i:s', strtotime('-10 days')),
        'updatedAt' => date('Y-m-d H:i:s', strtotime('-3 days'))
    ],
    [
        'id' => 'booking_5',
        'userId' => 'user_3',
        'itemId' => 'hotel-1',
        'itemType' => 'hotel',
        'startDate' => '2023-10-15',
        'endDate' => '2023-10-20',
        'totalAmount' => 550.00,
        'status' => 'cancelled',
        'guestCount' => 2,
        'specialRequests' => 'Vegetarian meal options requested.',
        'createdAt' => date('Y-m-d H:i:s', strtotime('-20 days')),
        'updatedAt' => date('Y-m-d H:i:s', strtotime('-15 days'))
    ]
];

$stmt = $db->prepare("
    INSERT INTO bookings (id, userId, itemId, itemType, startDate, endDate, totalAmount, status, guestCount, specialRequests, createdAt, updatedAt) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
");

foreach ($bookings as $booking) {
    $stmt->execute([
        $booking['id'],
        $booking['userId'],
        $booking['itemId'],
        $booking['itemType'],
        $booking['startDate'],
        $booking['endDate'],
        $booking['totalAmount'],
        $booking['status'],
        $booking['guestCount'],
        $booking['specialRequests'],
        $booking['createdAt'],
        $booking['updatedAt']
    ]);
}

echo "Bookings seeded successfully.\n";

// Seed Payments Table
$payments = [
    [
        'id' => 'payment_1',
        'bookingId' => 'booking_1',
        'userId' => 'user_1',
        'amount' => 325.50,
        'paymentMethod' => 'credit_card',
        'status' => 'paid',
        'transactionId' => 'txn_'.mt_rand(1000000, 9999999),
        'paymentDetails' => json_encode(['cardLastFour' => '4242']),
        'createdAt' => date('Y-m-d H:i:s'),
        'updatedAt' => date('Y-m-d H:i:s')
    ],
    [
        'id' => 'payment_2',
        'bookingId' => 'booking_2',
        'userId' => 'user_1',
        'amount' => 750.00,
        'paymentMethod' => 'mtn_mobile',
        'status' => 'paid',
        'transactionId' => 'txn_'.mt_rand(1000000, 9999999),
        'paymentDetails' => json_encode(['mobileNumber' => '233201234567']),
        'createdAt' => date('Y-m-d H:i:s'),
        'updatedAt' => date('Y-m-d H:i:s')
    ],
    [
        'id' => 'payment_3',
        'bookingId' => 'booking_3',
        'userId' => 'user_2',
        'amount' => 450.00,
        'paymentMethod' => 'paystack',
        'status' => 'pending',
        'transactionId' => 'txn_'.mt_rand(1000000, 9999999),
        'paymentDetails' => json_encode(['email' => 'jane@example.com']),
        'createdAt' => date('Y-m-d H:i:s'),
        'updatedAt' => date('Y-m-d H:i:s')
    ],
    [
        'id' => 'payment_4',
        'bookingId' => 'booking_4',
        'userId' => 'user_3',
        'amount' => 275.00,
        'paymentMethod' => 'bank_transfer',
        'status' => 'paid',
        'transactionId' => 'txn_'.mt_rand(1000000, 9999999),
        'paymentDetails' => json_encode(['bankReference' => 'REF'.mt_rand(10000, 99999)]),
        'createdAt' => date('Y-m-d H:i:s', strtotime('-10 days')),
        'updatedAt' => date('Y-m-d H:i:s', strtotime('-9 days'))
    ],
    [
        'id' => 'payment_5',
        'bookingId' => 'booking_5',
        'userId' => 'user_3',
        'amount' => 550.00,
        'paymentMethod' => 'credit_card',
        'status' => 'refunded',
        'transactionId' => 'txn_'.mt_rand(1000000, 9999999),
        'paymentDetails' => json_encode(['cardLastFour' => '1234']),
        'createdAt' => date('Y-m-d H:i:s', strtotime('-20 days')),
        'updatedAt' => date('Y-m-d H:i:s', strtotime('-14 days'))
    ]
];

$stmt = $db->prepare("
    INSERT INTO payments (id, bookingId, userId, amount, paymentMethod, status, transactionId, paymentDetails, createdAt, updatedAt) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
");

foreach ($payments as $payment) {
    $stmt->execute([
        $payment['id'],
        $payment['bookingId'],
        $payment['userId'],
        $payment['amount'],
        $payment['paymentMethod'],
        $payment['status'],
        $payment['transactionId'],
        $payment['paymentDetails'],
        $payment['createdAt'],
        $payment['updatedAt']
    ]);
}

echo "Payments seeded successfully.\n";
echo "Database seeding completed successfully!\n";
?>
