
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
        $this->transactionId = htmlspecialchars(strip_tags($this->transactionId));
        // JSON encode the payment details
        $this->paymentDetails = json_encode($this->paymentDetails);
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

    // Read one payment
    public function readOne() {
        // Query to read single record
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = ?";

        // Prepare query statement
        $stmt = $this->conn->prepare($query);

        // Bind id of payment to be selected
        $stmt->bindParam(1, $this->id);

        // Execute query
        $stmt->execute();

        // Get retrieved row
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // Set values to object properties
        if($row) {
            $this->id = $row['id'];
            $this->bookingId = $row['bookingId'];
            $this->userId = $row['userId'];
            $this->amount = $row['amount'];
            $this->paymentMethod = $row['paymentMethod'];
            $this->status = $row['status'];
            $this->transactionId = $row['transactionId'];
            // JSON decode the payment details
            $this->paymentDetails = json_decode($row['paymentDetails'], true);
            $this->createdAt = $row['createdAt'];
            $this->updatedAt = $row['updatedAt'];
            return true;
        }
        
        return false;
    }

    // Get payments by booking ID
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
