import pool from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { message } = req.body;
  const userQuery = message.toLowerCase();
  
  try {
    let reply = "I didn't quite catch that. Ask me about 'movies', 'prices', 'offers', or 'locations'.";

    // --- 1. SHOW TIMINGS (Real DB Query) ---
    if (userQuery.includes('show') || userQuery.includes('time') || userQuery.includes('movie') || userQuery.includes('playing')) {
      
      // Get all movies to check against user input
      const [movies] = await pool.query("SELECT Title FROM Movies");
      const foundMovie = movies.find(m => userQuery.includes(m.Title.toLowerCase()));

      if (foundMovie) {
        const [shows] = await pool.query(`
          SELECT t.Theatre_Name, s.Show_Time 
          FROM ShowTable s
          JOIN Movies m ON s.Movie_ID = m.Movie_ID
          JOIN Screens sc ON s.Screen_ID = sc.Screen_ID
          JOIN Theatres t ON sc.Theatre_ID = t.Theatre_ID
          WHERE m.Title = ? AND s.Show_Date >= CURDATE()
          ORDER BY s.Show_Date LIMIT 3
        `, [foundMovie.Title]);

        if (shows.length > 0) {
          const times = shows.map(s => `${s.Show_Time.substring(0,5)} at ${s.Theatre_Name}`).join(', ');
          reply = `Upcoming shows for ${foundMovie.Title}: ${times}.`;
        } else {
          reply = `I found ${foundMovie.Title} in our database, but there are no shows scheduled for the next 3 days.`;
        }
      } else {
        // List top 3 movies if no specific one asked
        const titles = movies.slice(0, 3).map(m => m.Title).join(", ");
        reply = `We are currently screening: ${titles}, and more! Which one are you interested in?`;
      }
    }

    // --- 2. PRICE ---
    else if (userQuery.includes('price') || userQuery.includes('cost') || userQuery.includes('ticket')) {
      reply = "Ticket prices depend on the timing: Morning shows (₹150), Evening (₹250), and Night (₹350).";
    }

    // --- 3. OFFERS ---
    else if (userQuery.includes('offer') || userQuery.includes('discount')) {
      reply = "Use code 'BOGO' to Buy 1 Get 1 Free on your first booking!";
    }

    // --- 4. LOCATIONS ---
    else if (userQuery.includes('city') || userQuery.includes('location') || userQuery.includes('theatre')) {
      const [theatres] = await pool.query("SELECT Theatre_Name FROM Theatres LIMIT 3");
      const tNames = theatres.map(t => t.Theatre_Name).join(", ");
      reply = `We have theaters in Nagpur and Metro cities, including: ${tNames}.`;
    }

    // --- 5. GREETINGS ---
    else if (userQuery.includes('hi') || userQuery.includes('hello')) {
      reply = "Hello! I am your MovieTime assistant. How can I help you book a ticket today?";
    }

    res.status(200).json({ reply });

  } catch (error) {
    console.error("Chatbot Error:", error);
    res.status(500).json({ reply: "I'm having trouble checking the database right now." });
  }
}