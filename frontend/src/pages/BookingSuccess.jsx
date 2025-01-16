import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking, concert, customerInfo } = location.state || {};

  if (!booking || !concert || !customerInfo) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Invalid booking data</h2>
        <button
          onClick={() => navigate('/')}
          className="text-indigo-600 hover:text-indigo-800"
        >
          Return to Concert List
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600">Thank you for your purchase</p>
        </div>

        <div className="border-t border-b border-gray-200 py-4 mb-6">
          <h3 className="text-xl font-semibold mb-4">Booking Details</h3>
          <div className="space-y-3">
            <p><span className="font-medium">Booking ID:</span> {booking.booking_id}</p>
            <p><span className="font-medium">Concert:</span> {concert.title}</p>
            <p><span className="font-medium">Artist:</span> {concert.artist}</p>
            <p><span className="font-medium">Venue:</span> {concert.venue}</p>
            <p><span className="font-medium">Date:</span> {new Date(concert.date).toLocaleDateString()}</p>
            <p><span className="font-medium">Number of Tickets:</span> {customerInfo.number_of_tickets}</p>
            <p><span className="font-medium">Total Price:</span> ${booking.total_price}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Customer Information</h3>
          <div className="space-y-3">
            <p><span className="font-medium">Name:</span> {customerInfo.full_name}</p>
            <p><span className="font-medium">Email:</span> {customerInfo.email}</p>
            <p><span className="font-medium">Phone:</span> {customerInfo.phone_number}</p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Return to Concert List
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
