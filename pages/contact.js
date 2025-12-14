import Head from 'next/head';

export default function Contact() {
  return (
    <div className="max-w-5xl mx-auto">
      <Head><title>Contact Us | MovieTime</title></Head>
      
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side: Image */}
        <div className="md:w-1/2 relative bg-gray-900">
           <img 
            src="https://placehold.co/800x1000/1e293b/FFFFFF?text=Contact+Us" 
            alt="Contact" 
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="relative p-12 text-white h-full flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-6">Get in touch</h2>
            <p className="text-lg text-gray-300 mb-8">Have a question about your booking? We are here to help 24/7.</p>
            <div className="space-y-4">
              <p className="flex items-center gap-3">
                <span>📍</span> IIIT Nagpur, Maharashtra, India
              </p>
              <p className="flex items-center gap-3">
                <span>📧</span> help@movietime.com
              </p>
              <p className="flex items-center gap-3">
                <span>📞</span> +91 98765 43210
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-1/2 p-12">
          <form className="space-y-6" onSubmit={(e) => {e.preventDefault(); alert("Message Sent!");}}>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Name</label>
              <input type="text" className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-red-500" placeholder="Abhinav Singh" />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Email</label>
              <input type="email" className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-red-500" placeholder="abhinav@example.com" />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Message</label>
              <textarea rows="4" className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-red-500" placeholder="How can we help?"></textarea>
            </div>
            <button className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}