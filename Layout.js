import ChatBot from './Bot';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


export default function Layout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // Check login state when the page loads
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  // Helper to highlight the active link (turns Red when active)
  const isActive = (path) => router.pathname === path ? "text-red-500 font-bold" : "text-gray-300 hover:text-white";

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col">
      {/* --- Navbar --- */}
      <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center">
          
          {/* Logo */}
          <Link href="/" className="text-3xl font-extrabold text-red-600 tracking-wider hover:opacity-80 transition mb-4 md:mb-0">
            MovieTime
          </Link>
          
          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center items-center gap-6">
            <Link href="/" className={`${isActive('/')} transition`}>Home</Link>
            <Link href="/offers" className={`${isActive('/offers')} transition`}>Offers</Link>
            <Link href="/gift-cards" className={`${isActive('/gift-cards')} transition`}>Gift Cards</Link>
            <Link href="/contact" className={`${isActive('/contact')} transition`}>Contact</Link>
            
            {user ? (
              // --- Logged In View ---
              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-700">
                
                {/* Admin Button (Only visible to Admins) */}
                {user.Role === 'admin' && (
                  <Link href="/admin" className="bg-black text-yellow-400 border border-yellow-400 px-3 py-1 rounded-full text-xs font-bold hover:bg-gray-800 transition uppercase tracking-wide">
                    Admin Panel
                  </Link>
                )}

                {/* User Greeting */}
                <span className="text-gray-300 hidden md:inline text-sm">Hi, <span className="font-bold text-white">{user.Name}</span></span>
                
                {/* Stats Link */}
                <Link href="/stats" className="text-gray-300 hover:text-yellow-400 font-bold transition text-sm">
                  Stats
                </Link>
                
                {/* My Bookings */}
                <Link href="/my-bookings" className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-blue-700 transition">
                  My Bookings
                </Link>
                
                {/* Logout */}
                <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 text-sm font-bold">
                  Logout
                </button>
              </div>
            ) : (
              // --- Logged Out View ---
              <div className="flex items-center gap-4 ml-4 border-l border-gray-700 pl-4">
                <Link href="/login" className="text-white hover:text-red-500 font-bold transition">
                  Login
                </Link>
                <Link href="/signup" className="bg-red-600 text-white px-5 py-2 rounded-full font-bold hover:bg-red-700 transition">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* --- Main Content --- */}
      <main className="flex-grow container mx-auto px-6 py-12">
        {children}
      </main>

      {/* --- Footer --- */}
      <footer className="bg-gray-900 text-gray-300 border-t-4 border-red-600 pt-12 pb-8">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Brand */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">MovieTime</h3>
            <p className="text-sm leading-relaxed">
              Experience the magic of cinema with state-of-the-art screens and sound. Booking tickets has never been easier.
            </p>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-red-500 transition">Now Showing</Link></li>
              <li><Link href="/offers" className="hover:text-red-500 transition">Exclusive Offers</Link></li>
              <li><Link href="/gift-cards" className="hover:text-red-500 transition">Gift Cards</Link></li>
              {/* ERD Link for Project Presentation */}
              <li><Link href="/schema" className="text-yellow-500 hover:text-yellow-300 transition font-bold">View Architecture (ERD)</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-red-500 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-red-500 transition">FAQ</a></li>
            </ul>
          </div>

          {/* Column 4: Credits */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Project Details</h3>
            <p className="text-sm mb-2">Created by:</p>
            <p className="text-yellow-400 font-bold text-lg">Abhinav Singh</p>
            <p className="text-sm">Student, <span className="text-blue-400 font-bold">IIIT Nagpur</span></p>
            <p className="text-xs text-gray-500 mt-2">DBMS Course Project</p>
          </div>
        </div>

        <div className="text-center border-t border-gray-800 pt-8 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} MovieTime Booking System. All rights reserved.
        </div>
      </footer>
      <ChatBot />
    </div>
  );
}