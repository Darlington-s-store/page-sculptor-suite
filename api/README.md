
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

3. **Deploy the API**
   - Copy all files in this folder to your web server's document root or a subdirectory.
   - For example, if you're using XAMPP, copy to `htdocs/travel-api/`.

4. **Update the frontend API configuration**
   - Open `src/services/api.ts` in your React frontend
   - Set the `API_BASE_URL` to match your PHP API location:
     ```javascript
     const API_BASE_URL = 'http://localhost/travel-api/api';
     ```

5. **Test the API**
   - Use a tool like Postman to test your endpoints
   - Example: `POST http://localhost/travel-api/api/users/create.php` with user data

## API Endpoints

### Users
- `POST /users/create.php` - Register a new user
- `POST /users/login.php` - Authenticate a user

### Bookings
- `POST /bookings/create.php` - Create a new booking
- `GET /bookings/read_by_user.php?userId=X` - Get all bookings for a user

### Payments
- Additional endpoints for payment processing

## Security Considerations

This is a basic implementation. For production use, consider:
- Implementing JWT authentication
- Adding CSRF protection
- Setting up proper CORS headers
- Using a .env file for environment variables
- Adding input validation
