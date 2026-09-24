require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

// Your frontend expects these exact links
app.get('/getall', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM officers ORDER BY id DESC');
    res.json(rows);
  } catch(e){ res.status(500).json({error: e.message}); }
});

app.post('/insert', async (req, res) => {
  try {
    const { name } = req.body;
    const [result] = await pool.query('INSERT INTO officers (name) VALUES (?)', [name]);
    res.json({ success: true, id: result.insertId });
  } catch(e){ res.status(500).json({error: e.message}); }
});

app.delete('/delete/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM officers WHERE id =?', [req.params.id]);
    res.json({ success: true });
  } catch(e){ res.status(500).json({error: e.message}); }
});

app.put('/update/:id', async (req, res) => {
  try {
    await pool.query('UPDATE officers SET name =? WHERE id =?', [req.body.name, req.params.id]);
    res.json({ success: true });
  } catch(e){ res.status(500).json({error: e.message}); }
});

app.get('/search/:q', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM officers WHERE name LIKE?', [`%${req.params.q}%`]);
    res.json(rows);
  } catch(e){ res.status(500).json({error: e.message}); }
});

app.post('/contacts', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    await pool.query('INSERT INTO messages (name, email, message) VALUES (?,?,?)', [name, email, message]);
    res.json({ success: true });
  } catch(e){ res.status(500).json({error: e.message}); }
});

app.get('/', (req, res) => res.json({ message: 'Pinnacle Security API LIVE ✅' }));

const PORT = process.env.PORT || 10000; // Render uses 10000
app.listen(PORT, () => console.log(`Running Fixed ${PORT}`));