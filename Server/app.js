const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let db; try{ db=require('./dbserver'); }catch(e){ console.log("DB error",e.message); }
function safeQuery(sql,params,cb){ if(!db) return cb(new Error("DB not connected"),null); db.query(sql,params,(err,res)=>{ if(err) return cb(err,null); cb(null,res); }); }

// ===== FULL PINNACLE SECURITY WEBSITE =====
const websiteHTML = `
<!DOCTYPE html>
<html><head><title>Pinnacle Security Limited - Kotido, Uganda</title><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:Arial, sans-serif;background:#f8f9fa;color:#333}
.nav{background:#0a1931;padding:15px 30px;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:100}
.nav h1{color:#ffcc00;font-size:22px}.nav a{color:white;text-decoration:none;margin-left:20px;font-weight:bold}.nav a:hover{color:#ffcc00}
.hero{background:linear-gradient(rgba(10,25,49,0.9),rgba(10,25,49,0.8)),url('https://images.unsplash.com/photo-1557597774-9d273605dfa9');background-size:cover;color:white;padding:100px 20px;text-align:center}
.hero h2{font-size:48px;color:#ffcc00;margin-bottom:15px}.hero p{font-size:20px;max-width:700px;margin:0 auto 30px}
.btn{background:#ffcc00;color:#0a1931;padding:14px 30px;border-radius:30px;text-decoration:none;font-weight:bold;display:inline-block}
.section{padding:60px 20px;max-width:1100px;margin:0 auto}.section h2{text-align:center;color:#0a1931;font-size:36px;margin-bottom:10px}.line{width:80px;height:4px;background:#ffcc00;margin:0 auto 40px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:25px}
.card{background:white;padding:25px;border-radius:12px;box-shadow:0 5px 15px rgba(0,0,0,0.1);border-top:4px solid #ffcc00}
.card h3{color:#0a1931;margin-bottom:10px}
.contact-box{background:#0a1931;color:white;padding:40px;border-radius:15px;display:grid;grid-template-columns:1fr 1fr;gap:30px}
@media(max-width:700px){.contact-box{grid-template-columns:1fr}.hero h2{font-size:32px}}
input,textarea{width:100%;padding:12px;margin:8px 0;border-radius:8px;border:none}button{background:#ffcc00;color:#0a1931;padding:14px;width:100%;border:none;border-radius:8px;font-weight:bold;font-size:16px;cursor:pointer}
.footer{background:#050e1f;color:#aaa;padding:30px;text-align:center;margin-top:40px}
</style></head><body>
<div class="nav"><h1>🔐 PINNACLE SECURITY LTD</h1><div><a href="/">Home</a><a href="#services">Services</a><a href="#contact">Contact</a><a href="/view-db" style="color:#ffcc00">Admin</a></div></div>

<div class="hero">
<h2>Your Safety Is Our Priority</h2>
<p>Professional Security Services in Kotido, Karamoja & Across Uganda. Licensed Guards, CCTV, Alarm Systems & VIP Protection.</p>
<a class="btn" href="#contact">Get Protected Now</a>
</div>

<div class="section" id="services">
<h2>Our Services</h2><div class="line"></div>
<div class="grid">
<div class="card"><h3>🛡️ Armed & Unarmed Guards</h3><p>Trained, vetted and licensed security officers for homes, businesses, NGOs, schools and government.</p></div>
<div class="card"><h3>📹 CCTV & Alarm Installation</h3><p>Modern surveillance systems, motion sensors and 24/7 monitoring for your property.</p></div>
<div class="card"><h3>🚨 Rapid Response</h3><p>Quick emergency response team in Kotido and Moroto district, day and night.</p></div>
<div class="card"><h3>👤 VIP & Escort Protection</h3><p>Professional close protection for individuals, cash in transit and events.</p></div>
<div class="card"><h3>🏫 Security Training</h3><p>We train private guards and community security groups with certified curriculum.</p></div>
<div class="card"><h3>🔍 Security Assessment</h3><p>Free risk assessment for your home or business in Kotido region.</p></div>
</div>
</div>

<div class="section" id="contact">
<h2>Contact Us</h2><div class="line"></div>
<div class="contact-box">
<div>
<h3 style="color:#ffcc00">Get In Touch</h3><br>
<p>📍 Kotido Central, Kotido District, Uganda</p><br>
<p>📞 +256 700 000 000</p><br>
<p>✉️ info@pinnaclesecurity.co.ug</p><br>
<p>🕒 24/7 Service - Always Ready</p><br><br>
<p>We serve: Kotido, Moroto, Kaabong, Abim, Napak & all Karamoja</p>
</div>
<div style="background:white;padding:20px;border-radius:10px">
<h3 style="color:#0a1931">Send Message</h3>
<input id="n" placeholder="Your Full Name" style="border:1px solid #ccc">
<input id="e" placeholder="Your Email" style="border:1px solid #ccc">
<textarea id="m" rows="4" placeholder="How can we secure you?" style="border:1px solid #ccc"></textarea>
<button onclick="sendMsg()">Send Message</button>
<p id="ok" style="display:none;color:green;margin-top:10px;font-weight:bold">✅ Thank you! We will contact you within 1 hour!</p>
<p id="err" style="display:none;color:red;margin-top:10px"></p>
</div>
</div>
</div>

<div class="footer">
<p><b style="color:#ffcc00">PINNACLE SECURITY LIMITED</b> | Licensed by Uganda Police Force | PSU Registration</p>
<p style="margin-top:10px">© 2026 Pinnacle Security Limited - Kotido, Uganda. All Rights Reserved.</p>
</div>

<script>
async function sendMsg(){
 const n=document.getElementById('n').value, e=document.getElementById('e').value, m=document.getElementById('m').value;
 if(!n||!e||!m) return alert('Please fill all fields');
 try{
  let r=await fetch('/contacts',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:n,email:e,message:m})});
  let d=await r.json();
  if(d.success){document.getElementById('ok').style.display='block'; document.getElementById('n').value='';document.getElementById('e').value='';document.getElementById('m').value='';}
  else throw new Error(d.error);
 }catch(er){document.getElementById('err').style.display='block'; document.getElementById('err').innerText='Error: '+er.message;}
}
</script>
</body></html>
`;

app.get('/', (req,res)=> res.send(websiteHTML));
app.get('/client', (req,res)=> res.send(websiteHTML));

app.get('/view-db', (req,res)=>{
 safeQuery("SELECT * FROM contacts ORDER BY id DESC",[],(err,contacts)=>{
  if(err) return res.send(`<h2>DB Error: ${err.message}</h2><a href="/">Back to Website</a>`);
  let rows=contacts.map(c=>`<tr><td>${c.id}</td><td>${c.name}</td><td>${c.email}</td><td>${c.message}</td><td>${c.date_added}</td></tr>`).join('');
  res.send(`<body style="font-family:Arial;padding:20px"><h1>Admin - ${contacts.length} Messages</h1><a href="/" style="background:#0a1931;color:#ffcc00;padding:10px 20px;text-decoration:none;border-radius:20px">View Website</a><br><br><table border=1 cellpadding=10 style="border-collapse:collapse;width:100%"><tr style="background:#0a1931;color:#ffcc00"><th>ID</th><th>Name</th><th>Email</th><th>Message</th><th>Date</th></tr>${rows}</table></body>`);
 });
});

app.post('/contacts',(req,res)=>{
 const {name,email,message}=req.body;
 safeQuery("INSERT INTO contacts (name,email,message) VALUES (?,?,?)",[name,email,message],(err)=>{ if(err) return res.json({error:err.message}); res.json({success:true}); });
});
app.get('/contacts',(req,res)=>{ safeQuery("SELECT * FROM contacts ORDER BY id DESC",[],(err,result)=>{ if(err) return res.json({error:err.message}); res.json(result); }); });

const PORT=process.env.PORT||10000;
app.listen(PORT,'0.0.0.0',()=>console.log('Running',PORT));