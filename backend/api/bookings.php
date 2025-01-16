<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once "../config/database.php";

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        if(isset($_GET['id'])) {
            $id = $conn->real_escape_string($_GET['id']);
            $sql = "SELECT b.*, c.title as concert_title FROM bookings b 
                    JOIN concerts c ON b.concert_id = c.id 
                    WHERE b.id = '$id'";
        } else {
            $sql = "SELECT b.*, c.title as concert_title FROM bookings b 
                    JOIN concerts c ON b.concert_id = c.id";
        }
        
        $result = $conn->query($sql);
        $bookings = array();
        
        while($row = $result->fetch_assoc()) {
            $bookings[] = $row;
        }
        
        echo json_encode($bookings);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        
        $concert_id = $conn->real_escape_string($data->concert_id);
        $customer_name = $conn->real_escape_string($data->customer_name);
        $customer_email = $conn->real_escape_string($data->customer_email);
        $quantity = $conn->real_escape_string($data->quantity);
        
        // Get concert price and check available tickets
        $sql = "SELECT price, available_tickets FROM concerts WHERE id = '$concert_id'";
        $result = $conn->query($sql);
        $concert = $result->fetch_assoc();
        
        if($concert['available_tickets'] < $quantity) {
            echo json_encode(array("message" => "Error: Not enough tickets available"));
            break;
        }
        
        $total_price = $concert['price'] * $quantity;
        
        // Start transaction
        $conn->begin_transaction();
        
        try {
            // Create booking
            $sql = "INSERT INTO bookings (concert_id, customer_name, customer_email, quantity, total_price) 
                    VALUES ('$concert_id', '$customer_name', '$customer_email', '$quantity', '$total_price')";
            $conn->query($sql);
            
            // Update available tickets
            $new_available = $concert['available_tickets'] - $quantity;
            $sql = "UPDATE concerts SET available_tickets = '$new_available' WHERE id = '$concert_id'";
            $conn->query($sql);
            
            $conn->commit();
            echo json_encode(array("message" => "Booking created successfully"));
        } catch (Exception $e) {
            $conn->rollback();
            echo json_encode(array("message" => "Error: " . $e->getMessage()));
        }
        break;

    case 'DELETE':
        $id = $_GET['id'];
        
        // Get booking details
        $sql = "SELECT concert_id, quantity FROM bookings WHERE id = '$id'";
        $result = $conn->query($sql);
        $booking = $result->fetch_assoc();
        
        if($booking) {
            $conn->begin_transaction();
            
            try {
                // Return tickets to available pool
                $sql = "UPDATE concerts SET available_tickets = available_tickets + {$booking['quantity']} 
                        WHERE id = {$booking['concert_id']}";
                $conn->query($sql);
                
                // Delete booking
                $sql = "DELETE FROM bookings WHERE id = '$id'";
                $conn->query($sql);
                
                $conn->commit();
                echo json_encode(array("message" => "Booking cancelled successfully"));
            } catch (Exception $e) {
                $conn->rollback();
                echo json_encode(array("message" => "Error: " . $e->getMessage()));
            }
        } else {
            echo json_encode(array("message" => "Error: Booking not found"));
        }
        break;
}

$conn->close();
?>
