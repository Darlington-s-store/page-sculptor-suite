
<?php
class Payment {
    // Database connection and table name
    private $conn;
    private $table_name = "payments";

    // Object properties
    public $id;
    public $bookingId;
    public $userId;
    public $amount;
    public $paymentMethod;
    public $status;
    public $transactionId;
    public $paymentDetails;
    public $createdAt;
    public $updatedAt;

    // Constructor with DB
    public function __construct($db) {
        $this->conn = $db;
    }

    // Create payment
    public function create() {
        // Query to insert record
        $query = "INSERT INTO " . $this->table_name . "
                  SET id=:id, bookingId=:bookingId, userId=:userId, 
                      amount=:amount, paymentMethod=:paymentMethod, status=:status,
                      transactionId=:transactionId, paymentDetails=:paymentDetails, 
                      createdAt=:createdAt, updatedAt=:updatedAt";

        // Prepare query
        $stmt = $this->conn->prepare($query);

        // Sanitize inputs
        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->bookingId = htmlspecialchars(strip_tags($this->bookingId));
        $this->userId = htmlspecialchars(strip_tags($this->userId));
        $this->amount = htmlspecialchars(strip_tags($this->amount));
        $this->paymentMethod = htmlspecialchars(strip_tags($this->paymentMethod));
        $this->status = htmlspecialchars(strip_tags($this->status));
        $this->transactionId = $this->transactionId ? htmlspecialchars(strip_tags($this->transactionId)) : null;
        
        // For JSON data we need to handle it differently
        if (is_array($this->paymentDetails)) {
            $this->paymentDetails = json_encode($this->paymentDetails);
        } else if (is_string($this->paymentDetails) && !empty($this->paymentDetails)) {
            // Check if already JSON
            json_decode($this->paymentDetails);
            if (json_last_error() != JSON_ERROR_NONE) {
                $this->paymentDetails = json_encode($this->paymentDetails);
            }
        } else {
            $this->paymentDetails = null;
        }
        
        $this->createdAt = date('Y-m-d H:i:s');
        $this->updatedAt = date('Y-m-d H:i:s');

        // Bind values
        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":bookingId", $this->bookingId);
        $stmt->bindParam(":userId", $this->userId);
        $stmt->bindParam(":amount", $this->amount);
        $stmt->bindParam(":paymentMethod", $this->paymentMethod);
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":transactionId", $this->transactionId);
        $stmt->bindParam(":paymentDetails", $this->paymentDetails);
        $stmt->bindParam(":createdAt", $this->createdAt);
        $stmt->bindParam(":updatedAt", $this->updatedAt);

        // Execute query
        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Read all payments
    public function readAll() {
        // Select all query
        $query = "SELECT * FROM " . $this->table_name;

        // Prepare query statement
        $stmt = $this->conn->prepare($query);

        // Execute query
        $stmt->execute();

        return $stmt;
    }

    // Read payments by booking ID
    public function getPaymentsByBookingId() {
        // Query to get payments by booking ID
        $query = "SELECT * FROM " . $this->table_name . " WHERE bookingId = ?";

        // Prepare query statement
        $stmt = $this->conn->prepare($query);

        // Bind booking ID
        $stmt->bindParam(1, $this->bookingId);

        // Execute query
        $stmt->execute();

        return $stmt;
    }

    // Update payment status
    public function updateStatus() {
        // Update query
        $query = "UPDATE " . $this->table_name . "
                SET status=:status, updatedAt=:updatedAt
                WHERE id=:id";

        // Prepare query statement
        $stmt = $this->conn->prepare($query);

        // Sanitize inputs
        $this->status = htmlspecialchars(strip_tags($this->status));
        $this->updatedAt = date('Y-m-d H:i:s');
        $this->id = htmlspecialchars(strip_tags($this->id));

        // Bind parameters
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":updatedAt", $this->updatedAt);
        $stmt->bindParam(":id", $this->id);

        // Execute query
        if($stmt->execute()) {
            return true;
        }

        return false;
    }
}
?>
