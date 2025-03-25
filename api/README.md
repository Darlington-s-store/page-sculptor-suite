
# Travel Booking PHP Backend API

This folder contains a simple PHP REST API for the Travel Booking application. It connects to a MySQL database to store and retrieve data.

## Requirements

- PHP 7.4 or higher
- MySQL 5.7 or higher
- Apache or Nginx web server

## Setup Instructions

1. **Set up the database**
   - Import the database schema from `db/schema.sql` into your MySQL server.
   - You can use phpMyAdmin or MySQL command line:
     ```
     mysql -u username -p < db/schema.sql
     ```

2. **Configure the database connection**
   - Open `config/Database.php`
   - Update the database credentials:
     ```php
     private $host = "localhost";
     private $db_name = "travel_booking";
     private $username = "your_username";
     private $password = "your_password";
     ```

3. **Seed the database with sample data**
   - Run the seeding script to populate the database with sample records:
     ```
     php api/db/seed_database.php
     ```

4. **Deploy the API**
   - Copy all files in this folder to your web server's document root or a subdirectory.
   - For example, if you're using XAMPP, copy to `htdocs/travel-api/`.

5. **Update the frontend API configuration**
   - Open `src/services/api.ts` in your React frontend
   - Set the `API_BASE_URL` to match your PHP API location:
     ```javascript
     const API_BASE_URL = 'http://localhost/travel-api/api';
     ```

## API Endpoints

### Users
- `POST /users/create.php` - Register a new user
- `POST /users/login.php` - Authenticate a user

### Bookings
- `POST /bookings/create.php` - Create a new booking
- `GET /bookings/read_by_user.php?userId=X` - Get all bookings for a user
- `PUT /bookings/update.php` - Update a booking status

### Payments
- `POST /payments/create.php` - Process a new payment
- `GET /payments/read_by_booking.php?bookingId=X` - Get all payments for a booking

## Security Considerations

This is a basic implementation. For production use, consider:
- Implementing JWT authentication
- Adding CSRF protection
- Setting up proper CORS headers
- Using a .env file for environment variables
- Adding input validation
