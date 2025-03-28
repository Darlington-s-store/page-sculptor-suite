
# TravelGo API - Setup Guide

This document provides instructions for setting up and using the TravelGo API.

## Prerequisites

- PHP 7.4 or higher
- MySQL 5.7 or higher
- Apache/Nginx web server

## Database Setup

1. Create a MySQL database named `travel_booking`
2. Import the schema from `api/db/schema.sql`
3. For sample data, run `api/db/seed_database.php`

## Configuration

Edit the database connection settings in `api/config/Database.php`:

```php
private $host = "localhost"; // Your database host
private $db_name = "travel_booking"; // Your database name
private $username = "root"; // Your database username
private $password = ""; // Your database password
```

## Test Connection

Open `http://your-server/api/test-connection.php` to verify that the API can connect to the database.

## API Endpoints

The main API endpoints are:

### Users
- POST `/users/create.php` - Create a new user
- POST `/users/login.php` - User login
- GET `/users/read.php` - Get all users
- GET `/users/read_one.php?id={user_id}` - Get user by ID
- PUT `/users/update.php` - Update user information

### Bookings
- POST `/bookings/create.php` - Create a new booking
- GET `/bookings/read.php` - Get all bookings
- GET `/bookings/read_one.php?id={booking_id}` - Get booking by ID
- GET `/bookings/read_by_user.php?userId={user_id}` - Get bookings by user ID
- PUT `/bookings/update.php` - Update booking status

### Payments
- POST `/payments/create.php` - Create a new payment
- GET `/payments/read_by_booking.php?bookingId={booking_id}` - Get payments by booking ID

## Usage Example

Example POST request to create a user:

```javascript
fetch('http://your-server/api/users/create.php', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'secure_password',
    phone: '+233 20 123 4567'
  }),
})
.then(response => response.json())
.then(data => console.log(data));
```
