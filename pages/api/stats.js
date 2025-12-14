import pool from '../../lib/db';

export default async function handler(req, res) {
  const { email } = req.query;
  if (!email) return res.status(400).json({ message: 'Email required' });

  try {
    // 1. Get Total Spent & Total Minutes Watched
    const overviewSql = `
      SELECT 
        SUM(b.Seats_Booked * s.Price) as Total_Spent,
        SUM(b.Seats_Booked * m.Duration) as Total_Minutes
      FROM Bookings b
      JOIN Customers c ON b.Cust_ID = c.Cust_ID
      JOIN ShowTable s ON b.Show_ID = s.Show_ID
      JOIN Movies m ON s.Movie_ID = m.Movie_ID
      WHERE c.Email = ?
    `;

    // 2. Get Favorite Genres (Group By)
    const genreSql = `
      SELECT m.Genre, COUNT(*) as Count
      FROM Bookings b
      JOIN Customers c ON b.Cust_ID = c.Cust_ID
      JOIN ShowTable s ON b.Show_ID = s.Show_ID
      JOIN Movies m ON s.Movie_ID = m.Movie_ID
      WHERE c.Email = ?
      GROUP BY m.Genre
    `;

    const [overviewRows] = await pool.query(overviewSql, [email]);
    const [genreRows] = await pool.query(genreSql, [email]);

    res.status(200).json({
      spent: overviewRows[0].Total_Spent || 0,
      minutes: overviewRows[0].Total_Minutes || 0,
      genres: genreRows
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}