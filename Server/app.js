const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let db; try{ db=require('./dbserver'); }catch(e){}
function safeQuery(sql,params,cb){ if(!db) return cb(new Error("DB not connected"),null); db.query(sql,params,(err,res)=>{ if(err) return cb(err,null); cb(null,res); }); }

const ADMIN_PASSWORD = "Pinnacle@2026";

function checkAdmin(req,res,next){
  const key = req.query.key;
  if(key === ADMIN_PASSWORD) return next();
  return res.send(`
  <html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>
  body{font-family:Arial;background:#0a1931;display:flex;justify-content:center;align-items:center;height:100vh;margin:0}
 .box{background:white;padding:30px;border-radius:15px;max-width:400px;width:90%;text-align:center}
  input{width:100%;padding:12px;margin:10px 0;border-radius:8px;border:1px solid #ccc}button{background:#0a1931;color:#ffcc00;padding:12px;width:100%;border:none;border-radius:8px;font-weight:bold}
  </style></head><body><div class="box"><h2>🔐 Admin Login</h2><input id="p" type="password" placeholder="Password"><button onclick="login()">Login</button><br><br><a href="/">Back</a></div>
  <script>function login(){ location.href='/view-db?key='+document.getElementById('p').value; }</script></body></html>`);
}

const site = `<!DOCTYPE html><html><head><title>Pinnacle Security Limited</title><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
html{scroll-behavior:smooth}*{margin:0;padding:0;box-sizing:border-box}body{font-family:Arial;background:#f5f7fa}
.nav{background:#0a1931;padding:15px 20px;display:flex;justify-content:space-between;align-items:center;position:fixed;top:0;width:100%;z-index:1000}
.nav h1{color:#ffcc00;font-size:18px}.menu{display:flex;gap:18px}.menu a{color:white;text-decoration:none;font-weight:bold;font-size:14px}
.drop{position:relative}.drop-menu{display:none;position:absolute;top:100%;left:0;background:white;min-width:200px;border-radius:8px;box-shadow:0 5px 15px rgba(0,0,0,0.3)}
.drop-menu a{color:#0a1931!important;padding:12px;display:block}.drop:hover.drop-menu{display:block}
.hero{margin-top:60px;background:#0a1931;color:white;padding:90px 20px;text-align:center}
.hero h2{font-size:40px;color:#ffcc00}.btn{background:#ffcc00;color:#0a1931;padding:12px 25px;border-radius:25px;text-decoration:none;font-weight:bold;display:inline-block;margin:10px}
.section{padding:50px 20px;max-width:1100px;margin:auto}.section h2{text-align:center;color:#0a1931}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;margin-top:25px}
.card{background:white;padding:22px;border-radius:12px;box-shadow:0 3px 10px rgba(0,0,0,0.08);border-left:4px solid #ffcc00}
.contact{background:#0a1931;color:white;padding:35px;border-radius:15px;display:grid;grid-template-columns:1fr 1fr;gap:25px}
@media(max-width:700px){.contact{grid-template-columns:1fr}.nav{flex-wrap:wrap}.menu{width:100%;justify-content:center;margin-top:8px}}
input,textarea,select{width:100%;padding:12px;margin:6px 0;border-radius:8px;border:1px solid #ccc}
.footer{background:#050e1f;color:#999;padding:25px;text-align:center}
</style></head><body>

<div class="nav">
<h1>🔐 PINNACLE SECURITY LTD</h1>
<div class="menu">
<a href="/">Home</a>
<a href="#about">About</a>
<div class="drop"><a href="#services">Services ▼</a>
<div class="drop-menu">
<a href="#services">Security Guard Service</a>
<a href="#services">Construction Security</a>
<a href="#services">CCTV & Alarms</a>
<a href="#services">VIP Protection</a>
</div></div>
<a href="#contact">Contact</a>
</div>
</div>

<div class="hero">
<h2>Pinnacle Security Limited</h2>
<p>442/443 Kironde Rd, Kampala, Uganda | 0754 139726 | 4.3★ 11 Reviews</p>
<br>
<a class="btn" href="#contact">Get Guard Now</a>
</div>

<div class="section" id="about">
<h2>About Us</h2>
<div class="grid">
<div class="card"><h3>Who We Are</h3><p><b>Pinnacle Security Limited</b> located at 442/443 Kironde Rd, Kampala. Working in Security Guard Service and Construction. ISIC: 8010, F. Wheelchair Parking: Yes</p></div>
<div class="card"><h3>Working Hours</h3><p>Mon 8-4, Tue 8:30-4, Wed-Thu 8-4, Fri 24 Hours, Sat 10-2:30, Sun Closed</p><p style="color:green"><b>Open until 4:00 PM</b></p></div>
<div class="card"><h3>Contact Info</h3><p>📍 442/443 Kironde Rd, Kampala<br>📞 0754 139726<br>✉️ info@pinnaclegroup.co.ug<br>🌐 pinnaclegroup.co.ug</p></div>
</div>
</div>

<div class="section" id="services" style="background:white">
<h2>Our Services</h2>
<div class="grid">
<div class="card"><h3>🛡️ Security Guard Service</h3><p>Licensed guards for homes, businesses, NGOs.</p></div>
<div class="card"><h3>🏗️ Construction</h3><p>Security for construction sites and materials.</p></div>
<div class="card"><h3>📹 CCTV & Alarms</h3><p>Installation and monitoring.</p></div>
<div class="card"><h3>👤 VIP Protection</h3><p>Executive protection and escort.</p></div>
</div>
</div>

<div class="section" id="contact">
<h2>Contact Us</h2>
<div class="contact">
<div><h3 style="color:#ffcc00">Head Office</h3><br><p>442/443 Kironde Rd, Kampala</p><p>Branch: Kotido, Karamoja</p><br><p>Phone: 0754 139726</p><p>Email: info@pinnaclegroup.co.ug</p></div>
<div style="background:white;padding:20px;border-radius:10px">
<h3 style="color:#0a1931">Send Message</h3>
<input id="n" placeholder="Name">
<input id="e" placeholder="Phone / Email">
<select id="s"><option value="">Select Service</option><option>Security Guard Service</option><option>Construction Security</option><option>CCTV Installation</option><option>VIP Protection</option><option>Other</option></select>
<textarea id="m" rows="3" placeholder="Message"></textarea>
<button onclick="sendMsg()" style="background:#0a1931;color:#ffcc00">Send</button>
<p id="ok" style="display:none;color:green;margin-top:10px">✅ Sent!</p>
</div>
</div>
</div>

<div class="footer"><p>© 2026 Pinnacle Security Limited - 442/443 Kironde Rd, Kampala | 0754 139726</p></div>

<script>
async function sendMsg(){
 let n=document.getElementById('n').value,
     e=document.getElementById('e').value,
     s=document.getElementById('s').value,
     m=document.getElementById('m').value;
 if(!n||!e||!m) return alert('Fill all');
 let contactInfo = e + (s? ' | Service: ' + s : '');
 let r=await fetch('/contacts',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:n,email:contactInfo,message:m})});
 let d=await r.json(); if(d.success) document.getElementById('ok').style.display='block';
}
</script></body></html>`;

app.get('/',(req,res)=>res.send(site));
app.get('/client',(req,res)=>res.send(site));

app.get('/view-db',checkAdmin,(req,res)=>{
 safeQuery("SELECT * FROM contacts ORDER BY id DESC",[],(err,contacts)=>{
  if(err) return res.send("DB Error "+err.message);
  let rows=contacts.map(c=>{
    let contact = c.email;
    let service = "Not Selected";
    if(c.email.includes("|")){
      let parts = c.email.split("|");
      contact = parts[0].trim();
      if(parts[1]) service = parts[1].replace("Service:","").trim();
    }
    return `<tr><td>${c.id}</td><td>${c.name}</td><td>${contact}</td><td style="background:#fff9c4;font-weight:bold;color:#0a1931">${service}</td><td>${c.message}</td><td style="font-size:12px">${c.date_added}</td></tr>`;
  }).join('');
  res.send(`<body style="font-family:Arial;padding:20px;background:#f5f7fa">
  <h2>Admin - ${contacts.length} Messages</h2>
  <p><a href="/">View Website</a> | <a href="/">Logout</a></p><br>
  <table border=1 cellpadding=10 style="border-collapse:collapse;width:100%;background:white">
  <tr style="background:#0a1931;color:#ffcc00"><th>ID</th><th>Name</th><th>Contact</th><th>Service</th><th>Message</th><th>Date</th></tr>
  ${rows}</table></body>`);
 });
});

app.post('/contacts',(req,res)=>{
 const {name,email,message}=req.body;
 safeQuery("INSERT INTO contacts (name,email,message) VALUES (?,?,?)",[name,email,message],(err)=>{ if(err) return res.json({error:err.message}); res.json({success:true}); });
});

const PORT=process.env.PORT||10000;
app.listen(PORT,'0.0.0.0',()=>console.log(PORT));