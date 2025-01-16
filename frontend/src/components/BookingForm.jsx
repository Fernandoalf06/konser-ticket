import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [concert, setConcert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    number_of_tickets: 1
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchConcert = async () => {
      try {
        const response = await axios.get(`http://localhost/konser-ticket/backend/api/concerts.php?id=${id}`);
        setConcert(response.data);
      } catch (error) {
        console.error('Error fetching concert:', error);
        setError('Concert not found');
      } finally {
        setLoading(false);
      }
    };

    fetchConcert();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost/konser-ticket/backend/api/book_ticket.php', {
        concert_id: concert.id,
        ...formData
      });

      setSuccess(true);
      // Redirect to success page after 2 seconds
      setTimeout(() => {
        navigate('/booking-success', { 
          state: { 
            booking: response.data,
            concert: concert,
            customerInfo: formData
          }
        });
      }, 2000);

    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred while booking the ticket');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600 mb-4">{error}</h2>
        <button
          onClick={() => navigate('/')}
          className="text-indigo-600 hover:text-indigo-800"
        >
          Return to Concert List
        </button>
      </div>
    );
  }

  if (success) {
    return (
      <div className="text-center p-4">
        <div className="text-green-600 text-xl mb-4">Booking successful!</div>
        <div className="text-gray-600">Redirecting to confirmation page...</div>
      </div>
    );
  }

  if (!concert) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Concert not found</h2>
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
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Tickets</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900">{concert.title}</h3>
            <p className="text-gray-600">{concert.artist}</p>
            <p className="text-gray-600">{concert.venue}</p>
            <p className="text-gray-600">{new Date(concert.date).toLocaleDateString()}</p>
            <p className="text-lg font-bold text-indigo-600 mt-2">${concert.price} per ticket</p>
            <p className="text-sm text-gray-500">Available tickets: {concert.available_tickets}</p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Number of Tickets</label>
              <input
                type="number"
                name="number_of_tickets"
                value={formData.number_of_tickets}
                onChange={handleChange}
                min="1"
                max={concert.available_tickets}
                required
                className="w-full px-3 py-2 border rounded-md"
              />
              <p className="text-sm text-gray-500 mt-1">
                Total Price: ${concert.price * formData.number_of_tickets}
              </p>
            </div>
            <div className="flex justify-between items-center mt-6">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Booking...' : 'Book Now'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
