// pages/my-bookings.js
import Head from 'next/head';
import { useState } from 'react';

export default function MyBookings() {
  const [email, setEmail] = useState('');
  const [bookings, setBookings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setBookings(null);

    try {
      const res = await fetch(`/api/my-bookings?email=${email}`);
      const data = await res.json();

      if (res.ok) {
        setBookings(data);
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto min-h-[60vh]">
      <Head><title>My Bookings | MovieTime</title></Head>

      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">Your Booking History</h1>

      {/* --- Search Form --- */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-8 max-w-lg mx-auto">
        <form onSubmit={handleSearch} className="flex flex-col gap-4">
          <label className="font-semibold text-gray-700">Enter your email to find bookings:</label>
          <div className="flex gap-2">
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. abhinav@example.com"
              className="flex-grow border border-gray-300 p-2 rounded focus:outline-none focus:border-red-500"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="bg-red-600 text-white px-6 py-2 rounded font-bold hover:bg-red-700 transition disabled:bg-gray-400"
            >
              {loading ? 'Searching...' : 'Find'}
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 mt-3 text-sm text-center">{error}</p>}
      </div>

      {/* --- Results Table --- */}
      {bookings && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          {bookings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-900 text-white">
                  <tr>
                    <th className="p-4 border-b border-gray-700">Ticket ID</th>
                    <th className="p-4 border-b border-gray-700">Movie</th>
                    <th className="p-4 border-b border-gray-700">Theatre</th>
                    <th className="p-4 border-b border-gray-700">Date & Time</th>
                    <th className="p-4 border-b border-gray-700 text-center">Seats</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {bookings.map((booking) => (
                    <tr key={booking.Booking_ID} className="hover:bg-gray-50 transition">
                      <td className="p-4 font-mono text-sm text-gray-500">#{booking.Booking_ID}</td>
                      <td className="p-4 font-bold text-gray-800">{booking.Title}</td>
                      <td className="p-4 text-gray-600">{booking.Theatre_Name}</td>
                      <td className="p-4 text-gray-600">
                        {new Date(booking.Show_Date).toLocaleDateString()} <br/>
                        <span className="text-xs text-gray-400">{booking.Show_Time}</span>
                      </td>
                      <td className="p-4 text-center font-bold text-blue-600 text-lg">{booking.Seats_Booked}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <p className="text-lg">No bookings found for <strong>{email}</strong>.</p>
              <p className="text-sm mt-2">Try a different email or book a ticket first!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}