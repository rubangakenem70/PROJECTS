const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
let db; try{ db=require('./dbserver'); }catch(e){}
function safeQuery(sql,params,cb){ if(!db) return cb(new Error("DB not connected"),null); db.query(sql,params,(err,res)=>{ if(err) return cb(err,null); cb(null,res); }); }

const website = `
<!DOCTYPE html>
<html><head><title>Pinnacle Security Limited - 442/443 Kironde Rd, Kampala</title><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:Arial;background:#f5f7fa;color:#333}
.nav{background:#0a1931;padding:12px 25px;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:1000}
.nav h1{color:#ffcc00;font-size:20px}.menu{display:flex;gap:20px;align-items:center}
.menu a{color:white;text-decoration:none;font-weight:bold;font-size:14px}
.dropdown{position:relative}.dropdown-content{display:none;position:absolute;background:white;min-width:220px;box-shadow:0 8px 16px rgba(0,0,0,0.2);border-radius:8px;top:25px;left:0}
.dropdown-content a{color:#0a1931!important;padding:12px 16px;display:block}.dropdown-content a:hover{background:#ffcc00}
.dropdown:hover .dropdown-content{display:block}
.hero{background:linear-gradient(rgba(10,25,49,0.9),rgba(10,25,49,0.85)),url('https://images.unsplash.com/photo-1580894906475-403276d3942d');background-size:cover;color:white;padding:80px 20px;text-align:center}
.hero h2{font-size:42px;color:#ffcc00}.hero p{max-width:700px;margin:15px auto;font-size:18px}
.btn{background:#ffcc00;color:#0a1931;padding:12px 25px;border-radius:25px;text-decoration:none;font-weight:bold;display:inline-block;margin:10px}
.badge{background:white;color:#0a1931;padding:15px;border-radius:10px;display:inline-block;margin:15px auto;box-shadow:0 4px 10px rgba(0,0,0,0.2)}
.section{padding:50px 20px;max-width:1100px;margin:auto}.section h2{text-align:center;color:#0a1931;font-size:32px}
.line{width:70px;height:4px;background:#ffcc00;margin:10px auto 30px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px}
.card{background:white;padding:25px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.08);border-left:5px solid #ffcc00}
.info-bar{background:white;padding:20px;border-radius:12px;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;margin:30px 0;box-shadow:0 4px 12px rgba(0,0,0,0.08)}
.contact-area{background:#0a1931;color:white;padding:40px;border-radius:15px;display:grid;grid-template-columns:1fr 1fr;gap:30px}
@media(max-width:768px){.contact-area{grid-template-columns:1fr}.nav{flex-direction:column}.menu{flex-wrap:wrap;justify-content:center;margin-top:10px}}
input,textarea,select{width:100%;padding:12px;margin:7px 0;border-radius:8px;border:1px solid #ccc}
button{background:#ffcc00;color:#0a1931;padding:13px;width:100%;border:none;border-radius:8px;font-weight:bold;cursor:pointer}
.footer{background:#050e1f;color:#999;padding:30px;text-align:center}
.hours-table{width:100%;border-collapse:collapse}.hours-table td{padding:6px;border-bottom:1px solid #eee;font-size:14px}
</style></head><body>

<div class="nav">
<h1>🔐 PINNACLE SECURITY LTD</h1>
<div class="menu">
<a href="/">Home</a>
<a href="#about">About Us</a>
<div class="dropdown"><a href="#services">Services ▼</a>
<div class="dropdown-content">
<a href="#services">🛡️ Security Guard Service</a>
<a href="#services">🏗️ Construction</a>
<a href="#services">📹 CCTV & Alarms</a>
<a href="#services">👤 VIP Protection</a>
<a href="#services">🚨 24Hr Response</a>
</div></div>
<a href="#contact">Contact</a>
<a href="/view-db" style="color:#ffcc00">Admin</a>
</div>
</div>

<div class="hero">
<h2>Pinnacle Security Limited</h2>
<p>Licensed & Trusted Security Guard Service in Uganda - Protecting Homes, Businesses & Communities Since 2010</p>
<div class="badge">
⭐ 4.3 (11 Reviews) | ISIC: 8010, F | Wheelchair Accessible Parking: Yes
</div><br>
<a class="btn" href="#contact">Request Guard Today</a>
<a class="btn" style="background:white" href="tel:0754139726">Call: 0754 139726</a>
</div>

<div class="section" id="about">
<h2>About Us</h2><div class="line"></div>
<div class="grid">
<div class="card">
<h3>Who We Are</h3>
<p>Pinnacle Security Limited is located at <b>442/443 Kironde Rd, Kampala, Central Region, Uganda</b>. We are a leading provider of Security Guard Services and Construction security solutions.</p><br>
<p>We started in Kampala and now expanded to <b>Kotido, Moroto, Kaabong and entire Karamoja</b> region to bring professional security closer to you.</p>
</div>
<div class="card">
<h3>🕒 Working Hours</h3>
<table class="hours-table">
<tr><td><b>Monday</b></td><td>8:00 AM – 4:00 PM</td></tr>
<tr><td><b>Tuesday</b></td><td>8:30 AM – 4:00 PM</td></tr>
<tr><td><b>Wednesday - Thursday</b></td><td>8:00 AM – 4:00 PM</td></tr>
<tr><td><b>Friday</b></td><td>24 Hours</td></tr>
<tr><td><b>Saturday</b></td><td>10:00 AM – 2:30 PM</td></tr>
<tr><td><b>Sunday</b></td><td>Closed</td></tr>
</table>
<p style="color:green;margin-top:10px"><b>● Open until 4:00 PM Today</b></p>
</div>
<div class="card">
<h3>Why Choose Us?</h3>
<p>✅ Licensed by Uganda Police Force<br>✅ 11+ Verified Client Reviews<br>✅ Trained & Vetted Guards<br>✅ Categories: Security Guard Service, Construction<br>✅ Affordable & Reliable<br>✅ 24/7 Support - Friday 24 Hours<br>✅ Head Office Kampala, Branch Kotido</p>
</div>
</div>
</div>

<div class="section" id="services" style="background:white">
<h2>Our Services</h2><div class="line"></div>
<div class="grid">
<div class="card"><h3>🛡️ Security Guard Service</h3><p>Armed & unarmed guards for Banks, NGOs, Schools, Homes, Construction sites. Our core business with ISIC Code 8010.</p></div>
<div class="card"><h3>🏗️ Construction Security</h3><p>Specialized security for construction sites, materials, equipment and workers - Day and night protection.</p></div>
<div class="card"><h3>📹 CCTV & Alarm Systems</h3><p>Installation and monitoring of modern surveillance cameras and intruder alarms with mobile access.</p></div>
<div class="card"><h3>👤 VIP & Executive Protection</h3><p>Professional close protection, cash-in-transit escort and event security for VIPs.</p></div>
<div class="card"><h3>🚨 Emergency Response</h3><p>Rapid response team available 24 Hours on Friday and on-call other days in Kampala & Kotido.</p></div>
<div class="card"><h3>🔍 Security Consultancy</h3><p>Risk assessment, security audit and training for your staff and private guards.</p></div>
</div>
</div>

<div class="section" id="contact">
<h2>Contact Us</h2><div class="line"></div>
<div class="contact-area">
<div>
<h3 style="color:#ffcc00">Pinnacle Security Limited</h3><br>
<p>📍 <b>Head Office:</b> 442/443 Kironde Rd, Kampala, Central Region, Uganda</p><br>
<p>📍 <b>Branch:</b> Kotido Central, Kotido District - Karamoja Region</p><br>
<p>📞 <b>Phone:</b> <a href="tel:0754139726" style="color:#ffcc00">0754 139726</a></p><br>
<p>✉️ <b>Email:</b> info@pinnaclegroup.co.ug</p><br>
<p>🌐 <b>Website:</b> pinnaclegroup.co.ug</p><br>
<p>♿ Wheelchair Accessible Parking: Yes</p><br>
<div style="background:rgba(255,204,0,0.15);padding:15px;border-radius:10px">
<p><b>Categories:</b> Security Guard Service, Construction</p>
<p><b>Serving:</b> Kampala, Kotido, Moroto, Kaabong, Abim, Napak</p>
</div>
</div>
<div style="background:white;padding:20px;border-radius:10px">
<h3 style="color:#0a1931">Send Us Message</h3>
<input id="n" placeholder="Your Name">
<input id="e" placeholder="Email / Phone">
<select id="s"><option>Select Service</option><option>Security Guard Service</option><option>Construction Security</option><option>CCTV Installation</option><option>VIP Protection</option><option>Other</option></select>
<textarea id="m" rows="4" placeholder="Your Message"></textarea>
<button onclick="sendMsg()">Send Message</button>
<p id="ok" style="display:none;color:green;margin-top:10px;font-weight:bold">✅ Message Sent! We will call you soon on 0754 139726</p>
<p id="err" style="display:none;color:red;margin-top:10px"></p>
</div>
</div>
</div>

<div class="footer">
<p><b style="color:#ffcc00">PINNACLE SECURITY LIMITED</b> - 442/443 Kironde Rd, Kampala, Uganda | 0754 139726 | info@pinnaclegroup.co.ug</p>
<p style="margin-top:8px">© 2026 Pinnacle Security Limited. Licensed Security Provider. All Rights Reserved.</p>
</div>

<script>
async function sendMsg(){
 const n=document.getElementById('n').value, e=document.getElementById('e').value, m=document.getElementById('m').value, s=document.getElementById('s').value;
 if(!n||!e||!m) return alert('Fill all fields');
 try{
  let r=await fetch('/contacts',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:n,email:e+" | Service: "+s,message:m})});
  let d=await r.json(); if(d.success){document.getElementById('ok').style.display='block';}
  else throw new Error(d.error);
 }catch(er){document.getElementById('err').style.display='block'; document.getElementById('err').innerText=er.message}
}
</script>
</body></html>
`;

app.get('/',(req,res)=>res.send(website));
app.get('/client',(req,res)=>res.send(website));
app.get('/about',(req,res)=>res.send(website));
app.get('/view-db',(req,res)=>{
 safeQuery("SELECT * FROM contacts ORDER BY id DESC",[],(err,contacts)=>{
  if(err) return res.send("<h2>DB Error: "+err.message+"</h2><a href='/'>Back</a>");
  let rows=contacts.map(c=>"<tr><td>"+c.id+"</td><td>"+c.name+"</td><td>"+c.email+"</td><td>"+c.message+"</td><td>"+c.date_added+"</td></tr>").join('');
  res.send("<body style='font-family:Arial;padding:20px'><h1>Admin - "+contacts.length+" Messages</h1><a href='/' style='background:#0a1931;color:#ffcc00;padding:10px 20px;text-decoration:none;border-radius:20px'>View Website</a><br><br><table border=1 cellpadding=10 style='border-collapse:collapse;width:100%'><tr style='background:#0a1931;color:#ffcc00'><th>ID</th><th>Name</th><th>Contact</th><th>Message</th><th>Date</th></tr>"+rows+"</table></body>");
 });
});
app.post('/contacts',(req,res)=>{
 const {name,email,message}=req.body;
 safeQuery("INSERT INTO contacts (name,email,message) VALUES (?,?,?)",[name,email,message],(err)=>{ if(err) return res.json({error:err.message}); res.json({success:true}); });
});
app.get('/contacts',(req,res)=>{ safeQuery("SELECT * FROM contacts ORDER BY id DESC",[],(err,result)=>{ if(err) return res.json({error:err.message}); res.json(result); }); });

const PORT=process.env.PORT||10000;
app.listen(PORT,'0.0.0.0',()=>console.log('Running',PORT));