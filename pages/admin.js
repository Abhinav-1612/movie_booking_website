import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [movies, setMovies] = useState([]);
  const [movieForm, setMovieForm] = useState({ title: '', genre: '', duration: '', image: '' });
  const [loading, setLoading] = useState(false);

  // 1. Initial Data Fetch
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.Role !== 'admin') {
      alert("Access Denied: Admins Only");
      router.push('/');
      return;
    }

    fetchStats();
    fetchMovies();
  }, []);

  const fetchStats = () => {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => setStats(data));
  };

  const fetchMovies = () => {
    fetch('/api/movies')
      .then(res => res.json())
      .then(data => setMovies(data));
  };

  // 2. Add Movie Handler
  const handleAddMovie = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/admin/add-movie', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movieForm),
    });
    if (res.ok) {
      alert("Movie Added & Shows Scheduled!");
      setMovieForm({ title: '', genre: '', duration: '', image: '' });
      fetchMovies(); // Refresh list
    } else {
      alert("Failed to add movie");
    }
    setLoading(false);
  };

  // 3. Delete Movie Handler
  const handleDeleteMovie = async (id, title) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This will delete all its shows and bookings!`)) {
      return;
    }

    setLoading(true);
    const res = await fetch('/api/admin/delete-movie', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ movie_id: id }),
    });

    if (res.ok) {
      alert("Movie Deleted Successfully");
      fetchMovies(); 
      fetchStats();  
    } else {
      alert("Failed to delete movie");
    }
    setLoading(false);
  };

  if (!stats) return <div className="p-10 text-center text-xl font-bold">Loading Admin Panel...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <Head><title>Admin Dashboard | MovieTime</title></Head>
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Admin Dashboard 🛡️</h1>
        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold border border-red-200">Manager Mode</span>
      </div>

      {/* --- SECTION 1: KEY METRICS --- */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
          <h3 className="text-gray-500 text-sm uppercase font-bold">Total Revenue</h3>
          <p className="text-4xl font-bold text-gray-800 mt-2">₹{stats.revenue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
          <h3 className="text-gray-500 text-sm uppercase font-bold">Total Tickets Sold</h3>
          <p className="text-4xl font-bold text-gray-800 mt-2">{stats.tickets}</p>
        </div>
      </div>

      {/* --- SECTION 2: MOVIE MANAGEMENT (Side by Side) --- */}
      <div className="grid md:grid-cols-2 gap-10 mb-12">
        
        {/* Left: Add Movie Form */}
        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-inner h-fit">
          <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">Add New Movie</h2>
          <form onSubmit={handleAddMovie} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700">Movie Title</label>
              <input required type="text" className="w-full p-2 border rounded focus:border-black outline-none" 
                value={movieForm.title} onChange={e => setMovieForm({...movieForm, title: e.target.value})} />
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-bold text-gray-700">Genre</label>
                <input required type="text" className="w-full p-2 border rounded focus:border-black outline-none" 
                  value={movieForm.genre} onChange={e => setMovieForm({...movieForm, genre: e.target.value})} />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-bold text-gray-700">Duration (mins)</label>
                <input required type="number" className="w-full p-2 border rounded focus:border-black outline-none" 
                  value={movieForm.duration} onChange={e => setMovieForm({...movieForm, duration: e.target.value})} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700">Image (in public/images/)</label>
              <input required type="text" className="w-full p-2 border rounded focus:border-black outline-none" placeholder="e.g. dune.jpg"
                value={movieForm.image} onChange={e => setMovieForm({...movieForm, image: e.target.value})} />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-black text-white py-3 rounded font-bold hover:bg-gray-800 transition disabled:bg-gray-400">
              {loading ? "Processing..." : "+ Add Movie & Schedule Shows"}
            </button>
          </form>
        </div>

        {/* Right: Manage Movies List */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col h-[500px]">
          <div className="p-6 border-b border-gray-100 bg-gray-50">
            <h2 className="text-xl font-bold text-gray-800">Manage Movies</h2>
            <p className="text-xs text-gray-500">Deleting a movie removes all its shows/bookings.</p>
          </div>
          <div className="overflow-y-auto flex-grow p-4 space-y-3">
            {movies.map((movie) => (
              <div key={movie.Movie_ID} className="flex justify-between items-center p-3 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                    <img src={`/images/${movie.Image_Path}`} className="w-full h-full object-cover" onError={(e)=>{e.target.style.display='none'}} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{movie.Title}</p>
                    <p className="text-xs text-gray-500">{movie.Genre}</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleDeleteMovie(movie.Movie_ID, movie.Title)}
                  disabled={loading}
                  className="text-red-500 hover:text-white hover:bg-red-500 border border-red-500 px-3 py-1 rounded-md text-xs font-bold transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- SECTION 3: RECENT TRANSACTIONS (Added Back!) --- */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-12">
        <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Recent Customer Bookings</h2>
          <span className="text-sm text-gray-500">Live Feed</span>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase tracking-wider font-bold">
            <tr>
              <th className="p-4">Booking ID</th>
              <th className="p-4">Customer Name</th>
              <th className="p-4">Movie</th>
              <th className="p-4 text-center">Seats</th>
              <th className="p-4 text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {stats.recentBookings.length === 0 ? (
              <tr><td colSpan="5" className="p-6 text-center text-gray-400">No bookings yet.</td></tr>
            ) : (
              stats.recentBookings.map((b) => (
                <tr key={b.Booking_ID} className="hover:bg-gray-50 transition">
                  <td className="p-4 text-gray-500 font-mono">#{b.Booking_ID}</td>
                  <td className="p-4 font-bold text-gray-800">{b.Name}</td>
                  <td className="p-4 text-blue-600 font-medium">{b.Title}</td>
                  <td className="p-4 text-center font-bold">{b.Seats_Booked}</td>
                  <td className="p-4 text-right text-gray-500">{new Date(b.Booking_Date).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}