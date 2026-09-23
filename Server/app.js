const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const db = require('./dbserver');
const app = express();

app.use(cors());
app.use(express.json());

// --- AUTO CREATE TABLES ONE BY ONE ---
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
   endpoints: ["/getall", "/insert", "/contacts", "/search/:name"]
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

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', ()=>{
  console.log('Server running on port', PORT);
});