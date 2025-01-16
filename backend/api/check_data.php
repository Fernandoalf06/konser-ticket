<?php
header('Content-Type: text/plain');
include_once '../config/database.php';

echo "Checking database connection and data...\n\n";

try {
    // Check concerts table
    $result = $conn->query("SELECT COUNT(*) as count FROM concerts");
    $row = $result->fetch_assoc();
    echo "Number of concerts in database: " . $row['count'] . "\n\n";

    // Show all concerts
    $result = $conn->query("SELECT * FROM concerts");
    echo "Concert details:\n";
    while ($row = $result->fetch_assoc()) {
        echo "ID: " . $row['id'] . "\n";
        echo "Title: " . $row['title'] . "\n";
        echo "Artist: " . $row['artist'] . "\n";
        echo "Available tickets: " . $row['available_tickets'] . "\n";
        echo "Price: $" . $row['price'] . "\n";
        echo "------------------------\n";
    }

    // Check bookings table structure
    $result = $conn->query("SHOW COLUMNS FROM bookings");
    echo "\nBookings table structure:\n";
    while ($row = $result->fetch_assoc()) {
        echo $row['Field'] . " - " . $row['Type'] . "\n";
    }

} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}

$conn->close();
?>
