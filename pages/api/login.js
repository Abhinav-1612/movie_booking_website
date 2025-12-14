import pool from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;

  try {
    // Simple query to match email and password
    const [users] = await pool.query(
      'SELECT * FROM Customers WHERE Email = ? AND Password = ?', 
      [email, password]
    );

    if (users.length > 0) {
      // Remove password before sending back to frontend for security
      const user = users[0];
      delete user.Password;
      res.status(200).json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}