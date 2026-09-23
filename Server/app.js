const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let db;
try{ db=require('./dbserver'); }catch(e){ console.log("DB file not found, using memory"); }

function safeQuery(sql,params,cb){
  if(!db) return cb(new Error("DB not connected"),null);
  db.query(sql,params,(err,res)=>{ if(err) return cb(err,null); cb(null,res); });
}

const ADMIN_PASSWORD = "Pinnacle@2026";
const LOGO = "https://images.seeklogo.com/logo-png/49/2/pinnacle-security-limited-logo-png_seeklogo-549748.png";

function checkAdmin(req,res,next){
  const key = req.query.key;
  if(key === ADMIN_PASSWORD) return next();
  return res.send('<html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{font-family:Poppins,sans-serif;background:#0a192f;display:flex;justify-content:center;align-items:center;height:100vh;margin:0}.box{background:white;padding:35px;border-radius:24px;max-width:400px;width:90%;text-align:center}input{width:100%;padding:16px;margin:10px 0;border-radius:14px;border:2px solid #e2e8f0}button{background:#0a192f;color:#ffcc00;padding:16px;width:100%;border:none;border-radius:14px;font-weight:800;cursor:pointer}img{width:110px;margin-bottom:15px}</style></head><body><div class="box"><img src="'+LOGO+'"><h2>Admin Login</h2><input id="p" type="password" placeholder="Password"><button onclick="login()">Login</button><br><br><a href="/">Back</a></div><script>function login(){ location.href="/view-db?key="+document.getElementById("p").value; }</script></body></html>');
}

const site = `<!DOCTYPE html><html><head><title>Pinnacle Security Limited</title><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" href="https://images.seeklogo.com/logo-png/49/2/pinnacle-security-limited-logo-png_seeklogo-549748.png"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"><style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap');
*{margin:0;padding:0;box-sizing:border-box;font-family:'Poppins',sans-serif;scroll-behavior:smooth}
body{background:#f8fafc;color:#0f172a;line-height:1.6}
.navbar{position:fixed;top:0;left:0;right:0;display:flex;justify-content:space-between;align-items:center;padding:10px 6%;background:rgba(10,25,47,0.98);z-index:999}
.logo{display:flex;align-items:center;gap:10px;font-weight:800;color:#ffcc00;font-size:18px}
.logo img{width:48px;height:48px;background:white;padding:4px;border-radius:12px}
.nav-links{display:flex;list-style:none;gap:20px;align-items:center}
.nav-links a{color:#e2e8f0;text-decoration:none;font-size:14px;font-weight:500}
.btn-nav{background:#ffcc00;color:#0a192f!important;padding:9px 22px;border-radius:50px;font-weight:700!important}
.hero{min-height:100vh;padding:140px 8% 80px;background:linear-gradient(105deg,#0a192f 65%,rgba(10,25,47,0.2)),url('https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1400');background-size:cover;display:flex;align-items:center}
.hero-logo{width:120px;background:white;padding:8px;border-radius:18px;margin-bottom:15px}
.hero-text h1{font-size:52px;color:white;line-height:1.1;font-weight:800;margin-bottom:15px}
.hero-text h1 span{color:#ffcc00}
.hero-text p{color:#cbd5e1;font-size:17px;margin-bottom:10px}
.btn-main{background:#ffcc00;color:#0a192f;padding:14px 32px;border:none;border-radius:50px;font-weight:700;text-decoration:none;display:inline-block}
.btn-main-dark{background:#0a192f;color:#ffcc00;padding:16px;width:100%;border:none;border-radius:14px;font-weight:700;cursor:pointer;margin-top:12px}
.section{padding:80px 8%}.section h2{font-size:34px;font-weight:800;text-align:center;margin-bottom:12px;display:flex;justify-content:center;align-items:center;gap:12px}
.section h2 img{width:48px;background:white;padding:5px;border-radius:12px}
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
footer img{width:70px;background:white;padding:5px;border-radius:12px;margin-bottom:10px}
@media(max-width:768px){.hero-text h1{font-size:32px}.contact-grid{grid-template-columns:1fr}.row{grid-template-columns:1fr}.nav-links{display:none}}
</style></head><body>
<nav class="navbar"><div class="logo"><img src="https://images.seeklogo.com/logo-png/49/2/pinnacle-security-limited-logo-png_seeklogo-549748.png"> PINNACLE SECURITY LTD</div><ul class="nav-links"><li><a href="/">Home</a></li><li><a href="#about">About</a></li><li><a href="#services">Services</a></li><li><a href="#training">Training</a></li><li><a href="#contact">Contact</a></li><li><a href="#join" class="btn-nav">Join Us</a></li></ul></nav>
<div class="hero"><div class="hero-text"><img class="hero-logo" src="https://images.seeklogo.com/logo-png/49/2/pinnacle-security-limited-logo-png_seeklogo-549748.png"><h1>Protecting What Matters <span>Most</span></h1><p><b>Pinnacle Security Limited</b> is Uganda's trusted security company at <b>442/443 Kironde Road, Kampala</b> with branch in Kotido, Karamoja.</p><p>Licensed guards, 4.3★ rating, 24hr control room, ISIC:8010</p><br><a href="#contact" class="btn-main">Get Guard Now</a> <a href="#join" class="btn-main" style="background:white;margin-left:8px">Join Team</a></div></div>
<div class="section" id="about"><h2><img src="https://images.seeklogo.com/logo-png/49/2/pinnacle-security-limited-logo-png_seeklogo-549748.png"> About Us</h2><div class="about-grid"><div class="card"><i class="fa-solid fa-shield-halved"></i><h3>Who We Are</h3><p>Pinnacle at Kironde Rd, Kampala serving all regions including Karamoja, Gulu, Pader, Kotido.</p></div><div class="card"><i class="fa-solid fa-bullseye"></i><h3>Our Mission</h3><p>Reliable security through trained manpower, CCTV, Alarms and 24/7 monitoring.</p></div><div class="card"><i class="fa-solid fa-clock"></i><h3>Working Hours</h3><p>Mon 8-4, Tue 8:30-4, Wed-Thu 8-4, Fri 24H, Sat 10-2:30</p></div></div></div>
<div class="section dark" id="services"><h2>Our Services</h2><div class="service-grid"><div class="service-box"><h3 style="color:#ffcc00">Guard Service</h3><p>Uniformed vetted licensed guards for homes, businesses, banks, schools.</p></div><div class="service-box"><h3 style="color:#ffcc00">Construction Security</h3><p>24hr site security, material checkpoint, theft prevention.</p></div><div class="service-box"><h3 style="color:#ffcc00">CCTV & Alarms</h3><p>HD CCTV, alarms, electric fences, phone viewing.</p></div><div class="service-box"><h3 style="color:#ffcc00">VIP Protection</h3><p>Close protection for VIPs, executives and events.</p></div></div></div>
<div class="section" id="training"><h2>Security Training Gallery</h2><div class="gallery"><img src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600"><img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600"><img src="https://images.unsplash.com/photo-1580894906475-0cb46000d6fb?w=600"><img src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600"></div></div>
<div class="section" id="contact"><h2><img src="https://images.seeklogo.com/logo-png/49/2/pinnacle-security-limited-logo-png_seeklogo-549748.png"> Contact Us</h2><div class="contact-grid"><div><h3>Head Office</h3><p>442/443 Kironde Rd, Kampala<br>Branch: Kotido, Karamoja<br><br>Phone: 0754 139726<br>Email: info@pinnaclegroup.co.ug<br>Rating: 4.3★ (11 Reviews)</p></div><div id="contactForm" style="background:white;padding:26px;border-radius:18px;box-shadow:0 10px 30px rgba(0,0,0,0.06)"><h3 style="text-align:center;margin-bottom:12px">Get Free Quote</h3><input id="n" placeholder="Your Name"><input id="e" placeholder="Phone / Email"><select id="s"><option>Select Service</option><option>Security Guard Service</option><option>Construction Security</option><option>CCTV Installation</option><option>VIP Protection</option></select><textarea id="m" rows="4" placeholder="Message"></textarea><button class="btn-main-dark" onclick="sendMsg()">Send Request</button><p id="ok" style="display:none;color:green;margin-top:10px;text-align:center;font-weight:700">Sent!</p></div></div></div>
<div class="section" id="join" style="background:#f1f5f9"><h2>Join Pinnacle Team</h2><div class="join-wrapper"><h3 style="text-align:center;margin-bottom:18px">Job Application</h3><div class="row"><input id="fname" placeholder="First Name*"><input id="lname" placeholder="Last Name*"></div><div class="row"><select id="gender"><option value="">Gender*</option><option>Male</option><option>Female</option></select><input id="dob" type="date"></div><div class="row"><input id="district" placeholder="District*"><input id="phone" placeholder="Phone*"></div><select id="edu"><option value="">Education*</option><option>Primary</option><option>Secondary (S4)</option><option>Advanced (S6)</option><option>Certificate</option><option>Diploma</option><option>Degree</option><option>Masters</option></select><textarea id="exp" rows="3" placeholder="Experience"></textarea><button class="btn-main-dark" onclick="sendJoin()">Submit Application</button><p id="ok2" style="display:none;color:green;margin-top:10px;text-align:center;font-weight:700">Application Sent!</p></div></div>
<footer><img src="https://images.seeklogo.com/logo-png/49/2/pinnacle-security-limited-logo-png_seeklogo-549748.png"><p>© 2026 Pinnacle Security Limited | 442/443 Kironde Rd, Kampala | 0754 139726</p></footer>
<script>
async function sendMsg(){let n=document.getElementById('n').value,e=document.getElementById('e').value,s=document.getElementById('s').value,m=document.getElementById('m').value;if(!n||!e||!m)return alert('Fill all');let c=e+' | Service: '+s;let r=await fetch('/contacts',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:n,email:c,message:m})});let d=await r.json();if(d.success)document.getElementById('ok').style.display='block';}
async function sendJoin(){let fname=document.getElementById('fname').value,lname=document.getElementById('lname').value,gender=document.getElementById('gender').value,dob=document.getElementById('dob').value,district=document.getElementById('district').value,phone=document.getElementById('phone').value,edu=document.getElementById('edu').value,exp=document.getElementById('exp').value;if(!fname||!lname||!gender||!district||!phone||!edu)return alert('Fill all *');let r=await fetch('/join',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({fname,lname,gender,dob,district,phone,edu,exp})});let d=await r.json();if(d.success)document.getElementById('ok2').style.display='block';}
</script></body></html>`;

app.get('/',(req,res)=>res.send(site));
safeQuery("CREATE TABLE IF NOT EXISTS joiners (id INT AUTO_INCREMENT PRIMARY KEY, fname VARCHAR(255), lname VARCHAR(255), gender VARCHAR(20), dob VARCHAR(50), district VARCHAR(100), phone VARCHAR(100), edu VARCHAR(100), exp TEXT, date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",[],()=>{});

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
     return year+"-"+month+"-"+day+" "+hours+":"+mins;
   }
   let rows=contacts.map((c,i)=>{
     let contact=c.email; let service="Not Selected";
     if(c.email.includes("|")){ let p=c.email.split("|"); contact=p[0].trim(); if(p[1]) service=p[1].replace("Service:","").trim(); }
     return "<tr><td>"+(i+1)+"</td><td>"+c.name+"</td><td>"+contact+"</td><td>"+service+"</td><td>"+c.message+"</td><td>"+formatDate(c.date_added)+"</td></tr>";
   }).join('');
   let jrows=(joiners||[]).map((j,i)=>"<tr><td>"+(i+1)+"</td><td>"+j.fname+" "+j.lname+"</td><td>"+j.gender+"</td><td>"+j.dob+"</td><td>"+j.district+"</td><td>"+j.phone+"</td><td>"+j.edu+"</td><td>"+j.exp+"</td><td>"+formatDate(j.date_added)+"</td></tr>").join('');

   let html = "<!DOCTYPE html><html><head><meta name='viewport' content='width=device-width,initial-scale=1'><title>Admin Panel</title><link rel='icon' href='"+LOGO+"'><style>@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap');*{margin:0;padding:0;box-sizing:border-box;font-family:'Poppins',sans-serif}body{background:#f8fafc;padding:20px;display:flex;justify-content:center}.container{width:100%;max-width:1250px;margin:0 auto}h2{font-size:34px;font-weight:800;text-align:center;margin:20px 0;display:flex;justify-content:center;align-items:center;gap:14px}h2 img{width:60px;background:white;border-radius:14px;padding:5px;box-shadow:0 4px 12px rgba(0,0,0,0.1)}.top-btns{display:flex;justify-content:center;gap:15px;margin:20px 0;flex-wrap:wrap}.badge{padding:14px 26px;border-radius:50px;text-decoration:none;font-weight:800;font-size:15px;display:inline-block;box-shadow:0 4px 15px rgba(0,0,0,0.1);text-align:center}h3{font-size:22px;font-weight:800;text-align:center;margin:40px 0 15px}.search-wrap{display:flex;justify-content:center;margin:10px 0 20px}.search-box{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;width:100%;max-width:900px}.search-box input,.search-box select{padding:14px 20px;border-radius:50px;border:2px solid #e2e8f0;min-width:180px;font-size:14px;text-align:center}.table-wrap{display:flex;justify-content:center;overflow-x:auto}table{width:100%;border-collapse:collapse;background:white;border-radius:16px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,0.08);text-align:center}th{background:#0a192f;color:#ffcc00;padding:14px 10px;font-size:11px;text-transform:uppercase}td{padding:12px 8px;border-bottom:1px solid #f1f5f9;font-size:13px}tr:hover{background:#f1f5f9}td:first-child{font-weight:800;background:#f8fafc;color:#0a192f;width:60px}</style></head><body><div class='container'><h2><img src='"+LOGO+"'> Admin Panel</h2><div class='top-btns'><a href='#clients' class='badge' style='background:#0a192f;color:#ffcc00'>Client Requests ("+contacts.length+")</a><a href='#joiners' class='badge' style='background:#ffcc00;color:#0a192f'>Job Applications ("+(joiners||[]).length+")</a><a href='/' class='badge' style='background:white;color:#0a192f;border:2px solid #0a192f'>Website</a></div><h3 id='clients'>Client Requests - "+contacts.length+"</h3><div class='search-wrap'><div class='search-box'><input type='text' id='searchClient' onkeyup='filterClients()' placeholder='Search Name, Contact, Service'></div></div><div class='table-wrap'><table id='clientTable'><tr><th>No.</th><th>Name</th><th>Contact</th><th>Service</th><th>Message</th><th>Date & Time (24h)</th></tr>"+rows+"</table></div><h3 id='joiners'>Job Applications - "+(joiners||[]).length+"</h3><div class='search-wrap'><div class='search-box'><input type='text' id='searchDistrict' onkeyup='filterJoiners()' placeholder='District e.g. KOTIDO'><select id='filterGender' onchange='filterJoiners()'><option value=''>All Gender</option><option>Male</option><option>Female</option></select><select id='filterEdu' onchange='filterJoiners()'><option value=''>All Education</option><option>Primary</option><option>Secondary (S4)</option><option>Advanced (S6)</option><option>Certificate</option><option>Diploma</option><option>Degree</option><option>Masters</option></select><input type='text' id='searchJoinerName' onkeyup='filterJoiners()' placeholder='Name / Phone'></div></div><div class='table-wrap'><table id='joinerTable'><tr><th>No.</th><th>Full Name</th><th>Gender</th><th>DOB</th><th>District</th><th>Phone</th><th>Education</th><th>Experience</th><th>Date (24h)</th></tr>"+jrows+"</table></div></div><script>function filterClients(){let input=document.getElementById('searchClient').value.toLowerCase();let rows=document.querySelectorAll('#clientTable tr');for(let i=1;i<rows.length;i++){rows[i].style.display=rows[i].innerText.toLowerCase().includes(input)?'':'none';}}function filterJoiners(){let district=document.getElementById('searchDistrict').value.toLowerCase();let gender=document.getElementById('filterGender').value.toLowerCase();let edu=document.getElementById('filterEdu').value.toLowerCase();let name=document.getElementById('searchJoinerName').value.toLowerCase();let rows=document.querySelectorAll('#joinerTable tr');for(let i=1;i<rows.length;i++){let t=rows[i].innerText.toLowerCase();let ok=(district==''||t.includes(district))&&(gender==''||t.includes(gender))&&(edu==''||t.includes(edu))&&(name==''||t.includes(name));rows[i].style.display=ok?'':'none';}}</script></body></html>";
   res.send(html);
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
app.listen(PORT,'0.0.0.0',()=>console.log("Running on "+PORT));