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
  return res.send(`<html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{font-family:Arial;background:#0a1931;display:flex;justify-content:center;align-items:center;height:100vh;margin:0}.box{background:white;padding:30px;border-radius:15px;max-width:400px;width:90%;text-align:center}input{width:100%;padding:12px;margin:10px 0;border-radius:8px;border:1px solid #ccc}button{background:#0a1931;color:#ffcc00;padding:12px;width:100%;border:none;border-radius:8px;font-weight:bold}</style></head><body><div class="box"><h2>🔐 Admin Login</h2><input id="p" type="password" placeholder="Password"><button onclick="login()">Login</button><br><br><a href="/">Back</a></div><script>function login(){ location.href='/view-db?key='+document.getElementById('p').value; }</script></body></html>`);
}

const site = `<!DOCTYPE html><html><head><title>Pinnacle Security Limited</title><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
html{scroll-behavior:smooth}*{margin:0;padding:0;box-sizing:border-box}body{font-family:Arial;background:#f5f7fa}
.nav{background:#0a1931;padding:15px 20px;display:flex;justify-content:space-between;align-items:center;position:fixed;top:0;width:100%;z-index:1000}
.nav h1{color:#ffcc00;font-size:16px}.menu{display:flex;gap:15px;align-items:center}.menu a{color:white;text-decoration:none;font-weight:bold;font-size:13px}
.drop{position:relative}.drop-menu{display:none;position:absolute;top:100%;left:0;background:white;min-width:200px;border-radius:8px;box-shadow:0 5px 15px rgba(0,0,0,0.3)}.drop:hover.drop-menu{display:block}.drop-menu a{color:#0a1931!important;padding:12px;display:block}
.hero{margin-top:60px;background:#0a1931;color:white;padding:90px 20px;text-align:center}.hero h2{font-size:38px;color:#ffcc00}.btn{background:#ffcc00;color:#0a1931;padding:12px 25px;border-radius:25px;text-decoration:none;font-weight:bold;display:inline-block;margin:10px}
.section{padding:50px 20px;max-width:1100px;margin:auto}.section h2{text-align:center;color:#0a1931}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;margin-top:25px}
.card{background:white;padding:22px;border-radius:12px;box-shadow:0 3px 10px rgba(0,0,0,0.08);border-left:4px solid #ffcc00}
.contact{background:#0a1931;color:white;padding:35px;border-radius:15px;display:grid;grid-template-columns:1fr 1fr;gap:25px}
@media(max-width:700px){.contact{grid-template-columns:1fr}.nav{flex-wrap:wrap}.menu{width:100%;justify-content:center;margin-top:8px}}
input,textarea,select{width:100%;padding:12px;margin:6px 0;border-radius:8px;border:1px solid #ccc}
.footer{background:#050e1f;color:#999;padding:25px;text-align:center}
.join-form{background:white;padding:25px;border-radius:15px;box-shadow:0 5px 15px rgba(0,0,0,0.1)}
.join-form h3{color:#0a1931;text-align:center;margin-bottom:15px}
.row{display:grid;grid-template-columns:1fr 1fr;gap:10px}
</style></head><body>

<div class="nav">
<h1>🔐 PINNACLE SECURITY LTD</h1>
<div class="menu">
<a href="/">Home</a>
<a href="#about">About</a>
<div class="drop"><a href="#services">Services ▼</a><div class="drop-menu"><a href="#services">Security Guard Service</a><a href="#services">Construction Security</a><a href="#services">CCTV & Alarms</a><a href="#services">VIP Protection</a></div></div>
<a href="#contact">Contact</a>
<a href="#join" style="background:#ffcc00;color:#0a1931;padding:6px 14px;border-radius:20px">Join Us</a>
</div>
</div>

<div class="hero">
<h2>Pinnacle Security Limited</h2>
<p>442/443 Kironde Rd, Kampala | 0754 139726 | 4.3★ 11 Reviews</p>
<br><a class="btn" href="#contact">Get Guard Now</a><a class="btn" href="#join" style="background:white">Join Our Team</a>
</div>

<div class="section" id="about">
<h2>About Us</h2>
<div class="grid">
<div class="card"><h3>Who We Are</h3><p><b>Pinnacle Security Limited</b> located at 442/443 Kironde Rd, Kampala. Security Guard Service & Construction.</p></div>
<div class="card"><h3>Working Hours</h3><p>Mon 8-4, Tue 8:30-4, Wed-Thu 8-4, Fri 24H, Sat 10-2:30, Sun Closed</p></div>
<div class="card"><h3>Contact</h3><p>📍 442/443 Kironde Rd, Kampala<br>📞 0754 139726<br>✉️ info@pinnaclegroup.co.ug</p></div>
</div>
</div>

<div class="section" id="services" style="background:white">
<h2>Our Services</h2>
<div class="grid">
<div class="card"><h3>🛡️ Security Guard Service</h3><p>Licensed guards</p></div>
<div class="card"><h3>🏗️ Construction</h3><p>Site security</p></div>
<div class="card"><h3>📹 CCTV</h3><p>Installation</p></div>
<div class="card"><h3>👤 VIP Protection</h3><p>Escort & event</p></div>
</div>
</div>

<div class="section" id="contact">
<h2>Contact Us</h2>
<div class="contact">
<div><h3 style="color:#ffcc00">Head Office</h3><br><p>442/443 Kironde Rd, Kampala</p><p>Branch: Kotido</p><br><p>📞 0754 139726</p><p>✉️ info@pinnaclegroup.co.ug</p></div>
<div style="background:white;padding:20px;border-radius:10px">
<h3 style="color:#0a1931">Client Request</h3>
<input id="n" placeholder="Your Name"><input id="e" placeholder="Phone / Email">
<select id="s"><option>Select Service</option><option>Security Guard Service</option><option>Construction Security</option><option>CCTV Installation</option><option>VIP Protection</option></select>
<textarea id="m" rows="3" placeholder="Message"></textarea>
<button onclick="sendMsg()" style="background:#0a1931;color:#ffcc00">Send Request</button>
<p id="ok" style="display:none;color:green;margin-top:10px">✅ Sent!</p>
</div>
</div>
</div>

<div class="section" id="join" style="background:#eef2f7">
<h2>Join Pinnacle Security Team</h2>
<p style="text-align:center;margin-bottom:25px">Are you interested in joining as a Security Guard? Fill this form.</p>
<div class="join-form" style="max-width:700px;margin:auto">
<h3>Job Application Form</h3>
<div class="row"><input id="fname" placeholder="First Name*"><input id="lname" placeholder="Last Name*"></div>
<div class="row"><select id="gender"><option value="">Select Gender*</option><option>Male</option><option>Female</option></select><input id="dob" type="date"></div>
<div class="row"><input id="district" placeholder="District* - e.g. Kotido"><input id="phone" placeholder="Phone Number*"></div>
<select id="edu"><option value="">Education Level*</option><option>Primary</option><option>Secondary (S4)</option><option>Advanced (S6)</option><option>Certificate</option><option>Diploma</option><option>Degree</option><option>Masters</option></select>
<textarea id="exp" rows="3" placeholder="Experience / Why you want to join?"></textarea>
<button onclick="sendJoin()" style="background:#0a1931;color:#ffcc00">Submit Application</button>
<p id="ok2" style="display:none;color:green;margin-top:10px;font-weight:bold;text-align:center">✅ Application Sent! We will call you.</p>
</div>
</div>

<div class="footer"><p>© 2026 Pinnacle Security Limited | 442/443 Kironde Rd, Kampala</p></div>

<script>
async function sendMsg(){
 let n=document.getElementById('n').value,e=document.getElementById('e').value,s=document.getElementById('s').value,m=document.getElementById('m').value;
 if(!n||!e||!m) return alert('Fill all');
 let c = e + ' | Service: ' + s;
 let r=await fetch('/contacts',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:n,email:c,message:m})});
 let d=await r.json(); if(d.success) document.getElementById('ok').style.display='block';
}
async function sendJoin(){
 let fname=document.getElementById('fname').value, lname=document.getElementById('lname').value, gender=document.getElementById('gender').value,
     dob=document.getElementById('dob').value, district=document.getElementById('district').value, phone=document.getElementById('phone').value,
     edu=document.getElementById('edu').value, exp=document.getElementById('exp').value;
 if(!fname||!lname||!gender||!district||!phone||!edu) return alert('Please fill all * fields');
 let r=await fetch('/join',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({fname,lname,gender,dob,district,phone,edu,exp})});
 let d=await r.json(); if(d.success) document.getElementById('ok2').style.display='block';
}
</script></body></html>`;

app.get('/',(req,res)=>res.send(site));

// Create join table if not exists
safeQuery("CREATE TABLE IF NOT EXISTS joiners (id INT AUTO_INCREMENT PRIMARY KEY, fname VARCHAR(255), lname VARCHAR(255), gender VARCHAR(20), dob VARCHAR(50), district VARCHAR(100), phone VARCHAR(100), edu VARCHAR(100), exp TEXT, date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",[],()=>{});

app.get('/view-db',checkAdmin,(req,res)=>{
 safeQuery("SELECT * FROM contacts ORDER BY id DESC",[],(err,contacts)=>{
  safeQuery("SELECT * FROM joiners ORDER BY id DESC",[],(err2,joiners)=>{
   if(err) return res.send("DB Error "+err.message);
   let rows=contacts.map(c=>{
     let contact=c.email; let service="Not Selected";
     if(c.email.includes("|")){ let p=c.email.split("|"); contact=p[0].trim(); if(p[1]) service=p[1].replace("Service:","").trim(); }
     return `<tr><td>${c.id}</td><td>${c.name}</td><td>${contact}</td><td style="background:#fff9c4"><b>${service}</b></td><td>${c.message}</td><td>${c.date_added}</td></tr>`;
   }).join('');
   let jrows=(joiners||[]).map(j=>`<tr><td>${j.id}</td><td>${j.fname} ${j.lname}</td><td>${j.gender}</td><td>${j.dob}</td><td>${j.district}</td><td>${j.phone}</td><td>${j.edu}</td><td>${j.exp}</td><td>${j.date_added}</td></tr>`).join('');
   res.send(`<body style="font-family:Arial;padding:20px;background:#f5f7fa">
   <h2>Admin Panel</h2>
   <div style="margin:15px 0"><a href="#clients" style="background:#0a1931;color:#ffcc00;padding:10px 15px;text-decoration:none;border-radius:5px">Client Requests (${contacts.length})</a>
   <a href="#joiners" style="background:#ffcc00;color:#0a1931;padding:10px 15px;text-decoration:none;border-radius:5px;margin-left:10px">Job Applications (${(joiners||[]).length})</a>
   <a href="/" style="float:right">Website</a></div>

   <h3 id="clients">📩 Client Requests - ${contacts.length}</h3>
   <table border=1 cellpadding=8 style="border-collapse:collapse;width:100%;background:white;margin-bottom:30px"><tr style="background:#0a1931;color:#ffcc00"><th>ID</th><th>Name</th><th>Contact</th><th>Service</th><th>Message</th><th>Date</th></tr>${rows}</table>

   <h3 id="joiners">👥 Job Applications - ${(joiners||[]).length}</h3>
   <table border=1 cellpadding=8 style="border-collapse:collapse;width:100%;background:white"><tr style="background:#0a1931;color:#ffcc00"><th>ID</th><th>Full Name</th><th>Gender</th><th>DOB</th><th>District</th><th>Phone</th><th>Education</th><th>Experience</th><th>Date</th></tr>${jrows}</table>
   </body>`);
  });
 });
});

app.post('/contacts',(req,res)=>{
 const {name,email,message}=req.body;
 safeQuery("INSERT INTO contacts (name,email,message) VALUES (?,?,?)",[name,email,message],(err)=>{ if(err) return res.json({error:err.message}); res.json({success:true}); });
});

app.post('/join',(req,res)=>{
 const {fname,lname,gender,dob,district,phone,edu,exp}=req.body;
 safeQuery("INSERT INTO joiners (fname,lname,gender,dob,district,phone,edu,exp) VALUES (?,?,?,?,?,?,?,?)",[fname,lname,gender,dob,district,phone,edu,exp],(err)=>{ if(err) return res.json({error:err.message}); res.json({success:true}); });
});

const PORT=process.env.PORT||10000;
app.listen(PORT,'0.0.0.0',()=>console.log(PORT));