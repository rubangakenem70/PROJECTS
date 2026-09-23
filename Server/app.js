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

const site = `<!DOCTYPE html><html><head><title>Pinnacle Security Limited - Professional Security in Uganda</title><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
*{margin:0;padding:0;box-sizing:border-box;font-family:'Poppins',sans-serif;scroll-behavior:smooth;}
body{background:#f8fafc;color:#0f172a;line-height:1.6}
.navbar{position:fixed;top:0;left:0;right:0;display:flex;justify-content:space-between;align-items:center;padding:16px 6%;background:rgba(10,25,47,0.98);z-index:999;box-shadow:0 4px 30px rgba(0,0,0,0.2);}
.logo{font-weight:800;color:#ffcc00;font-size:18px;}
.nav-links{display:flex;list-style:none;gap:22px;align-items:center;}
.nav-links a{color:#e2e8f0;text-decoration:none;font-size:14px;font-weight:500;transition:0.3s;}
.nav-links a:hover{color:#ffcc00;}
.btn-nav{background:#ffcc00;color:#0a192f!important;padding:9px 22px;border-radius:50px;font-weight:700!important;}
.dropdown{position:relative;}
.dropdown-menu{position:absolute;top:110%;left:0;background:#0a192f;list-style:none;min-width:260px;padding:12px 0;border-radius:14px;box-shadow:0 10px 40px rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.1);opacity:0;visibility:hidden;transform:translateY(10px);transition:0.3s;z-index:1000;}
.dropdown:hover .dropdown-menu{opacity:1;visibility:visible;transform:translateY(0);}
.dropdown-menu a{display:block;padding:12px 22px;color:#cbd5e1!important;font-size:14px;}
.hero{min-height:100vh;padding:140px 8% 80px;background:linear-gradient(105deg, #0a192f 65%, rgba(10,25,47,0.3)), url('https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1400');background-size:cover;background-position:center;display:flex;align-items:center;}
.hero-text{max-width:680px;}.hero-text h1{font-size:52px;color:white;line-height:1.1;font-weight:800;margin-bottom:18px;}.hero-text h1 span{color:#ffcc00}.hero-text p{color:#cbd5e1;font-size:17px;margin-bottom:12px;}
.btn-main{background:#ffcc00;color:#0a192f;padding:14px 32px;border:none;border-radius:50px;font-weight:700;cursor:pointer;text-decoration:none;display:inline-block;transition:0.3s;box-shadow:0 8px 20px rgba(255,204,0,0.3);}
.btn-main:hover{transform:translateY(-3px);}
.btn-main-dark{background:#0a192f;color:#ffcc00;padding:16px;width:100%;border:none;border-radius:14px;font-weight:700;cursor:pointer;transition:0.3s;box-shadow:0 8px 20px rgba(0,0,0,0.15);font-size:16px;margin-top:12px;}
.section{padding:90px 8%;}.section h2{font-size:36px;font-weight:800;text-align:center;margin-bottom:12px;}.section .sub{text-align:center;color:#64748b;max-width:700px;margin:0 auto 20px}
.section.dark{background:#0a192f;color:white;}
.about-grid,.service-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px;margin-top:45px;}
.card{background:white;border-radius:20px;padding:30px;box-shadow:0 10px 40px rgba(0,0,0,0.06);transition:0.4s;}.card:hover{transform:translateY(-8px);}
.card i{font-size:28px;color:#0a192f;background:#ffcc00;width:65px;height:65px;display:flex;align-items:center;justify-content:center;border-radius:50%;margin:0 0 18px;}
.service-box{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);padding:30px;border-radius:20px;transition:0.3s;text-align:left}.service-box:hover{border-color:#ffcc00;transform:translateY(-5px)}
.gallery{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px;margin-top:40px}
.gallery img{width:100%;height:220px;object-fit:cover;border-radius:16px;box-shadow:0 8px 20px rgba(0,0,0,0.1);transition:0.3s}
.gallery img:hover{transform:scale(1.03)}
.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:50px;margin-top:40px;}
.join-wrapper{background:white;padding:35px;border-radius:24px;box-shadow:0 20px 60px rgba(0,0,0,0.1);max-width:800px;margin:40px auto 0}
.row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.join-wrapper input,.join-wrapper select,.join-wrapper textarea, #contactForm input, #contactForm select, #contactForm textarea{width:100%;padding:16px 20px;margin:8px 0;border-radius:14px;border:2px solid #e2e8f0;background:#f8fafc;font-size:14px;font-weight:500;outline:none;}
footer{text-align:center;padding:30px;background:#020c1b;color:#64748b;}
@media(max-width:768px){.hero-text h1{font-size:34px;}.contact-grid{grid-template-columns:1fr;}.row{grid-template-columns:1fr;}.nav-links{display:none;}.section{padding:60px 5%}}
</style></head><body>
<nav class="navbar"><div class="logo">🔐 PINNACLE SECURITY LTD</div>
<ul class="nav-links"><li><a href="/">Home</a></li><li><a href="#about">About</a></li>
<li class="dropdown"><a href="#services">Services ▼</a>
<ul class="dropdown-menu"><li><a href="#services">Guard Service</a></li><li><a href="#services">Construction Security</a></li><li><a href="#services">CCTV & Alarms</a></li><li><a href="#services">VIP Protection</a></li></ul></li>
<li><a href="#training">Training</a></li><li><a href="#contact">Contact</a></li><li><a href="#join" class="btn-nav">Join Us</a></li></ul></nav>

<div class="hero" id="home">
<div class="hero-text">
<h1>Protecting What Matters <span>Most</span></h1>
<p><b>Pinnacle Security Limited</b> is Uganda's trusted security company located at <b>442/443 Kironde Road, Kampala</b> with branch in Kotido, Karamoja.</p>
<p>We provide licensed, disciplined and well-trained security guards for homes, businesses, construction sites, schools and events. With 4.3★ rating from 11+ clients, we operate 24 hours especially on Friday and have mobile patrol teams.</p>
<p style="color:#ffcc00;font-weight:600">📞 0754 139726 | ✉️ info@pinnaclegroup.co.ug | ISIC: 8010</p>
<br>
<a href="#contact" class="btn-main">Get Guard Now</a>
<a href="#join" class="btn-main" style="background:white;margin-left:10px">Join Our Team</a>
</div>
</div>

<div class="section" id="about">
<h2>About Pinnacle Security Limited</h2>
<p class="sub">Licensed under ISIC 8010 - Private Security Activities. We are committed to professionalism, integrity and quick response.</p>
<div class="about-grid">
<div class="card"><i class="fa-solid fa-shield-halved"></i><h3>Who We Are</h3><p>Pinnacle Security Limited started to provide affordable yet professional security in Uganda. We are located at 442/443 Kironde Rd, Kampala and serve all regions including Karamoja, Gulu, Pader, Kotido. We have trained guards with valid certificates.</p></div>
<div class="card"><i class="fa-solid fa-bullseye"></i><h3>Our Mission</h3><p>To deliver reliable security solutions through trained manpower, modern technology (CCTV, Alarms, GPS tracking) and 24/7 control room monitoring. Customer safety is our priority.</p></div>
<div class="card"><i class="fa-solid fa-clock"></i><h3>Working Hours & Facility</h3><p><b>Mon:</b> 8AM-4PM<br><b>Tue:</b> 8:30AM-4PM<br><b>Wed-Thu:</b> 8AM-4PM<br><b>Fri:</b> Open 24 Hours<br><b>Sat:</b> 10AM-2:30PM<br>♿ Wheelchair accessible parking: Yes</p></div>
</div>
</div>

<div class="section dark" id="services">
<h2>Our Professional Services</h2>
<p class="sub" style="color:#94a3b8">We tailor security to your needs - from single guard to full site coverage</p>
<div class="service-grid">
<div class="service-box"><h3 style="color:#ffcc00">🛡️ Security Guard Service</h3><p>We deploy uniformed, vetted and licensed guards for residential, commercial, banks, hotels, schools and factories. Our guards are trained in access control, patrol, report writing and emergency response.</p><br><small>✔ Day & Night Shifts | ✔ Armed/Unarmed | ✔ Supervisor Visits</small></div>
<div class="service-box"><h3 style="color:#ffcc00">🏗️ Construction Site Security</h3><p>Construction sites lose materials at night. We provide 24hr site security, material checkpoint, worker ID verification and theft prevention. Trusted by contractors in Kampala and upcountry.</p><br><small>✔ Material Control | ✔ Night Patrol | ✔ Safety Compliance</small></div>
<div class="service-box"><h3 style="color:#ffcc00">📹 CCTV, Alarms & Access</h3><p>We sell and install HD CCTV cameras, alarm systems, electric fences and biometric access. View your property from your phone anywhere in Uganda. Includes maintenance.</p><br><small>✔ HD Night Vision | ✔ Phone Viewing | ✔ Installation</small></div>
<div class="service-box"><h3 style="color:#ffcc00">👤 VIP & Event Protection</h3><p>Professional close protection officers for VIPs, executives, musicians and private events. Our officers are discreet, well-dressed and trained in crowd control and risk assessment.</p><br><small>✔ VIP Escort | ✔ Event Security | ✔ Risk Assessment</small></div>
</div>
</div>

<div class="section" id="training">
<h2>Security Officer Training Gallery</h2>
<p class="sub">Our guards undergo 4 weeks intensive training: Parade, Self-defense, First Aid, Fire Safety, Customer Care and Report Writing at our training ground.</p>
<div class="gallery">
<img src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600" alt="Security Training">
<img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600" alt="Security Parade">
<img src="https://images.unsplash.com/photo-1580894906475-0cb46000d6fb?w=600" alt="Guard Training">
<img src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600" alt="Security Officer">
<img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600" alt="Team Training">
<img src="https://images.unsplash.com/photo-1604004555489-723a93d6ce74?w=600" alt="Security Drill">
</div>
<p style="text-align:center;margin-top:25px;font-weight:600;color:#0a192f">We train discipline, respect and integrity - The Pinnacle Way.</p>
</div>

<div class="section" id="contact">
<h2>Contact Us Today</h2>
<p class="sub">Need guards urgently? Contact our control room 24hrs</p>
<div class="contact-grid">
<div>
<h3 style="color:#0a192f">📍 Head Office</h3><br>
<p>442/443 Kironde Road, Off Ntinda-Kiwatule Road<br>Kampala, Uganda</p><br>
<p><b>Branch Office:</b> Kotido District, Karamoja Sub-region</p><br>
<p>📞 <b>Phone:</b> 0754 139726<br>✉️ <b>Email:</b> info@pinnaclegroup.co.ug<br>🕒 <b>Control Room:</b> 24 Hours</p><br>
<p><b>Google Rating:</b> 4.3★ (11 Reviews)<br><b>ISIC Code:</b> 8010</p>
</div>
<div id="contactForm" style="background:white;padding:28px;border-radius:20px;box-shadow:0 10px 40px rgba(0,0,0,0.06)">
<h3 style="text-align:center;margin-bottom:15px">Get Free Quote</h3>
<input id="n" placeholder="Your Name">
<input id="e" placeholder="Phone / Email">
<select id="s"><option>Select Service</option><option>Security Guard Service</option><option>Construction Security</option><option>CCTV Installation</option><option>VIP Protection</option></select>
<textarea id="m" rows="4" placeholder="Tell us about your security need..."></textarea>
<button class="btn-main-dark" onclick="sendMsg()">Send Request →</button>
<p id="ok" style="display:none;color:green;margin-top:12px;text-align:center;font-weight:700">✅ Sent! We will call you soon.</p>
</div>
</div>
</div>

<div class="section" id="join" style="background:#f1f5f9">
<h2>Join Pinnacle Security Team</h2>
<p class="sub">We are recruiting guards from Kotido, Gulu, Pader, Abim, Moroto, Lira, Kampala. Age 22-45, able to read/write, disciplined.</p>
<div class="join-wrapper">
<h3 style="text-align:center;margin-bottom:20px;font-weight:800">Job Application Form</h3>
<div class="row"><input id="fname" placeholder="First Name*"><input id="lname" placeholder="Last Name*"></div>
<div class="row"><select id="gender"><option value="">Gender*</option><option>Male</option><option>Female</option></select><input id="dob" type="date"></div>
<div class="row"><input id="district" placeholder="District* e.g. Kotido"><input id="phone" placeholder="Phone*"></div>
<select id="edu"><option value="">Education Level*</option><option>Primary</option><option>Secondary (S4)</option><option>Advanced (S6)</option><option>Certificate</option><option>Diploma</option><option>Degree</option><option>Masters</option></select>
<textarea id="exp" rows="4" placeholder="Experience / Why you want to join Pinnacle?"></textarea>
<button class="btn-main-dark" onclick="sendJoin()">Submit Application →</button>
<p id="ok2" style="display:none;color:green;margin-top:12px;text-align:center;font-weight:700">✅ Application Sent! We will call you.</p>
</div>
</div>

<footer><p>© 2026 Pinnacle Security Limited | 442/443 Kironde Rd, Kampala, Uganda | 0754 139726</p></footer>

<script>
async function sendMsg(){let n=document.getElementById('n').value,e=document.getElementById('e').value,s=document.getElementById('s').value,m=document.getElementById('m').value;if(!n||!e||!m)return alert('Fill all');let c=e+' | Service: '+s;let r=await fetch('/contacts',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:n,email:c,message:m})});let d=await r.json();if(d.success)document.getElementById('ok').style.display='block';}
async function sendJoin(){let fname=document.getElementById('fname').value,lname=document.getElementById('lname').value,gender=document.getElementById('gender').value,dob=document.getElementById('dob').value,district=document.getElementById('district').value,phone=document.getElementById('phone').value,edu=document.getElementById('edu').value,exp=document.getElementById('exp').value;if(!fname||!lname||!gender||!district||!phone||!edu)return alert('Fill all *');let r=await fetch('/join',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({fname,lname,gender,dob,district,phone,edu,exp})});let d=await r.json();if(d.success)document.getElementById('ok2').style.display='block';}
</script></body></html>`;

app.get('/',(req,res)=>res.send(site));
safeQuery("CREATE TABLE IF NOT EXISTS joiners (id INT AUTO_INCREMENT PRIMARY KEY, fname VARCHAR(255), lname VARCHAR(255), gender VARCHAR(20), dob VARCHAR(50), district VARCHAR(100), phone VARCHAR(100), edu VARCHAR(100), exp TEXT, date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",[],()=>{});

// ===== CENTERED + ASC ADMIN PANEL =====
app.get('/view-db',checkAdmin,(req,res)=>{
 safeQuery("SELECT * FROM contacts ORDER BY id ASC",[],(err,contacts)=>{
  safeQuery("SELECT * FROM joiners ORDER BY id ASC",[],(err2,joiners)=>{
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
   let rows=contacts.map((c,i)=>{
     let contact=c.email; let service="Not Selected";
     if(c.email.includes("|")){ let p=c.email.split("|"); contact=p[0].trim(); if(p[1]) service=p[1].replace("Service:","").trim(); }
     return `<tr><td>${i+1}</td><td>${c.name}</td><td>${contact}</td><td>${service}</td><td>${c.message}</td><td>${formatDate(c.date_added)}</td></tr>`;
   }).join('');
   let jrows=(joiners||[]).map((j,i)=>`<tr><td>${i+1}</td><td>${j.fname} ${j.lname}</td><td>${j.gender}</td><td>${j.dob}</td><td>${j.district}</td><td>${j.phone}</td><td>${j.edu}</td><td>${j.exp}</td><td>${formatDate(j.date_added)}</td></tr>`).join('');

   res.send(`<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>Admin Panel</title>
   <style>
   @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap');
   *{margin:0;padding:0;box-sizing:border-box;font-family:'Poppins',sans-serif}
   body{background:#f8fafc;padding:20px;display:flex;justify-content:center}
   .container{width:100%;max-width:1250px;margin:0 auto}
   h2{font-size:34px;font-weight:800;text-align:center;margin:20px 0;display:flex;justify-content:center;align-items:center;gap:10px}
   .top-btns{display:flex;justify-content:center;gap:15px;margin:20px 0;flex-wrap:wrap}
   .badge{padding:14px 26px;border-radius:50px;text-decoration:none;font-weight:800;font-size:15px;display:inline-block;box-shadow:0 4px 15px rgba(0,0,0,0.1);text-align:center}
   h3{font-size:22px;font-weight:800;text-align:center;margin:40px 0 15px}
   .search-wrap{display:flex;justify-content:center;margin:10px 0 20px}
   .search-box{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;width:100%;max-width:900px}
   .search-box input,.search-box select{padding:14px 20px;border-radius:50px;border:2px solid #e2e8f0;min-width:180px;font-size:14px;text-align:center}
   .search-box input:focus{border-color:#0a192f;outline:none}
   .table-wrap{display:flex;justify-content:center;overflow-x:auto}
   table{width:100%;border-collapse:collapse;background:white;border-radius:16px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,0.08);text-align:center}
   th{background:#0a192f;color:#ffcc00;padding:14px 10px;font-size:11px;text-transform:uppercase;letter-spacing:0.5px}
   td{padding:12px 8px;border-bottom:1px solid #f1f5f9;font-size:13px}
   tr:hover{background:#f1f5f9}
   td:first-child{font-weight:800;background:#f8fafc;color:#0a192f;width:60px}
   </style></head><body>
   <div class="container">
   <h2>🔐 Admin Panel</h2>
   <div class="top-btns">
     <a href="#clients" class="badge" style="background:#0a192f;color:#ffcc00">Client Requests (${contacts.length})</a>
     <a href="#joiners" class="badge" style="background:#ffcc00;color:#0a192f">Job Applications (${(joiners||[]).length})</a>
     <a href="/" class="badge" style="background:white;color:#0a192f;border:2px solid #0a192f">← Website</a>
   </div>

   <h3 id="clients">📩 Client Requests - ${contacts.length}</h3>
   <div class="search-wrap"><div class="search-box"><input type="text" id="searchClient" onkeyup="filterClients()" placeholder="🔍 Search Name, Contact, Service"></div></div>
   <div class="table-wrap"><table id="clientTable"><tr><th>No.</th><th>Name</th><th>Contact</th><th>Service</th><th>Message</th><th>Date & Time (24h)</th></tr>${rows}</table></div>

   <h3 id="joiners">👥 Job Applications - ${contacts.length ? '' : ''}${(joiners||[]).length}</h3>
   <div class="search-wrap"><div class="search-box">
     <input type="text" id="searchDistrict" onkeyup="filterJoiners()" placeholder="🔍 District e.g. KOTIDO">
     <select id="filterGender" onchange="filterJoiners()"><option value="">All Gender</option><option>Male</option><option>Female</option></select>
     <select id="filterEdu" onchange="filterJoiners()"><option value="">All Education</option><option>Primary</option><option>Secondary (S4)</option><option>Advanced (S6)</option><option>Certificate</option><option>Diploma</option><option>Degree</option><option>Masters</option></select>
     <input type="text" id="searchJoinerName" onkeyup="filterJoiners()" placeholder="🔍 Name / Phone">
   </div></div>
   <div class="table-wrap"><table id="joinerTable"><tr><th>No.</th><th>Full Name</th><th>Gender</th><th>DOB</th><th>District</th><th>Phone</th><th>Education</th><th>Experience</th><th>Date (24h)</th></tr>${jrows}</table></div>
   </div>
   <script>
   function filterClients(){
     let input = document.getElementById('searchClient').value.toLowerCase();
     let rows = document.querySelectorAll('#clientTable tr');
     for(let i=1;i<rows.length;i++){ rows[i].style.display = rows[i].innerText.toLowerCase().includes(input) ? '' : 'none'; }
   }
   function filterJoiners(){
     let district = document.getElementById('searchDistrict').value.toLowerCase();
     let gender = document.getElementById('filterGender').value.toLowerCase();
     let edu = document.getElementById('filterEdu').value.toLowerCase();
     let name = document.getElementById('searchJoinerName').value.toLowerCase();
     let rows = document.querySelectorAll('#joinerTable tr');
     for(let i=1;i<rows.length;i++){
       let t = rows[i].innerText.toLowerCase();
       let ok = (district==''||t.includes(district)) && (gender==''||t.includes(gender)) && (edu==''||t.includes(edu)) && (name==''||t.includes(name));
       rows[i].style.display = ok ? '' : 'none';
     }
   }
   </script></body></html>`);
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