import pool from '../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;
  try {
    const sql = `
      SELECT s.Show_ID, t.Theatre_Name, t.Location, s.Show_Date, s.Show_Time,
             (sc.Total_Seats - COALESCE(SUM(b.Seats_Booked), 0)) AS Available_Seats,
             sc.Total_Seats
      FROM ShowTable s
      JOIN Screens sc ON s.Screen_ID = sc.Screen_ID
      JOIN Theatres t ON sc.Theatre_ID = t.Theatre_ID
      LEFT JOIN Bookings b ON s.Show_ID = b.Show_ID
      WHERE s.Movie_ID = ?
      GROUP BY s.Show_ID, t.Theatre_Name, t.Location, s.Show_Date, s.Show_Time, sc.Total_Seats
      ORDER BY s.Show_Date, s.Show_Time
    `;
    const [rows] = await pool.query(sql, [id]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}