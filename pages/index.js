import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('/api/movies')
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  return (
    <>
      <div className="flex justify-between items-end mb-8 border-b border-gray-300 pb-4">
        <h2 className="text-4xl font-extrabold text-gray-900">Now Showing</h2>
        <p className="text-gray-500">Book your tickets for the latest blockbusters</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies.map((movie) => (
          <div key={movie.Movie_ID} className="group bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-2">
            <div className="relative overflow-hidden">
              <img 
                src={`/images/${movie.Image_Path}`} 
                onError={(e) => {e.target.onerror = null; e.target.src="https://placehold.co/300x450/e2e8f0/1e293b?text=No+Poster"}}
                alt={movie.Title} 
                className="w-full h-80 object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-60 transition duration-300"></div>
            </div>
            
            <div className="p-5">
              <h3 className="text-xl font-bold mb-1 text-gray-900 truncate">{movie.Title}</h3>
              <p className="text-gray-500 text-sm mb-4 flex items-center gap-2">
                <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-semibold border border-gray-200">{movie.Genre}</span>
                <span>•</span>
                <span>{movie.Duration} min</span>
              </p>
              <Link 
                href={`/movie/${movie.Movie_ID}`}
                className="block w-full text-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition shadow-md"
              >
                Book Tickets
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}