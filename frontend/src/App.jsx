import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ConcertList from './components/ConcertList'
import BookingForm from './components/BookingForm'
import BookingSuccess from './pages/BookingSuccess'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<ConcertList />} />
            <Route path="/book/:id" element={<BookingForm />} />
            <Route path="/booking-success" element={<BookingSuccess />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
