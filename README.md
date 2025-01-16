# Concert Ticket Booking System

A web application for booking concert tickets built with React.js and PHP.

## Features

- View list of available concerts
- View concert details
- Book tickets for concerts
- Real-time ticket availability tracking
- Booking confirmation system

## Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend
- PHP
- MySQL
- XAMPP

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (v14 or higher)
- XAMPP (with PHP 7.4 or higher and MySQL)
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Fernandoalf06/konser-ticket.git
cd konser-ticket
```

2. Set up the frontend:
```bash
cd frontend
npm install
npm run dev
```

3. Set up the database:
- Start XAMPP Apache and MySQL services
- Open phpMyAdmin (http://localhost/phpmyadmin)
- Create a new database named 'konser_ticket'
- Import the SQL file from `/backend/database/setup.sql`

4. Configure the backend:
- Copy the entire project folder to XAMPP's htdocs directory
- Ensure the backend API is accessible at `http://localhost/konser-ticket/backend/api`

## Usage

1. Start the development server:
```bash
cd frontend
npm run dev
```

2. Access the application:
- Frontend: http://localhost:5173
- Backend API: http://localhost/konser-ticket/backend/api

## Database Setup

The application uses MySQL database. To set up the database:

1. Create database and tables:
```sql
-- Import this file in phpMyAdmin
/backend/database/setup.sql
```

2. Default concert data will be automatically imported

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
