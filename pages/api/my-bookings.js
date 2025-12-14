// pages/api/my-bookings.js
import pool from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const sql = `
      SELECT b.Booking_ID, m.Title, t.Theatre_Name, s.Show_Date, s.Show_Time, b.Seats_Booked
      FROM Bookings b
      JOIN Customers c ON b.Cust_ID = c.Cust_ID
      JOIN ShowTable s ON b.Show_ID = s.Show_ID
      JOIN Movies m ON s.Movie_ID = m.Movie_ID
      JOIN Screens sc ON s.Screen_ID = sc.Screen_ID
      JOIN Theatres t ON sc.Theatre_ID = t.Theatre_ID
      WHERE c.Email = ?
      ORDER BY s.Show_Date DESC, s.Show_Time DESC
    `;
    
    const [rows] = await pool.query(sql, [email]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}