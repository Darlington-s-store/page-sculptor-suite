
-- Create database
CREATE DATABASE IF NOT EXISTS travel_booking;
USE travel_booking;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id VARCHAR(50) PRIMARY KEY,
    userId VARCHAR(50) NOT NULL,
    itemId VARCHAR(50) NOT NULL,
    itemType ENUM('car', 'hotel', 'tour') NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    totalAmount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled', 'completed') NOT NULL,
    guestCount INT,
    specialRequests TEXT,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
    id VARCHAR(50) PRIMARY KEY,
    bookingId VARCHAR(50) NOT NULL,
    userId VARCHAR(50) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    paymentMethod ENUM('credit_card', 'mtn_mobile', 'telecel_cash', 'bank_transfer', 'paystack') NOT NULL,
    status ENUM('pending', 'paid', 'failed', 'refunded') NOT NULL,
    transactionId VARCHAR(100),
    paymentDetails JSON,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    FOREIGN KEY (bookingId) REFERENCES bookings(id),
    FOREIGN KEY (userId) REFERENCES users(id)
);

-- Create an index on commonly searched fields
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_booking_user ON bookings(userId);
CREATE INDEX idx_payment_booking ON payments(bookingId);
