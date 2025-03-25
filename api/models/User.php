
<?php
class User {
    // Database connection and table name
    private $conn;
    private $table_name = "users";

    // Object properties
    public $id;
    public $firstName;
    public $lastName;
    public $email;
    public $password;
    public $phone;
    public $createdAt;
    public $updatedAt;

    // Constructor with DB
    public function __construct($db) {
        $this->conn = $db;
    }

    // Create user
    public function create() {
        // Query to insert record
        $query = "INSERT INTO " . $this->table_name . "
                  SET id=:id, firstName=:firstName, lastName=:lastName, 
                      email=:email, password=:password, phone=:phone,
                      createdAt=:createdAt, updatedAt=:updatedAt";

        // Prepare query
        $stmt = $this->conn->prepare($query);

        // Sanitize inputs
        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->firstName = htmlspecialchars(strip_tags($this->firstName));
        $this->lastName = htmlspecialchars(strip_tags($this->lastName));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->password = htmlspecialchars(strip_tags($this->password));
        $this->phone = htmlspecialchars(strip_tags($this->phone));
        $this->createdAt = date('Y-m-d H:i:s');
        $this->updatedAt = date('Y-m-d H:i:s');

        // Bind values
        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":firstName", $this->firstName);
        $stmt->bindParam(":lastName", $this->lastName);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":password", $this->password);
        $stmt->bindParam(":phone", $this->phone);
        $stmt->bindParam(":createdAt", $this->createdAt);
        $stmt->bindParam(":updatedAt", $this->updatedAt);

        // Execute query
        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Read all users
    public function readAll() {
        // Select all query
        $query = "SELECT * FROM " . $this->table_name;

        // Prepare query statement
        $stmt = $this->conn->prepare($query);

        // Execute query
        $stmt->execute();

        return $stmt;
    }

    // Read one user
    public function readOne() {
        // Query to read single record
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = ?";

        // Prepare query statement
        $stmt = $this->conn->prepare($query);

        // Bind id of user to be selected
        $stmt->bindParam(1, $this->id);

        // Execute query
        $stmt->execute();

        // Get retrieved row
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // Set values to object properties
        if($row) {
            $this->id = $row['id'];
            $this->firstName = $row['firstName'];
            $this->lastName = $row['lastName'];
            $this->email = $row['email'];
            $this->password = $row['password'];
            $this->phone = $row['phone'];
            $this->createdAt = $row['createdAt'];
            $this->updatedAt = $row['updatedAt'];
            return true;
        }
        
        return false;
    }

    // Get user by email
    public function getUserByEmail() {
        // Query to check if email exists
        $query = "SELECT * FROM " . $this->table_name . " WHERE email = ?";

        // Prepare query statement
        $stmt = $this->conn->prepare($query);

        // Bind email
        $stmt->bindParam(1, $this->email);

        // Execute query
        $stmt->execute();

        // Get retrieved row
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // Set values to object properties
        if($row) {
            $this->id = $row['id'];
            $this->firstName = $row['firstName'];
            $this->lastName = $row['lastName'];
            $this->email = $row['email'];
            $this->password = $row['password'];
            $this->phone = $row['phone'];
            $this->createdAt = $row['createdAt'];
            $this->updatedAt = $row['updatedAt'];
            return true;
        }
        
        return false;
    }

    // Update user
    public function update() {
        // Update query
        $query = "UPDATE " . $this->table_name . "
                SET firstName=:firstName, lastName=:lastName, 
                    email=:email, password=:password, phone=:phone,
                    updatedAt=:updatedAt
                WHERE id=:id";

        // Prepare query statement
        $stmt = $this->conn->prepare($query);

        // Sanitize inputs
        $this->firstName = htmlspecialchars(strip_tags($this->firstName));
        $this->lastName = htmlspecialchars(strip_tags($this->lastName));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->password = htmlspecialchars(strip_tags($this->password));
        $this->phone = htmlspecialchars(strip_tags($this->phone));
        $this->updatedAt = date('Y-m-d H:i:s');
        $this->id = htmlspecialchars(strip_tags($this->id));

        // Bind parameters
        $stmt->bindParam(":firstName", $this->firstName);
        $stmt->bindParam(":lastName", $this->lastName);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":password", $this->password);
        $stmt->bindParam(":phone", $this->phone);
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
