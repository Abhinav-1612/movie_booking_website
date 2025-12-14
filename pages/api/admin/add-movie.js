import pool from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { title, genre, duration, image } = req.body;

  // We use a dedicated connection for Transactions
  const connection = await pool.getConnection();

  try {
    // 1. Start Transaction (Safety Mode)
    await connection.beginTransaction();

    // 2. Insert the New Movie
    const [result] = await connection.query(
      'INSERT INTO Movies (Title, Genre, Duration, Image_Path) VALUES (?, ?, ?, ?)',
      [title, genre, duration, image]
    );
    
    const newMovieId = result.insertId;

    // 3. Automatically Schedule Shows for this Movie
    // We assume Screen IDs 4, 5, 6 are our Nagpur screens (from the setup script)
    
    // Show 1: Tomorrow 10:00 AM @ Screen 4 (PVR Empress Mall) - ₹150
    await connection.query(
      `INSERT INTO ShowTable (Movie_ID, Screen_ID, Show_Date, Show_Time, Price) 
       VALUES (?, 4, CURDATE() + INTERVAL 1 DAY, '10:00:00', 150)`,
      [newMovieId]
    );

    // Show 2: Day After Tomorrow 6:00 PM @ Screen 5 (Cinepolis VR Mall) - ₹250
    await connection.query(
      `INSERT INTO ShowTable (Movie_ID, Screen_ID, Show_Date, Show_Time, Price) 
       VALUES (?, 5, CURDATE() + INTERVAL 2 DAY, '18:00:00', 250)`,
      [newMovieId]
    );

    // Show 3: In 3 Days 9:00 PM @ Screen 6 (MovieMax Eternity) - ₹350
    await connection.query(
      `INSERT INTO ShowTable (Movie_ID, Screen_ID, Show_Date, Show_Time, Price) 
       VALUES (?, 6, CURDATE() + INTERVAL 3 DAY, '21:00:00', 350)`,
      [newMovieId]
    );

    // 4. Commit Changes (Save Everything)
    await connection.commit();

    res.status(200).json({ message: 'Movie Added & Shows Scheduled Successfully!', id: newMovieId });
    
  } catch (error) {
    // If anything fails, undo everything (Rollback)
    await connection.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    // Always release the connection back to the pool
    connection.release();
  }
}