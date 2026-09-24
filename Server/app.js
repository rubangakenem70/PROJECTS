const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let db, pool;
try {
  db = require('./dbserver');
  pool = db.promise();
  console.log("✅ dbserver.js loaded");
} catch(e){
  console.log("DB not loaded yet:", e.message);
}

// --- Support BOTH routes ---
// New RESTful routes for your frontend
app.get('/api/officers', async (req, res) => {
  try { const [rows] = await pool.query('SELECT * FROM officers ORDER BY id DESC'); res.json(rows); }
  catch(e){ res.status(500).json({error:e.message}); }
});
app.get('/getall', async (req, res) => {
  try { const [rows] = await pool.query('SELECT * FROM officers ORDER BY id DESC'); res.json(rows); }
  catch(e){ res.status(500).json({error:e.message}); }
});

app.post('/api/officers', async (req, res) => {
  try { const [r] = await pool.query('INSERT INTO officers (name) VALUES (?)', [req.body.name]); res.json({success:true, id:r.insertId}); }
  catch(e){ res.status(500).json({error:e.message}); }
});
app.post('/insert', async (req, res) => {
  try { const [r] = await pool.query('INSERT INTO officers (name) VALUES (?)', [req.body.name]); res.json({success:true, id:r.insertId}); }
  catch(e){ res.status(500).json({error:e.message}); }
});

app.delete('/api/officers/:id', async (req, res) => {
  try { await pool.query('DELETE FROM officers WHERE id =?', [req.params.id]); res.json({success:true}); }
  catch(e){ res.status(500).json({error:e.message}); }
});
app.delete('/delete/:id', async (req, res) => {
  try { await pool.query('DELETE FROM officers WHERE id =?', [req.params.id]); res.json({success:true}); }
  catch(e){ res.status(500).json({error:e.message}); }
});

app.put('/api/officers/:id', async (req, res) => {
  try { await pool.query('UPDATE officers SET name =? WHERE id =?', [req.body.name, req.params.id]); res.json({success:true}); }
  catch(e){ res.status(500).json({error:e.message}); }
});
app.put('/update/:id', async (req, res) => {
  try { await pool.query('UPDATE officers SET name =? WHERE id =?', [req.body.name, req.params.id]); res.json({success:true}); }
  catch(e){ res.status(500).json({error:e.message}); }
});

app.get('/api/officers/search/:q', async (req, res) => {
  try { const [rows] = await pool.query('SELECT * FROM officers WHERE name LIKE?', [`%${req.params.q}%`]); res.json(rows); }
  catch(e){ res.status(500).json({error:e.message}); }
});
app.get('/search/:q', async (req, res) => {
  try { const [rows] = await pool.query('SELECT * FROM officers WHERE name LIKE?', [`%${req.params.q}%`]); res.json(rows); }
  catch(e){ res.status(500).json({error:e.message}); }
});

app.post('/api/contact', async (req, res) => {
  try { await pool.query('INSERT INTO messages (name,email,message) VALUES (?,?,?)', [req.body.name, req.body.email, req.body.message]); res.json({success:true}); }
  catch(e){ res.status(500).json({error:e.message}); }
});
app.post('/contacts', async (req, res) => {
  try { await pool.query('INSERT INTO messages (name,email,message) VALUES (?,?,?)', [req.body.name, req.body.email, req.body.message]); res.json({success:true}); }
  catch(e){ res.status(500).json({error:e.message}); }
});

app.get('/view-db', async (req, res) => {
  if(req.query.key!== 'Pinnacle@2026') return res.send('<h2 style="text-align:center;margin-top:100px;">🔐 Denied - Use /view-db?key=Pinnacle@2026</h2>');
  try {
    const [officers] = await pool.query('SELECT * FROM officers ORDER BY id DESC');
    const [messages] = await pool.query('SELECT * FROM messages ORDER BY id DESC');
    res.send(`<html><head><style>body{font-family:Arial;background:#f4f4f4;padding:20px}.container{max-width:1100px;margin:auto;background:white;padding:20px;border-radius:10px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ddd;padding:8px}th{background:#222;color:#fff}h1{text-align:center}</style></head><body><div class="container"><h1>🔐 Pinnacle Admin</h1><h2>Officers (${officers.length})</h2><table><tr><th>ID</th><th>Name</th></tr>${officers.map(o=>`<tr><td>${o.id}</td><td>${o.name}</td></tr>`).join('')}</table><h2>Messages (${messages.length})</h2><table><tr><th>ID</th><th>Name</th><th>Email</th><th>Message</th></tr>${messages.map(m=>`<tr><td>${m.id}</td><td>${m.name}</td><td>${m.email}</td><td>${m.message}</td></tr>`).join('')}</table></div></body></html>`);
  } catch(e){ res.status(500).send(e.message); }
});

app.get('/', (req, res) => res.json({ message: 'Pinnacle LIVE ✅ - /view-db?key=Pinnacle@2026' }));
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Running Fixed ${PORT}`));