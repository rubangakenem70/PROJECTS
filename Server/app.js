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
  return res.send(`<html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{font-family:'Poppins',sans-serif;background:#0a192f;display:flex;justify-content:center;align-items:center;height:100vh;margin:0}.box{background:white;padding:30px;border-radius:24px;max-width:400px;width:90%;text-align:center}input{width:100%;padding:16px;margin:10px 0;border-radius:14px;border:2px solid #e2e8f0}button{background:#0a192f;color:#ffcc00;padding:16px;width:100%;border:none;border-radius:14px;font-weight:700;cursor:pointer}</style></head><body><div class="box"><h2>🔐 Admin Login</h2><input id="p" type="password" placeholder="Password"><button onclick="login()">Login</button><br><br><a href="/">Back</a></div><script>function login(){ location.href='/view-db?key='+document.getElementById('p').value; }</script></body></html>`);
}

const site = `<!DOCTYPE html><html><head><title>Pinnacle Security Limited</title><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap');
*{margin:0;padding:0;box-sizing:border-box;font-family:'Poppins',sans-serif;scroll-behavior:smooth;}
body{background:#f8fafc;color:#0f172a;}
.navbar{position:fixed;top:0;left:0;right:0;display:flex;justify-content:space-between;align-items:center;padding:16px 6%;background:rgba(10,25,47,0.97);z-index:999;box-shadow:0 4px 30px rgba(0,0,0,0.2);}
.logo{font-weight:800;color:#ffcc00;font-size:18px;}
.nav-links{display:flex;list-style:none;gap:22px;align-items:center;}
.nav-links a{color:#e2e8f0;text-decoration:none;font-size:14px;font-weight:500;transition:0.3s;}
.nav-links a:hover{color:#ffcc00;}
.btn-nav{background:#ffcc00;color:#0a192f!important;padding:9px 22px;border-radius:50px;font-weight:700!important;}
.dropdown{position:relative;}
.dropdown-menu{position:absolute;top:110%;left:0;background:#0a192f;list-style:none;min-width:260px;padding:12px 0;border-radius:14px;box-shadow:0 10px 40px rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.1);opacity:0;visibility:hidden;transform:translateY(10px);transition:0.3s;z-index:1000;}
.dropdown:hover .dropdown-menu{opacity:1;visibility:visible;transform:translateY(0);}
.dropdown-menu a{display:block;padding:12px 22px;color:#cbd5e1!important;font-size:14px;}
.hero{min-height:90vh;padding:140px 8% 80px;background:linear-gradient(105deg, #0a192f 90%, rgba(10,25,47,0.7)), url('https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1400');background-size:cover;background-position:center;display:flex;align-items:center;}
.hero-text{max-width:650px;}.hero-text h1{font-size:52px;color:white;line-height:1.1;font-weight:800;margin-bottom:18px;}.hero-text p{color:#cbd5e1;font-size:18px;margin-bottom:32px;}
.btn-main{background:#ffcc00;color:#0a192f;padding:14px 32px;border:none;border-radius:50px;font-weight:700;cursor:pointer;text-decoration:none;display:inline-block;transition:0.3s;box-shadow:0 8px 20px rgba(255,204,0,0.3);}
.btn-main:hover{transform:translateY(-3px);}
.btn-main-dark{background:#0a192f;color:#ffcc00;padding:16px;width:100%;border:none;border-radius:14px;font-weight:700;cursor:pointer;transition:0.3s;box-shadow:0 8px 20px rgba(0,0,0,0.15);font-size:16px;margin-top:12px;}
.btn-main-dark:hover{transform:translateY(-2px);background:#112240;}
.section{padding:90px 8%;}.section h2{font-size:36px;font-weight:800;text-align:center;margin-bottom:12px;}.section.dark{background:#0a192f;color:white;}
.about-grid,.service-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;margin-top:45px;}
.card{background:white;border-radius:20px;padding:30px;box-shadow:0 10px 40px rgba(0,0,0,0.06);text-align:center;transition:0.4s;}.card:hover{transform:translateY(-8px);}
.card i{font-size:32px;color:#0a192f;background:#ffcc00;width:70px;height:70px;display:flex;align-items:center;justify-content:center;border-radius:50%;margin:0 auto 18px;}
.service-box{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);padding:30px;border-radius:20px;transition:0.3s;text-align:center}.service-box:hover{border-color:#ffcc00;}
.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:50px;margin-top:40px;}
.join-wrapper{background:white;padding:35px;border-radius:24px;box-shadow:0 20px 60px rgba(0,0,0,0.1);max-width:800px;margin:40px auto 0}
.row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.join-wrapper input,.join-wrapper select,.join-wrapper textarea, #contactForm input, #contactForm select, #contactForm textarea{width:100%;padding:16px 20px;margin:8px 0;border-radius:14px;border:2px solid #e2e8f0;background:#f8fafc;font-size:14px;font-weight:500;outline:none;}
footer{text-align:center;padding:30px;background:#020c1b;color:#64748b;}
@media(max-width:768px){.hero-text h1{font-size:36px;}.contact-grid{grid-template-columns:1fr;}.row{grid-template-columns:1fr;}.nav-links{display:none;}.section{padding:60px 5%}}
</style></head><body>
<nav class="navbar"><div class="logo">🔐 PINNACLE SECURITY LTD</div><ul class="nav-links"><li><a href="/">Home</a></li><li><a href="#about">About</a></li><li class="dropdown"><a href="#services">Services ▼</a><ul class="dropdown-menu"><li><a href="#services">Security Guard Service</a></li><li><a href="#services">Construction Security</a></li><li><a href="#services">CCTV & Alarms</a></li><li><a href="#services">VIP Protection</a></li></ul></li><li><a href="#contact">Contact</a></li><li><a href="#join" class="btn-nav">Join Us</a></li></ul></nav>
<div class="hero"><div class="hero-text"><h1>Pinnacle Security Limited</h1><p>442/443 Kironde Rd, Kampala | 0754 139726 | 4.3★ 11 Reviews</p><a href="#contact" class="btn-main">Get Guard Now</a><a href="#join" class="btn-main" style="background:white;margin-left:10px">Join Our Team</a></div></div>
<div class="section" id="about"><h2>About Us</h2><div class="about-grid"><div class="card"><i class="fa-solid fa-shield-halved"></i><h3>Who We Are</h3><p>Pinnacle Security Limited at Kironde Rd, Kampala</p></div><div class="card"><i class="fa-solid fa-clock"></i><h3>Working Hours</h3><p>Mon 8-4, Tue 8:30-4, Fri 24H, Sat 10-2:30</p></div><div class="card"><i class="fa-solid fa-location-dot"></i><h3>Contact Info</h3><p>📍 442/443 Kironde Rd<br>📞 0754 139726</p></div></div></div>
<div class="section dark" id="services"><h2>Our Services</h2><div class="service-grid"><div class="service-box"><h3>🛡️ Guard Service</h3><p>Licensed guards</p></div><div class="service-box"><h3>🏗️ Construction</h3><p>Site security</p></div><div class="service-box"><h3>📹 CCTV</h3><p>Installation</p></div><div class="service-box"><h3>👤 VIP Protection</h3><p>Escort</p></div></div></div>
<div class="section" id="contact"><h2>Contact Us</h2><div class="contact-grid"><div><h3>Head Office</h3><br><p>442/443 Kironde Rd, Kampala<br>Branch: Kotido</p><br><p><b>Phone:</b> 0754 139726</p></div><div id="contactForm" style="background:white;padding:28px;border-radius:20px;box-shadow:0 10px 40px rgba(0,0,0,0.06)"><h3 style="text-align:center;margin-bottom:15px">Client Request</h3><input id="n" placeholder="Your Name"><input id="e" placeholder="Phone / Email"><select id="s"><option>Select Service</option><option>Security Guard Service</option><option>Construction Security</option><option>CCTV Installation</option><option>VIP Protection</option></select><textarea id="m" rows="4" placeholder="Message"></textarea><button class="btn-main-dark" onclick="sendMsg()">Send Request →</button><p id="ok" style="display:none;color:green;margin-top:12px;text-align:center;font-weight:700">✅ Sent!</p></div></div></div>
<div class="section" id="join" style="background:#f1f5f9"><h2>Join Pinnacle Team</h2><div class="join-wrapper"><h3 style="text-align:center;margin-bottom:20px;font-weight:800">Job Application Form</h3><div class="row"><input id="fname" placeholder="First Name*"><input id="lname" placeholder="Last Name*"></div><div class="row"><select id="gender"><option value="">Gender*</option><option>Male</option><option>Female</option></select><input id="dob" type="date"></div><div class="row"><input id="district" placeholder="District*"><input id="phone" placeholder="Phone*"></div><select id="edu"><option value="">Education Level*</option><option>Primary</option><option>Secondary (S4)</option><option>Advanced (S6)</option><option>Certificate</option><option>Diploma</option><option>Degree</option><option>Masters</option></select><textarea id="exp" rows="4" placeholder="Experience"></textarea><button class="btn-main-dark" onclick="sendJoin()">Submit Application →</button><p id="ok2" style="display:none;color:green;margin-top:12px;text-align:center;font-weight:700">✅ Application Sent!</p></div></div>
<footer><p>© 2026 Pinnacle Security Limited</p></footer>
<script>
async function sendMsg(){let n=document.getElementById('n').value,e=document.getElementById('e').value,s=document.getElementById('s').value,m=document.getElementById('m').value;if(!n||!e||!m)return alert('Fill all');let c=e+' | Service: '+s;let r=await fetch('/contacts',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:n,email:c,message:m})});let d=await r.json();if(d.success)document.getElementById('ok').style.display='block';}
async function sendJoin(){let fname=document.getElementById('fname').value,lname=document.getElementById('lname').value,gender=document.getElementById('gender').value,dob=document.getElementById('dob').value,district=document.getElementById('district').value,phone=document.getElementById('phone').value,edu=document.getElementById('edu').value,exp=document.getElementById('exp').value;if(!fname||!lname||!gender||!district||!phone||!edu)return alert('Fill all *');let r=await fetch('/join',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({fname,lname,gender,dob,district,phone,edu,exp})});let d=await r.json();if(d.success)document.getElementById('ok2').style.display='block';}
</script></body></html>`;

app.get('/',(req,res)=>res.send(site));
safeQuery("CREATE TABLE IF NOT EXISTS joiners (id INT AUTO_INCREMENT PRIMARY KEY, fname VARCHAR(255), lname VARCHAR(255), gender VARCHAR(20), dob VARCHAR(50), district VARCHAR(100), phone VARCHAR(100), edu VARCHAR(100), exp TEXT, date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",[],()=>{});

app.get('/view-db',checkAdmin,(req,res)=>{
 safeQuery("SELECT * FROM contacts ORDER BY id DESC",[],(err,contacts)=>{
  safeQuery("SELECT * FROM joiners ORDER BY id DESC",[],(err2,joiners)=>{
   if(err) return res.send("DB Error "+err.message);
   function formatDate(d){
     if(!d) return "";
     let date = new Date(d);
     let day = String(date.getDate()).padStart(2,'0');
     let month = String(date.getMonth()+1).padStart(2,'0');
     let year = date.getFullYear();
     let hours = String(date.getHours()).padStart(2,'0');
     let mins = String(date.getMinutes()).padStart(2,'0');
     return `${year}-${month}-${day} ${hours}:${mins}`;
   }
   let rows=contacts.map(c=>{
     let contact=c.email; let service="Not Selected";
     if(c.email.includes("|")){ let p=c.email.split("|"); contact=p[0].trim(); if(p[1]) service=p[1].replace("Service:","").trim(); }
     return `<tr><td>${c.id}</td><td>${c.name}</td><td>${contact}</td><td>${service}</td><td>${c.message}</td><td>${formatDate(c.date_added)}</td></tr>`;
   }).join('');
   let jrows=(joiners||[]).map(j=>`<tr><td>${j.id}</td><td>${j.fname} ${j.lname}</td><td>${j.gender}</td><td>${j.dob}</td><td>${j.district}</td><td>${j.phone}</td><td>${j.edu}</td><td>${j.exp}</td><td>${formatDate(j.date_added)}</td></tr>`).join('');

   res.send(`<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>
   @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
   body{font-family:'Poppins',sans-serif;padding:20px;background:#f8fafc}
   .search-box{display:flex;gap:10px;margin:12px 0 20px;flex-wrap:wrap}
   .search-box input,.search-box select{padding:12px 16px;border-radius:12px;border:2px solid #e2e8f0;min-width:180px;font-size:13px}
   .search-box input:focus,.search-box select:focus{border-color:#0a192f;outline:none}
   table{width:100%;border-collapse:collapse;background:white;margin-bottom:40px;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.05)}
   th{background:#0a192f;color:#ffcc00;padding:12px 8px;font-size:11px;text-align:left}
   td{padding:10px 8px;border-bottom:1px solid #f1f5f9;font-size:13px}
   tr:hover{background:#f8fafc}
   .badge{padding:10px 15px;border-radius:10px;text-decoration:none;font-weight:700;display:inline-block;font-size:13px}
   </style></head><body>
   <h2>🔐 Admin Panel</h2>
   <div style="margin:15px 0">
   <a href="#clients" class="badge" style="background:#0a192f;color:#ffcc00">Client Requests (${contacts.length})</a>
   <a href="#joiners" class="badge" style="background:#ffcc00;color:#0a192f;margin-left:10px">Job Applications (${(joiners||[]).length})</a>
   <a href="/" style="float:right;color:#0a192f;font-weight:bold;text-decoration:none">← Website</a>
   </div>

   <h3 id="clients">📩 Client Requests - ${contacts.length}</h3>
   <div class="search-box">
     <input type="text" id="searchClient" onkeyup="filterClients()" placeholder="🔍 Search Name, Contact, Service...">
   </div>
   <table id="clientTable"><tr><th>ID</th><th>Name</th><th>Contact</th><th>Service</th><th>Message</th><th>Date & Time (24h)</th></tr>${rows}</table>

   <h3 id="joiners">👥 Job Applications - ${(joiners||[]).length}</h3>
   <div class="search-box">
     <input type="text" id="searchDistrict" onkeyup="filterJoiners()" placeholder="🔍 District e.g. GULU">
     <select id="filterGender" onchange="filterJoiners()"><option value="">All Gender</option><option>Male</option><option>Female</option></select>
     <select id="filterEdu" onchange="filterJoiners()"><option value="">All Education</option><option>Primary</option><option>Secondary (S4)</option><option>Advanced (S6)</option><option>Certificate</option><option>Diploma</option><option>Degree</option><option>Masters</option></select>
     <input type="text" id="searchJoinerName" onkeyup="filterJoiners()" placeholder="🔍 Name or Phone...">
   </div>
   <table id="joinerTable"><tr><th>ID</th><th>Full Name</th><th>Gender</th><th>DOB</th><th>District</th><th>Phone</th><th>Education</th><th>Experience</th><th>Date & Time (24h)</th></tr>${jrows}</table>

   <script>
   function filterClients(){
     let input = document.getElementById('searchClient').value.toLowerCase();
     let rows = document.querySelectorAll('#clientTable tr');
     for(let i=1;i<rows.length;i++){
       let text = rows[i].innerText.toLowerCase();
       rows[i].style.display = text.includes(input) ? '' : 'none';
     }
   }
   function filterJoiners(){
     let district = document.getElementById('searchDistrict').value.toLowerCase();
     let gender = document.getElementById('filterGender').value.toLowerCase();
     let edu = document.getElementById('filterEdu').value.toLowerCase();
     let name = document.getElementById('searchJoinerName').value.toLowerCase();
     let rows = document.querySelectorAll('#joinerTable tr');
     for(let i=1;i<rows.length;i++){
       let rowText = rows[i].innerText.toLowerCase();
       let okDistrict = district=='' || rowText.includes(district);
       let okGender = gender=='' || rowText.includes(gender);
       let okEdu = edu=='' || rowText.includes(edu);
       let okName = name=='' || rowText.includes(name);
       rows[i].style.display = (okDistrict && okGender && okEdu && okName) ? '' : 'none';
     }
   }
   </script>
   </body></html>`);
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