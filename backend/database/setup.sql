-- Drop tables if they exist
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS concerts;

-- Create concerts table
CREATE TABLE concerts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    artist VARCHAR(255) NOT NULL,
    venue VARCHAR(255) NOT NULL,
    date DATETIME NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    available_tickets INT NOT NULL,
    image_url VARCHAR(255) NOT NULL
);

-- Create bookings table
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    concert_id INT NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    number_of_tickets INT NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pending',
    FOREIGN KEY (concert_id) REFERENCES concerts(id)
);

-- Insert sample concert data
INSERT INTO concerts (title, artist, venue, date, price, available_tickets, image_url) VALUES
('The Eras Tour', 'Taylor Swift', 'SoFi Stadium, Los Angeles', '2025-03-15 19:00:00', 399.99, 100, '/images/taylorswift.jpg'),
('Renaissance World Tour', 'Beyonce', 'MetLife Stadium, New Jersey', '2025-04-01 20:00:00', 299.99, 150, '/images/beyonce.jpeg'),
('Music Of The Spheres Tour', 'Coldplay', 'Wembley Stadium, London', '2025-05-20 19:30:00', 199.99, 200, '/images/coldplay.png'),
('Born Pink World Tour', 'BLACKPINK', 'Tokyo Dome, Japan', '2025-06-10 18:00:00', 249.99, 180, '/images/blackpink.jpg'),
('Mercury World Tour', 'Imagine Dragons', 'Madison Square Garden, NYC', '2025-07-05 19:00:00', 149.99, 250, '/images/imaginedragon.jpg'),
('24K Magic World Tour', 'Bruno Mars', 'The O2, London', '2025-08-15 20:00:00', 179.99, 220, '/images/brunomars.jpg');
