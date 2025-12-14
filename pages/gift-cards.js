import Head from 'next/head';

export default function GiftCards() {
  const cards = [
    { value: 500, bg: "from-purple-500 to-indigo-600" },
    { value: 1000, bg: "from-red-500 to-pink-600" },
    { value: 2000, bg: "from-yellow-400 to-orange-500" },
  ];

  return (
    <div>
      <Head><title>Gift Cards | MovieTime</title></Head>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Gift the Joy of Movies</h1>
        <p className="text-gray-500 text-lg">The perfect gift for your friends and family.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {cards.map((card, index) => (
          <div key={index} className="flex flex-col">
            {/* Card Design */}
            <div className={`h-56 rounded-xl bg-gradient-to-br ${card.bg} text-white p-8 shadow-2xl relative overflow-hidden transform hover:scale-105 transition duration-300`}>
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white opacity-20 rounded-full blur-2xl"></div>
              <h3 className="text-3xl font-bold tracking-widest mb-1">MOVIE CARD</h3>
              <p className="text-sm opacity-80 mb-8">Official Gift Voucher</p>
              
              <div className="mt-auto">
                <p className="text-xs uppercase opacity-75">Value</p>
                <p className="text-4xl font-bold">₹{card.value}</p>
              </div>
            </div>
            
            {/* Purchase Button */}
            <button className="mt-6 w-full bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition shadow-lg">
              Buy for ₹{card.value}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-blue-50 p-8 rounded-xl text-center border border-blue-100">
        <h3 className="text-xl font-bold text-blue-900 mb-2">Corporate Gifting?</h3>
        <p className="text-blue-700 mb-4">We offer bulk discounts for corporate orders.</p>
        <button className="text-blue-600 font-bold hover:underline" onClick={()=>window.location.href='/contact'}>Contact Sales &rarr;</button>
      </div>
    </div>
  );
}