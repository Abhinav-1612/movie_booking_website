import Head from 'next/head';

export default function Offers() {
  // Using placeholder images that look professional
  const offers = [
    { id: 1, title: "Buy 1 Get 1 Free", desc: "Use code: BOGO on your first booking.", img: "https://placehold.co/600x400/DC2626/FFFFFF?text=BOGO+Free", color: "bg-red-50" },
    { id: 2, title: "Student Discount", desc: "Get flat 20% off with your student ID.", img: "https://placehold.co/600x400/2563EB/FFFFFF?text=Student+20%25+OFF", color: "bg-blue-50" },
    { id: 3, title: "Weekend Bonanza", desc: "Free popcorn with every weekend ticket!", img: "https://placehold.co/600x400/D97706/FFFFFF?text=Free+Popcorn", color: "bg-yellow-50" },
  ];

  return (
    <div>
      <Head><title>Offers | MovieTime</title></Head>
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Exclusive Offers</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        {offers.map((offer) => (
          <div key={offer.id} className={`rounded-2xl overflow-hidden shadow-lg border border-gray-200 ${offer.color} hover:shadow-xl transition`}>
            <img src={offer.img} alt={offer.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{offer.title}</h3>
              <p className="text-gray-600 mb-4">{offer.desc}</p>
              <button className="w-full py-2 bg-white border-2 border-dashed border-gray-400 text-gray-700 font-mono font-bold rounded hover:bg-gray-100 transition">
                Copy Code
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}