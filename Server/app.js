const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const db = require('./dbserver');
const app = express();

app.use(cors());
app.use(express.json());

// --- AUTO CREATE TABLES ---
db.query(`
CREATE TABLE IF NOT EXISTS names (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`, (err) => {
  if(err) console.log("names table error:", err.message);
  else console.log("names table ready!");
});

db.query(`
CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  message TEXT,
  date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`, (err) => {
  if(err) console.log("contacts table error:", err.message);
  else console.log("contacts table ready!");
});

app.get('/', (req,res)=>{
 res.json({
   message: "Pinnacle Security Limited API is Running! 🔐",
   endpoints: ["/getall", "/insert", "/contacts", "/search/:name", "/view-db"]
 });
});

app.post('/insert', (req,res)=>{
 const {name}=req.body;
 db.query("INSERT INTO names (name) VALUES (?)",[name],(err)=>{ if(err) return res.json({error:err.sqlMessage}); res.json({success:true}); });
});

app.get('/getall', (req,res)=>{
 db.query("SELECT * FROM names ORDER BY id DESC",(err,result)=>{ if(err) return res.json({error:err.message}); res.json(result); });
});

app.get('/search/:name', (req,res)=>{
 db.query("SELECT * FROM names WHERE name LIKE?",[`%${req.params.name}%`],(err,result)=>{ if(err) return res.json({error:err.message}); res.json(result); });
});

app.put('/update/:id', (req,res)=>{
 db.query("UPDATE names SET name=? WHERE id=?",[req.body.name, req.params.id],(err)=>{ if(err) return res.json({error:err.message}); res.json({success:true}); });
});

app.delete('/delete/:id', (req,res)=>{
 db.query("DELETE FROM names WHERE id=?",[req.params.id],(err)=>{ if(err) return res.json({error:err.message}); res.json({success:true}); });
});

app.post('/contacts', (req,res)=>{
 const {name,email,message}=req.body;
 if(!name||!email||!message) return res.json({error:'All required'});
 db.query("INSERT INTO contacts (name,email,message) VALUES (?,?,?)",[name,email,message],(err,result)=>{
  if(err){ console.log("INSERT FAILED:",err); return res.json({error:err.sqlMessage}); }
  console.log("SAVED ID:",result.insertId); res.json({success:true});
 });
});

app.get('/contacts', (req,res)=>{
 db.query("SELECT * FROM contacts ORDER BY id DESC",(err,result)=>{ if(err) return res.json({error:err.message}); res.json(result); });
});

// --- NEW: MySQL DATABASE VIEWER LIKE PHPMYADMIN ---
app.get('/view-db', (req,res)=>{
  db.query("SELECT * FROM names ORDER BY id DESC", (err1, officers)=>{
    db.query("SELECT * FROM contacts ORDER BY id DESC", (err2, contacts)=>{
      let html = `
      <html><head><title>Pinnacle MySQL DB Viewer</title>
      <style>
        body{font-family:Arial;background:#0a1931;color:white;padding:20px}
        h1{color:#ffcc00} h2{color:#ffcc00;margin-top:40px;border-bottom:2px solid #ffcc00;padding-bottom:10px}
        table{width:100%;border-collapse:collapse;background:white;color:#0a1931;border-radius:10px;overflow:hidden;margin-top:15px}
        th{background:#0a1931;color:#ffcc00;padding:12px;text-align:left}
        td{padding:10px;border-bottom:1px solid #ddd}
       .count{background:#ffcc00;color:#0a1931;padding:5px 12px;border-radius:20px;font-weight:bold}
      </style></head><body>
      <h1>🔐 Pinnacle Security - MySQL Live Database</h1>
      <p>Host: bcavb8ghv5igktml85mk-mysql.services.clever-cloud.com | DB: bcavb8ghv5igktml85mk</p>

      <h2>📋 Table: names (Officers) <span class="count">${officers? officers.length : 0} records</span></h2>
      <table><tr><th>ID</th><th>OFFICER NAME</th><th>DATE ADDED</th></tr>
      ${officers && officers.length? officers.map(o=>`<tr><td>${o.id}</td><td><b>${o.name}</b></td><td>${new Date(o.date_added).toLocaleString()}</td></tr>`).join('') : '<tr><td colspan=3>No officers yet</td></tr>'}
      </table>

      <h2>✉️ Table: contacts (Client Messages) <span class="count">${contacts? contacts.length : 0} records</span></h2>
      <table><tr><th>ID</th><th>NAME</th><th>EMAIL</th><th>MESSAGE</th><th>DATE</th></tr>
      ${contacts && contacts.length? contacts.map(c=>`<tr><td>${c.id}</td><td>${c.name}</td><td>${c.email}</td><td>${c.message}</td><td>${new Date(c.date_added).toLocaleString()}</td></tr>`).join('') : '<tr><td colspan=5>No messages yet</td></tr>'}
      </table>
      <br><br><a href="/" style="color:#ffcc00">← Back to API</a>
      </body></html>`;
      res.send(html);
    });
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', ()=>{
  console.log('Server running on port', PORT);
});