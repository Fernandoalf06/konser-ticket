<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

include_once '../config/database.php';

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Log incoming request
error_log("Received booking request: " . file_get_contents("php://input"));

// Terima data dari request
$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->concert_id) &&
    !empty($data->full_name) &&
    !empty($data->email) &&
    !empty($data->phone_number) &&
    !empty($data->number_of_tickets)
) {
    try {
        // Start transaction
        $conn->begin_transaction();

        $concert_id = $data->concert_id;
        $full_name = $data->full_name;
        $email = $data->email;
        $phone_number = $data->phone_number;
        $number_of_tickets = $data->number_of_tickets;

        // Get concert price and check availability
        $query = "SELECT price, available_tickets FROM concerts WHERE id = ? FOR UPDATE";
        $stmt = $conn->prepare($query);
        if (!$stmt) {
            throw new Exception("Failed to prepare concert query: " . $conn->error);
        }
        
        $stmt->bind_param("i", $concert_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $concert = $result->fetch_assoc();

        if (!$concert) {
            throw new Exception("Concert not found");
        }

        if ($concert['available_tickets'] < $number_of_tickets) {
            throw new Exception("Not enough tickets available");
        }

        $total_price = $concert['price'] * $number_of_tickets;

        // Insert booking
        $query = "INSERT INTO bookings (concert_id, full_name, email, phone_number, number_of_tickets, total_price) 
                 VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($query);
        if (!$stmt) {
            throw new Exception("Failed to prepare booking insert: " . $conn->error);
        }

        $stmt->bind_param("isssid", $concert_id, $full_name, $email, $phone_number, $number_of_tickets, $total_price);
        
        if (!$stmt->execute()) {
            throw new Exception("Failed to create booking: " . $stmt->error);
        }

        $booking_id = $stmt->insert_id;

        // Update available tickets
        $new_available = $concert['available_tickets'] - $number_of_tickets;
        $update_query = "UPDATE concerts SET available_tickets = ? WHERE id = ?";
        $update_stmt = $conn->prepare($update_query);
        if (!$update_stmt) {
            throw new Exception("Failed to prepare update query: " . $conn->error);
        }

        $update_stmt->bind_param("ii", $new_available, $concert_id);
        if (!$update_stmt->execute()) {
            throw new Exception("Failed to update available tickets: " . $update_stmt->error);
        }

        // Commit transaction
        $conn->commit();

        http_response_code(201);
        echo json_encode(array(
            "message" => "Booking created successfully",
            "booking_id" => $booking_id,
            "total_price" => $total_price
        ));

    } catch (Exception $e) {
        // Rollback transaction on error
        $conn->rollback();
        
        error_log("Booking error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(array(
            "message" => "Error creating booking: " . $e->getMessage()
        ));
    }
} else {
    http_response_code(400);
    echo json_encode(array(
        "message" => "Unable to create booking. Data is incomplete.",
        "received_data" => $data
    ));
}

$conn->close();
?>
