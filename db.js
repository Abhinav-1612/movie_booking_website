// lib/db.js
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306, // Change to 3307 if using XAMPP custom port
  user: 'root',
  password: 'abhinav16',
  database: 'movie_booking',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
