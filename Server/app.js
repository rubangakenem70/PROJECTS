const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let db, pool;
try {
  db = require('./dbserver'); // dbserver.js exports pool (callback)
  pool = db.promise(); // Convert to promise for await
  console.log("✅ dbserver.js loaded");
} catch(e){
  console.log("DB not loaded yet:", e.message);
}

// --- OFFICERS API (your frontend) ---
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

// --- ADMIN PANEL - FIXED ---
app.get('/view-db', async (req, res) => {
  if(req.query.key!== 'Pinnacle@2026'){
    return res.send('<h2 style="text-align:center;margin-top:100px;">🔐 Access Denied<br><br>Use: /view-db?key=Pinnacle@2026</h2>');
  }
  try {
    const [officers] = await pool.query('SELECT * FROM officers ORDER BY id DESC');
    const [messages] = await pool.query('SELECT * FROM messages ORDER BY id DESC');

    let html = `
    <html><head><title>Pinnacle Admin</title>
    <style>
      body{font-family:Arial;background:#f4f4f4;padding:20px}
     .container{max-width:1200px;margin:auto;background:white;padding:20px;border-radius:10px;box-shadow:0 0 10px #ccc}
      table{width:100%;border-collapse:collapse;margin:20px 0}
      th,td{border:1px solid #ddd;padding:10px;text-align:left}
      th{background:#222;color:white}
      h1{text-align:center}
    </style>
    </head><body>
    <div class="container">
    <h1>🔐 Admin Panel - Pinnacle Security</h1>
    <h2>Officers (${officers.length})</h2>
    <table><tr><th>ID</th><th>Name</th></tr>
    ${officers.map(o=>`<tr><td>${o.id}</td><td>${o.name}</td></tr>`).join('')}
    </table>
    <h2>Messages (${messages.length})</h2>
    <table><tr><th>ID</th><th>Name</th><th>Email</th><th>Message</th></tr>
    ${messages.map(m=>`<tr><td>${m.id}</td><td>${m.name}</td><td>${m.email}</td><td>${m.message}</td></tr>`).join('')}
    </table>
    </div></body></html>`;
    res.send(html);
  } catch(e){
    res.status(500).send('DB Error: ' + e.message);
  }
});

app.get('/', (req, res) => res.json({ message: 'Pinnacle Security API LIVE ✅ - Use /view-db?key=Pinnacle@2026' }));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Running Fixed ${PORT}`));