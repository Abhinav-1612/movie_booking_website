import pool from '../../../lib/db';

export default async function handler(req, res) {
  try {
    // 1. Total Revenue (Global)
    const [revenue] = await pool.query(`
      SELECT SUM(b.Seats_Booked * s.Price) as Total_Revenue 
      FROM Bookings b 
      JOIN ShowTable s ON b.Show_ID = s.Show_ID
    `);

    // 2. Total Tickets Sold
    const [tickets] = await pool.query('SELECT SUM(Seats_Booked) as Total_Tickets FROM Bookings');

    // 3. Recent 5 Bookings (Global)
    const [recent] = await pool.query(`
      SELECT b.Booking_ID, c.Name, m.Title, b.Seats_Booked, b.Booking_Date 
      FROM Bookings b
      JOIN Customers c ON b.Cust_ID = c.Cust_ID
      JOIN ShowTable s ON b.Show_ID = s.Show_ID
      JOIN Movies m ON s.Movie_ID = m.Movie_ID
      ORDER BY b.Booking_ID DESC LIMIT 5
    `);

    res.status(200).json({
      revenue: revenue[0].Total_Revenue || 0,
      tickets: tickets[0].Total_Tickets || 0,
      recentBookings: recent
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}