import Head from 'next/head';
import Link from 'next/link';

export default function Schema() {
  return (
    <div className="max-w-6xl mx-auto">
      <Head><title>Project Architecture | MovieTime</title></Head>
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">DBMS Project Architecture</h1>
        <p className="text-xl text-gray-500">Database Schema & Entity-Relationship Diagram</p>
      </div>

      {/* --- ER Diagram Section --- */}
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Entity-Relationship (ER) Diagram</h2>
        <div className="flex justify-center bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300">
          {/* Displaying the image you saved */}
          <img 
            src="/images/er_diagram.png" 
            alt="ER Diagram" 
            className="max-w-full h-auto shadow-md rounded"
          />
        </div>
        <p className="text-center text-gray-500 mt-4 text-sm">
          Figure 1: Visual representation of the Movie Booking Database relationships.
        </p>
      </div>

      {/* --- Database Schema Details --- */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Table List */}
        <div className="bg-gray-900 text-gray-300 p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6">Database Tables</h2>
          <ul className="space-y-4 font-mono text-sm">
            <li className="flex flex-col">
              <span className="text-yellow-400 font-bold">Movies</span>
              <span>Stores movie details (Title, Genre, Duration).</span>
            </li>
            <li className="flex flex-col">
              <span className="text-yellow-400 font-bold">Theatres & Screens</span>
              <span>Physical locations and specific screens with seat capacities.</span>
            </li>
            <li className="flex flex-col">
              <span className="text-yellow-400 font-bold">ShowTable</span>
              <span>The core mapping table linking Movies, Screens, and Times.</span>
            </li>
            <li className="flex flex-col">
              <span className="text-yellow-400 font-bold">Customers</span>
              <span>User data including secure password storage.</span>
            </li>
            <li className="flex flex-col">
              <span className="text-yellow-400 font-bold">Bookings</span>
              <span>Transactional data linking Customers to specific Shows.</span>
            </li>
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="bg-blue-600 text-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Technology Stack</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-blue-200 uppercase tracking-wider text-sm">Frontend</h3>
              <p className="text-lg">Next.js (React), Tailwind CSS</p>
            </div>
            <div>
              <h3 className="font-bold text-blue-200 uppercase tracking-wider text-sm">Backend</h3>
              <p className="text-lg">Node.js API Routes</p>
            </div>
            <div>
              <h3 className="font-bold text-blue-200 uppercase tracking-wider text-sm">Database</h3>
              <p className="text-lg">MySQL (Relational DBMS)</p>
            </div>
            <div className="pt-4">
              <Link href="/" className="bg-white text-blue-700 px-6 py-2 rounded-full font-bold hover:bg-blue-50 transition">
                &larr; Back to Project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}