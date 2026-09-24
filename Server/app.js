require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Serve your HTML? If frontend in different folder, keep cors

// === OFFICERS CRUD ===

// Get all officers
app.get('/api/officers', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM officers ORDER BY id DESC');
    res.json(rows);
  } catch (e) {
    console.log("Query Error:", e.message);
    res.status(500).json({ error: e.message });
  }
});

// Add officer
app.post('/api/officers', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name required" });
    const [result] = await pool.query('INSERT INTO officers (name) VALUES (?)', [name]);
    res.json({ success: true, id: result.insertId });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Search officer
app.get('/api/officers/search/:term', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM officers WHERE name LIKE?', [`%${req.params.term}%`]);
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Delete officer
app.delete('/api/officers/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM officers WHERE id =?', [req.params.id]);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Edit officer
app.put('/api/officers/:id', async (req, res) => {
  try {
    const { name } = req.body;
    await pool.query('UPDATE officers SET name =? WHERE id =?', [name, req.params.id]);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    await pool.query('INSERT INTO messages (name, email, message) VALUES (?,?,?)', [name, email, message]);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'Pinnacle Security API Running - DB Connected ✅' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running Fixed ${PORT}`));