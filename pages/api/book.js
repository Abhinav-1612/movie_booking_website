import pool from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { show_id, name, email, seats } = req.body;

  try {
    // 1. Check if customer exists, or create new one
    let [cust] = await pool.query('SELECT Cust_ID FROM Customers WHERE Email = ?', [email]);
    let cust_id;

    if (cust.length > 0) {
      cust_id = cust[0].Cust_ID;
    } else {
      const [result] = await pool.query('INSERT INTO Customers (Name, Email) VALUES (?, ?)', [name, email]);
      cust_id = result.insertId;
    }

    // 2. Create the booking
    await pool.query(
      'INSERT INTO Bookings (Cust_ID, Show_ID, Seats_Booked, Booking_Date) VALUES (?, ?, ?, CURDATE())',
      [cust_id, show_id, seats]
    );

    res.status(200).json({ message: 'Booking Successful!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}