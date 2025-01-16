import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-indigo-600 text-2xl">▶</span>
              <span className="ml-2 text-xl font-semibold">Concert Tickets</span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link to="/" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
