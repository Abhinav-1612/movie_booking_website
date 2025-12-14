import pool from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end(); // We use POST for simplicity

  const { movie_id } = req.body;

  if (!movie_id) return res.status(400).json({ error: "Movie ID is required" });

  const connection = await pool.getConnection();

  try {
    // 1. Start Transaction
    await connection.beginTransaction();

    // 2. Delete Bookings associated with this movie's shows
    // We find all shows for this movie, then delete bookings for those shows
    await connection.query(`
      DELETE FROM Bookings 
      WHERE Show_ID IN (SELECT Show_ID FROM ShowTable WHERE Movie_ID = ?)
    `, [movie_id]);

    // 3. Delete Shows (ShowTable)
    await connection.query('DELETE FROM ShowTable WHERE Movie_ID = ?', [movie_id]);

    // 4. Delete the Movie
    await connection.query('DELETE FROM Movies WHERE Movie_ID = ?', [movie_id]);

    // 5. Commit Changes
    await connection.commit();

    res.status(200).json({ message: 'Movie and all related data deleted successfully' });

  } catch (error) {
    await connection.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
}