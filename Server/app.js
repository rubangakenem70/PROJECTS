const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let db;
try{ db=require('./dbserver'); }catch(e){ console.log("DB not loaded yet"); }

function safeQuery(sql,params,cb){
  if(!db) return cb(new Error("DB not connected"),null);
  db.query(sql,params,(err,res)=>{
    if(err){
      console.log("Query Error:", err.message);
      return cb(err,null);
    }
    cb(null,res);
  });
}

const ADMIN_PASSWORD = "Pinnacle@2026";
function checkAdmin(req,res,next){
  const key = req.query.key;
  if(key === ADMIN_PASSWORD) return next();
  return res.send('<html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{font-family:Poppins,sans-serif;background:#0a192f;display:flex;justify-content:center;align-items:center;height:100vh;margin:0}.box{background:white;padding:35px;border-radius:24px;max-width:400px;width:90%;text-align:center}input{width:100%;padding:16px;margin:10px 0;border-radius:14px;border:2px solid #e2e8f0}button{background:#0a192f;color:#ffcc00;padding:16px;width:100%;border:none;border-radius:14px;font-weight:800;cursor:pointer}</style></head><body><div class="box"><h2>🔐 Admin Login</h2><input id="p" type="password" placeholder="Password"><button onclick="login()">Login</button><br><br><a href="/">Back</a></div><script>function login(){ location.href="/view-db?key="+document.getElementById("p").value; }</script></body></html>');
}

const site = `<!DOCTYPE html><html><head><title>Pinnacle Security Limited</title><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"><style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap');
*{margin:0;padding:0;box-sizing:border-box;font-family:'Poppins',sans-serif;scroll-behavior:smooth}
body{background:#f8fafc;color:#0f172a;line-height:1.6}
.navbar{position:fixed;top:0;left:0;right:0;display:flex;justify-content:space-between;align-items:center;padding:16px 6%;background:rgba(10,25,47,0.98);z-index:999}
.logo{font-weight:800;color:#ffcc00;font-size:18px}
.nav-links{display:flex;list-style:none;gap:20px;align-items:center}
.nav-links a{color:#e2e8f0;text-decoration:none;font-size:14px;font-weight:500}
.btn-nav{background:#ffcc00;color:#0a192f!important;padding:9px 22px;border-radius:50px;font-weight:700!important}
.hero{min-height:100vh;padding:140px 8% 80px;background:linear-gradient(105deg,#0a192f 65%,rgba(10,25,47,0.2)),url('https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1400');background-size:cover;display:flex;align-items:center}
.hero-text h1{font-size:52px;color:white;line-height:1.1;font-weight:800;margin-bottom:15px}
.hero-text h1 span{color:#ffcc00}
.hero-text p{color:#cbd5e1;font-size:17px;margin-bottom:10px}
.btn-main{background:#ffcc00;color:#0a192f;padding:14px 32px;border:none;border-radius:50px;font-weight:700;text-decoration:none;display:inline-block}
.btn-main-dark{background:#0a192f;color:#ffcc00;padding:16px;width:100%;border:none;border-radius:14px;font-weight:700;cursor:pointer;margin-top:12px}
.section{padding:80px 8%}.section h2{font-size:34px;font-weight:800;text-align:center;margin-bottom:12px}
.section.dark{background:#0a192f;color:white}
.about-grid,.service-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;margin-top:35px}
.card{background:white;border-radius:18px;padding:28px;box-shadow:0 10px 30px rgba(0,0,0,0.06);text-align:center}
.card i{font-size:26px;color:#0a192f;background:#ffcc00;width:60px;height:60px;display:flex;align-items:center;justify-content:center;border-radius:50%;margin:0 auto 15px}
.service-box{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);padding:26px;border-radius:18px}
.gallery{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;margin-top:30px}
.gallery img{width:100%;height:200px;object-fit:cover;border-radius:14px}
.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-top:30px}
.join-wrapper{background:white;padding:30px;border-radius:20px;box-shadow:0 15px 40px rgba(0,0,0,0.08);max-width:780px;margin:30px auto 0}
.row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.join-wrapper input,.join-wrapper select,.join-wrapper textarea,#contactForm input,#contactForm select,#contactForm textarea{width:100%;padding:14px 18px;margin:7px 0;border-radius:12px;border:2px solid #e2e8f0;background:#f8fafc;font-size:14px}
footer{text-align:center;padding:30px;background:#020c1b;color:#64748b}
@media(max-width:768px){.hero-text h1{font-size:32px}.contact-grid{grid-template-columns:1fr}.row{grid-template-columns:1fr}.nav-links{display:none}}
</style></head><body>
<nav class="navbar"><div class="logo">🔐 PINNACLE SECURITY LTD</div><ul class="nav-links"><li><a href="/">Home</a></li><li><a href="#about">About</a></li><li><a href="#services">Services</a></li><li><a href="#training">Training</a></li><li><a href="#contact">Contact</a></li><li><a href="#join" class="btn-nav">Join Us</a></li></ul></nav>
<div class="hero"><div class="hero-text"><h1>Protecting What Matters <span>Most</span></h1><p><b>Pinnacle Security Limited</b> at <b>442/443 Kironde Road, Kampala</b> + Kotido branch. Licensed guards, 4.3★ rating.</p><p style="color:#ffcc00;font-weight:600">📞 0754 139726 | ✉️ info@pinnaclegroup.co.ug | ISIC: 8010 | 24Hrs Friday</p><br><a href="#contact" class="btn-main">Get Guard Now</a> <a href="#join" class="btn-main" style="background:white;margin-left:8px">Join Team</a></div></div>
<div class="section" id="about"><h2>About Pinnacle Security Limited</h2><p style="text-align:center;color:#64748b;max-width:700px;margin:0 auto 20px">ISIC 8010 - Private Security Activities. Professionalism & quick response.</p><div class="about-grid"><div class="card"><i class="fa-solid fa-shield-halved"></i><h3>Who We Are</h3><p>At Kironde Rd serving Karamoja, Gulu, Pader, Kotido. Valid certificates.</p></div><div class="card"><i class="fa-solid fa-bullseye"></i><h3>Our Mission</h3><p>Trained manpower, CCTV, Alarms, GPS, 24/7 control room.</p></div><div class="card"><i class="fa-solid fa-clock"></i><h3>Working Hours</h3><p>Mon 8-4, Tue 8:30-4, Wed-Thu 8-4, Fri 24 Hours, Sat 10-2:30<br>♿ Accessible</p></div></div></div>
<div class="section dark" id="services"><h2>Our Professional Services</h2><div class="service-grid"><div class="service-box"><h3 style="color:#ffcc00">🛡️ Security Guard</h3><p>Residential, commercial, banks, hotels, schools.</p></div><div class="service-box"><h3 style="color:#ffcc00">🏗️ Construction Security</h3><p>24hr site, material control, theft prevention.</p></div><div class="service-box"><h3 style="color:#ffcc00">📹 CCTV & Alarms</h3><p>HD CCTV, alarms, electric fences, phone view.</p></div><div class="service-box"><h3 style="color:#ffcc00">👤 VIP Protection</h3><p>Close protection for VIPs & events.</p></div></div></div>
<div class="section" id="training"><h2>Security Officer Training Gallery</h2><p style="text-align:center;color:#64748b">4 weeks: Parade, Self-defense, First Aid, Fire Safety, Customer Care.</p><div class="gallery"><img src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600"><img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600"><img src="https://images.unsplash.com/photo-1580894906475-0cb46000d6fb?w=600"><img src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600"><img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600"><img src="https://images.unsplash.com/photo-1604004555489-723a93d6ce74?w=600"></div></div>
<div class="section" id="contact"><h2>Contact Us</h2><div class="contact-grid"><div><h3>📍 Head Office</h3><p>442/443 Kironde Road, Kampala<br>Branch: Kotido, Karamoja<br><br>📞 0754 139726<br>✉️ info@pinnaclegroup.co.ug<br>⭐ 4.3★ (11 Reviews)</p></div><div id="contactForm" style="background:white;padding:26px;border-radius:18px"><h3 style="text-align:center">Get Free Quote</h3><input id="n" placeholder="Your Name"><input id="e" placeholder="Phone / Email"><select id="s"><option>Select Service</option><option>Security Guard Service</option><option>Construction Security</option><option>CCTV Installation</option><option>VIP Protection</option></select><textarea id="m" rows="4" placeholder="Message"></textarea><button class="btn-main-dark" onclick="sendMsg()">Send Request →</button><p id="ok" style="display:none;color:green;text-align:center;font-weight:700">✅ Sent!</p></div></div></div>
<div class="section" id="join" style="background:#f1f5f9"><h2>Join Pinnacle Security Team</h2><div class="join-wrapper"><h3 style="text-align:center;margin-bottom:18px">Job Application Form</h3><div class="row"><input id="fname" placeholder="First Name*"><input id="lname" placeholder="Last Name*"></div><div class="row"><select id="gender"><option value="">Gender*</option><option>Male</option><option>Female</option></select><input id="dob" type="date"></div><div class="row"><input id="district" placeholder="District*"><input id="phone" placeholder="Phone*"></div><select id="edu"><option value="">Education Level*</option><option>Primary</option><option>Secondary (S4)</option><option>Advanced (S6)</option><option>Certificate</option><option>Diploma</option><option>Degree</option><option>Masters</option></select><textarea id="exp" rows="4" placeholder="Experience"></textarea><button class="btn-main-dark" onclick="sendJoin()">Submit Application →</button><p id="ok2" style="display:none;color:green;text-align:center;font-weight:700">✅ Application Sent!</p></div></div>
<footer><p>© 2026 Pinnacle Security Limited</p></footer>
<script>
async function sendMsg(){let n=document.getElementById('n').value,e=document.getElementById('e').value,s=document.getElementById('s').value,m=document.getElementById('m').value;if(!n||!e||!m)return alert('Fill all');let c=e+' | Service: '+s;let r=await fetch('/contacts',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:n,email:c,message:m})});let d=await r.json();if(d.success)document.getElementById('ok').style.display='block';}
async function sendJoin(){let fname=document.getElementById('fname').value,lname=document.getElementById('lname').value,gender=document.getElementById('gender').value,dob=document.getElementById('dob').value,district=document.getElementById('district').value,phone=document.getElementById('phone').value,edu=document.getElementById('edu').value,exp=document.getElementById('exp').value;if(!fname||!lname||!gender||!district||!phone||!edu)return alert('Fill all *');let r=await fetch('/join',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({fname,lname,gender,dob,district,phone,edu,exp})});let d=await r.json();if(d.success)document.getElementById('ok2').style.display='block';}
</script></body></html>`;

app.get('/',(req,res)=>res.send(site));

safeQuery("CREATE TABLE IF NOT EXISTS contacts (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), message TEXT, date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",[],()=>{});
safeQuery("CREATE TABLE IF NOT EXISTS joiners (id INT AUTO_INCREMENT PRIMARY KEY, fname VARCHAR(255), lname VARCHAR(255), gender VARCHAR(20), dob VARCHAR(50), district VARCHAR(100), phone VARCHAR(100), edu VARCHAR(100), exp TEXT, date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",[],()=>{});

app.get('/view-db',checkAdmin,(req,res)=>{
 safeQuery("SELECT * FROM contacts ORDER BY id ASC",[],(err,contacts)=>{
  if(err){
    console.log(err);
    return res.send("<h2 style='text-align:center;font-family:Poppins'>DB Error: "+err.message+"<br><br>Refreshing in 3 sec...</h2><script>setTimeout(()=>location.reload(),3000)</script>");
  }
  safeQuery("SELECT * FROM joiners ORDER BY id ASC",[],(err2,joiners)=>{
   if(err2) joiners=[];
   function formatDate(d){
     if(!d) return "";
     let date = new Date(d);
     return date.getFullYear()+"-"+String(date.getMonth()+1).padStart(2,'0')+"-"+String(date.getDate()).padStart(2,'0')+" "+String(date.getHours()).padStart(2,'0')+":"+String(date.getMinutes()).padStart(2,'0');
   }
   let rows=contacts.map((c,i)=>{
     let contact=c.email; let service="Not Selected";
     if(c.email && c.email.includes("|")){ let p=c.email.split("|"); contact=p[0].trim(); if(p[1]) service=p[1].replace("Service:","").trim(); }
     let delLink = "/delete-contact?id="+c.id+"&key="+req.query.key;
     return "<tr><td>"+(i+1)+"</td><td>"+(c.name||'')+"</td><td>"+contact+"</td><td>"+service+"</td><td>"+(c.message||'')+"</td><td>"+formatDate(c.date_added)+"</td><td><a href='"+delLink+"' onclick=\"return confirm('Delete this?')\" style='background:#ef4444;color:white;padding:7px 14px;border-radius:20px;text-decoration:none;font-weight:700;font-size:12px'>🗑️ Delete</a></td></tr>";
   }).join('');
   let jrows=(joiners||[]).map((j,i)=>{
     let delLink = "/delete-joiner?id="+j.id+"&key="+req.query.key;
     return "<tr><td>"+(i+1)+"</td><td>"+j.fname+" "+j.lname+"</td><td>"+j.gender+"</td><td>"+j.dob+"</td><td>"+j.district+"</td><td>"+j.phone+"</td><td>"+j.edu+"</td><td>"+j.exp+"</td><td>"+formatDate(j.date_added)+"</td><td><a href='"+delLink+"' onclick=\"return confirm('Delete "+j.fname+"?')\" style='background:#ef4444;color:white;padding:7px 14px;border-radius:20px;text-decoration:none;font-weight:700;font-size:12px'>🗑️ Delete</a></td></tr>";
   }).join('');
   let html = "<!DOCTYPE html><html><head><meta name='viewport' content='width=device-width,initial-scale=1'><title>Admin - Fixed DB</title><style>@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap');*{margin:0;padding:0;box-sizing:border-box;font-family:'Poppins',sans-serif}body{background:#f8fafc;padding:20px;display:flex;justify-content:center}.container{width:100%;max-width:1300px;margin:0 auto}h2{font-size:32px;font-weight:800;text-align:center;margin:20px 0;display:flex;justify-content:center;align-items:center;gap:12px}.top-btns{display:flex;justify-content:center;gap:15px;margin:20px 0;flex-wrap:wrap}.badge{padding:14px 26px;border-radius:50px;text-decoration:none;font-weight:800;font-size:15px;display:inline-block;text-align:center}h3{font-size:22px;font-weight:800;text-align:center;margin:40px 0 15px}.search-wrap{display:flex;justify-content:center;margin:10px 0 20px}.search-box{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;max-width:900px;width:100%}.search-box input,.search-box select{padding:14px 20px;border-radius:50px;border:2px solid #e2e8f0;min-width:180px;text-align:center}.table-wrap{display:flex;justify-content:center;overflow-x:auto}table{width:100%;border-collapse:collapse;background:white;border-radius:16px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,0.08);text-align:center}th{background:#0a192f;color:#ffcc00;padding:14px 10px;font-size:11px;text-transform:uppercase}td{padding:12px 8px;border-bottom:1px solid #f1f5f9;font-size:13px}tr:hover{background:#f1f5f9}td:first-child{font-weight:800;background:#f8fafc;width:60px}</style></head><body><div class='container'><h2>🔐 Admin Panel - Fixed & Centered</h2><div class='top-btns'><a href='#clients' class='badge' style='background:#0a192f;color:#ffcc00'>Clients ("+contacts.length+")</a><a href='#joiners' class='badge' style='background:#ffcc00;color:#0a192f'>Jobs ("+(joiners||[]).length+")</a><a href='/' class='badge' style='background:white;color:#0a192f;border:2px solid #0a192f'>← Website</a></div><h3 id='clients'>📩 Client Requests - "+contacts.length+" (ASC)</h3><div class='search-wrap'><div class='search-box'><input type='text' id='searchClient' onkeyup='filterClients()' placeholder='🔍 Search'></div></div><div class='table-wrap'><table id='clientTable'><tr><th>No.</th><th>Name</th><th>Contact</th><th>Service</th><th>Message</th><th>Date 24h</th><th>Action</th></tr>"+rows+"</table></div><h3 id='joiners'>👥 Job Applications - "+(joiners||[]).length+" (ASC)</h3><div class='search-wrap'><div class='search-box'><input type='text' id='searchDistrict' onkeyup='filterJoiners()' placeholder='🔍 District'><select id='filterGender' onchange='filterJoiners()'><option value=''>All Gender</option><option>Male</option><option>Female</option></select><select id='filterEdu' onchange='filterJoiners()'><option value=''>All Edu</option><option>Primary</option><option>Secondary (S4)</option><option>Advanced (S6)</option><option>Certificate</option><option>Diploma</option><option>Degree</option><option>Masters</option></select><input type='text' id='searchJoinerName' onkeyup='filterJoiners()' placeholder='🔍 Name'></div></div><div class='table-wrap'><table id='joinerTable'><tr><th>No.</th><th>Full Name</th><th>Gender</th><th>DOB</th><th>District</th><th>Phone</th><th>Education</th><th>Exp</th><th>Date 24h</th><th>Action</th></tr>"+jrows+"</table></div></div><script>function filterClients(){let v=document.getElementById('searchClient').value.toLowerCase();document.querySelectorAll('#clientTable tr').forEach((r,i)=>{if(i==0)return;r.style.display=r.innerText.toLowerCase().includes(v)?'':'none';});}function filterJoiners(){let d=document.getElementById('searchDistrict').value.toLowerCase(),g=document.getElementById('filterGender').value.toLowerCase(),e=document.getElementById('filterEdu').value.toLowerCase(),n=document.getElementById('searchJoinerName').value.toLowerCase();document.querySelectorAll('#joinerTable tr').forEach((r,i)=>{if(i==0)return;let t=r.innerText.toLowerCase();r.style.display=(d==''||t.includes(d))&&(g==''||t.includes(g))&&(e==''||t.includes(e))&&(n==''||t.includes(n))?'':'none';});}</script></body></html>";
   res.send(html);
  });
 });
});

app.get('/delete-contact',checkAdmin,(req,res)=>{
  safeQuery("DELETE FROM contacts WHERE id=?",[req.query.id],(err)=>{
    if(err) return res.send("Delete Error "+err.message);
    res.redirect('/view-db?key='+req.query.key+'#clients');
  });
});
app.get('/delete-joiner',checkAdmin,(req,res)=>{
  safeQuery("DELETE FROM joiners WHERE id=?",[req.query.id],(err)=>{
    if(err) return res.send("Delete Error "+err.message);
    res.redirect('/view-db?key='+req.query.key+'#joiners');
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
app.listen(PORT,'0.0.0.0',()=>console.log("Running Fixed "+PORT));