const express = require('express');
const cors = require('cors');
const db = require('./dbserver');
const app = express();
app.use(cors());
app.use(express.json());

app.get('/client', (req,res)=>{
  res.send('<h1 style="background:#0a1931;color:#ffcc00;padding:20px;text-align:center">🔐 PINNACLE SECURITY LTD</h1><div style="max-width:500px;margin:20px auto;padding:20px;border:1px solid #ddd;border-radius:10px"><h2>Contact Us</h2><input id="n" placeholder="Name" style="width:100%;padding:10px;margin:5px 0"><input id="e" placeholder="Email" style="width:100%;padding:10px;margin:5px 0"><textarea id="m" placeholder="Message" style="width:100%;padding:10px"></textarea><br><button onclick="send()" style="background:#0a1931;color:#ffcc00;padding:12px;width:100%;border:none;border-radius:5px">Send</button><p id="ok" style="display:none;color:green">✅ Sent!</p></div><script>async function send(){let n=document.getElementById("n").value,e=document.getElementById("e").value,m=document.getElementById("m").value;let r=await fetch("/contacts",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:n,email:e,message:m})});let d=await r.json();if(d.success)document.getElementById("ok").style.display="block"}</script>');
});

app.get('/view-db', (req,res)=>{
  db.query("SELECT * FROM contacts ORDER BY id DESC", (err, contacts)=>{
    let rows = contacts ? contacts.map(c=>`<tr><td>${c.id}</td><td>${c.name}</td><td>${c.email}</td><td>${c.message}</td></tr>`).join('') : '';
    res.send(`<h1 style="color:#0a1931">Admin - Client Messages</h1><table border=1 cellpadding=10><tr><th>ID</th><th>Name</th><th>Email</th><th>Message</th></tr>${rows}</table><br><a href="/client">Go to Client Form</a>`);
  });
});

app.post('/contacts', (req,res)=>{
  const {name,email,message}=req.body;
  db.query("INSERT INTO contacts (name,email,message) VALUES (?,?,?)",[name,email,message],(err)=>{ if(err) return res.json({error:err.message}); res.json({success:true}); });
});
app.get('/contacts', (req,res)=>{ db.query("SELECT * FROM contacts ORDER BY id DESC",(err,result)=>{ res.json(result); }); });
app.get('/', (req,res)=>{ res.redirect('/client'); });

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', ()=>{console.log('Running',PORT)});