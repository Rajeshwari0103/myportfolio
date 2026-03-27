// server.js — Backend (Node.js + Express)
// Deployed on Render | DB on Railway | Frontend on GitHub Pages

require('dotenv').config();

const express = require('express');
const cors    = require('cors');
const db      = require('./db');

const app  = express();
const PORT = process.env.PORT || 3000;

// ===== MIDDLEWARE =====
app.use(cors());          // Allows GitHub Pages frontend to call this API
app.use(express.json());

// ===== ROUTES =====

// GET / — health check (Render uses this to confirm server is alive)
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio backend is running! 🚀' });
});

// POST /contact — save contact form message to Railway DB
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const sql = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';

  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error('❌ DB Error:', err.message);
      return res.status(500).json({ error: 'Failed to save message.' });
    }
    console.log('✅ Contact saved! ID:', result.insertId);
    res.status(200).json({ success: true, message: 'Message received!' });
  });
});

// GET /contacts — view all submissions (optional, for you to check)
app.get('/contacts', (req, res) => {
  db.query('SELECT * FROM contacts ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch contacts.' });
    }
    res.json(rows);
  });
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});