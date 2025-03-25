
<?php
class Booking {
    // Database connection and table name
    private $conn;
    private $table_name = "bookings";

    // Object properties
    public $id;
    public $userId;
    public $itemId;
    public $itemType;
    public $startDate;
    public $endDate;
    public $totalAmount;
    public $status;
    public $guestCount;
    public $specialRequests;
    public $createdAt;
    public $updatedAt;

    // Constructor with DB
    public function __construct($db) {
        $this->conn = $db;
    }

    // Create booking
    public function create() {
        // Query to insert record
        $query = "INSERT INTO " . $this->table_name . "
                  SET id=:id, userId=:userId, itemId=:itemId, 
                      itemType=:itemType, startDate=:startDate, endDate=:endDate,
                      totalAmount=:totalAmount, status=:status, guestCount=:guestCount,
                      specialRequests=:specialRequests, createdAt=:createdAt, updatedAt=:updatedAt";

        // Prepare query
        $stmt = $this->conn->prepare($query);

        // Sanitize inputs
        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->userId = htmlspecialchars(strip_tags($this->userId));
        $this->itemId = htmlspecialchars(strip_tags($this->itemId));
        $this->itemType = htmlspecialchars(strip_tags($this->itemType));
        $this->startDate = htmlspecialchars(strip_tags($this->startDate));
        $this->endDate = htmlspecialchars(strip_tags($this->endDate));
        $this->totalAmount = htmlspecialchars(strip_tags($this->totalAmount));
        $this->status = htmlspecialchars(strip_tags($this->status));
        $this->guestCount = htmlspecialchars(strip_tags($this->guestCount));
        $this->specialRequests = htmlspecialchars(strip_tags($this->specialRequests));
        $this->createdAt = date('Y-m-d H:i:s');
        $this->updatedAt = date('Y-m-d H:i:s');

        // Bind values
        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":userId", $this->userId);
        $stmt->bindParam(":itemId", $this->itemId);
        $stmt->bindParam(":itemType", $this->itemType);
        $stmt->bindParam(":startDate", $this->startDate);
        $stmt->bindParam(":endDate", $this->endDate);
        $stmt->bindParam(":totalAmount", $this->totalAmount);
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":guestCount", $this->guestCount);
        $stmt->bindParam(":specialRequests", $this->specialRequests);
        $stmt->bindParam(":createdAt", $this->createdAt);
        $stmt->bindParam(":updatedAt", $this->updatedAt);

        // Execute query
        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Read all bookings
    public function readAll() {
        // Select all query
        $query = "SELECT * FROM " . $this->table_name;

        // Prepare query statement
        $stmt = $this->conn->prepare($query);

        // Execute query
        $stmt->execute();

        return $stmt;
    }

    // Read one booking
    public function readOne() {
        // Query to read single record
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = ?";

        // Prepare query statement
        $stmt = $this->conn->prepare($query);

        // Bind id of booking to be selected
        $stmt->bindParam(1, $this->id);

        // Execute query
        $stmt->execute();

        // Get retrieved row
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // Set values to object properties
        if($row) {
            $this->id = $row['id'];
            $this->userId = $row['userId'];
            $this->itemId = $row['itemId'];
            $this->itemType = $row['itemType'];
            $this->startDate = $row['startDate'];
            $this->endDate = $row['endDate'];
            $this->totalAmount = $row['totalAmount'];
            $this->status = $row['status'];
            $this->guestCount = $row['guestCount'];
            $this->specialRequests = $row['specialRequests'];
            $this->createdAt = $row['createdAt'];
            $this->updatedAt = $row['updatedAt'];
            return true;
        }
        
        return false;
    }

    // Get bookings by user ID
    public function getBookingsByUserId() {
        // Query to get bookings by user ID
        $query = "SELECT * FROM " . $this->table_name . " WHERE userId = ?";

        // Prepare query statement
        $stmt = $this->conn->prepare($query);

        // Bind user ID
        $stmt->bindParam(1, $this->userId);

        // Execute query
        $stmt->execute();

        return $stmt;
    }

    // Update booking
    public function update() {
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
