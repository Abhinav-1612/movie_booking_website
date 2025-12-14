import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function UserStats() {
  const [stats, setStats] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user from local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Fetch stats for this user
      fetch(`/api/stats?email=${parsedUser.Email}`)
        .then(res => res.json())
        .then(data => setStats(data));
    }
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-center">
        <div>
          <h1 className="text-2xl font-bold mb-4">Please Login</h1>
          <p>You need to be logged in to view your movie statistics.</p>
          <a href="/login" className="mt-4 inline-block bg-red-600 text-white px-6 py-2 rounded">Login</a>
        </div>
      </div>
    );
  }

  if (!stats) return <div className="text-center p-10">Loading your cinema journey...</div>;

  return (
    <div className="max-w-5xl mx-auto">
      <Head><title>My Movie Stats | MovieTime</title></Head>

      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">My Cinema Stats 🎬</h1>
        <p className="text-gray-500">Your personalized movie watching report</p>
      </div>

      {/* --- Main Stats Cards --- */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {/* Card 1: Money Spent */}
        <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition">
          <h3 className="text-lg font-bold opacity-80 uppercase tracking-wider">Total Spent</h3>
          <p className="text-5xl font-extrabold mt-2">₹{stats.spent}</p>
          <p className="text-sm mt-2 opacity-90">Worth every penny!</p>
        </div>

        {/* Card 2: Hours Watched */}
        <div className="bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition">
          <h3 className="text-lg font-bold opacity-80 uppercase tracking-wider">Time Watched</h3>
          <p className="text-5xl font-extrabold mt-2">{Math.round(stats.minutes / 60)} <span className="text-2xl">hrs</span></p>
          <p className="text-sm mt-2 opacity-90">That's {stats.minutes} minutes of entertainment.</p>
        </div>

        {/* Card 3: Top Genre */}
        <div className="bg-gradient-to-br from-purple-400 to-pink-600 rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition">
          <h3 className="text-lg font-bold opacity-80 uppercase tracking-wider">Favorite Genre</h3>
          <p className="text-4xl font-extrabold mt-2 truncate">
            {stats.genres.length > 0 ? stats.genres.sort((a,b) => b.Count - a.Count)[0].Genre : "N/A"}
          </p>
          <p className="text-sm mt-2 opacity-90">You love this style!</p>
        </div>
      </div>

      {/* --- Genre Breakdown (Simple Visualization) --- */}
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Genre Breakdown</h3>
        <div className="space-y-4">
          {stats.genres.map((g) => (
            <div key={g.Genre}>
              <div className="flex justify-between mb-1">
                <span className="font-bold text-gray-700">{g.Genre}</span>
                <span className="text-gray-500">{g.Count} movies</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div 
                  className="bg-red-500 h-4 rounded-full" 
                  style={{ width: `${(g.Count / stats.genres.reduce((a, b) => a + b.Count, 0)) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
          {stats.genres.length === 0 && <p className="text-gray-500">Book a ticket to see your genre analysis!</p>}
        </div>
      </div>
    </div>
  );
}