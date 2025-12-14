import pool from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, password, phone } = req.body;

  try {
    // Check if email already exists
    const [existing] = await pool.query('SELECT * FROM Customers WHERE Email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Insert new user
    const [result] = await pool.query(
      'INSERT INTO Customers (Name, Email, Password, Phone) VALUES (?, ?, ?, ?)',
      [name, email, password, phone]
    );

    res.status(200).json({ message: 'User created successfully', userId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}