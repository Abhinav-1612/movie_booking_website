import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const data = await res.json();
      // Save user to LocalStorage
      localStorage.setItem('user', JSON.stringify(data.user));
      // Force reload to update Navbar
      window.location.href = '/'; 
    } else {
      alert('Invalid Email or Password');
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Image */}
      <div className="hidden lg:block w-1/2 bg-gray-900 relative">
        <img 
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop" 
          alt="Cinema Hall" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h1 className="text-5xl font-bold mb-4">Welcome Back</h1>
            <p className="text-xl">Your movie journey continues here.</p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Login to MovieTime</h2>
          <p className="text-gray-500 mb-8">Welcome back! Please enter your details.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" required 
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" required 
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition">
              Log In
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Don't have an account? <Link href="/signup" className="text-red-600 font-bold hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}