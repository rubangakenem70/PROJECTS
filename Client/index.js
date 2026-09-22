const API = "http://localhost:3000";
document.addEventListener('DOMContentLoaded',()=>{
 loadData();
 document.getElementById('addbtn').onclick=addName;
 document.getElementById('viewallbtn').onclick=loadData;
 document.getElementById('srchbtn').onclick=searchName;
 document.getElementById('contactForm')?.addEventListener('submit', async (e)=>{
   e.preventDefault();
   const payload={ name:document.getElementById('c_name').value, email:document.getElementById('c_email').value, message:document.getElementById('c_message').value };
   const res=await fetch(`${API}/contacts`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
   const r=await res.json();
   if(r.success){ alert("✅ SAVED TO DB!"); e.target.reset(); }
 });
});
function loadData(){ fetch(`${API}/getall`).then(r=>r.json()).then(d=>{ console.log(d); renderTable(d); }); }
function renderTable(data){
 const tbody=document.querySelector('#tb tbody');
 if(!data||data.length==0){ tbody.innerHTML='<tr><td colspan="5" style="color:black">No officers yet</td></tr>'; return; }
 tbody.innerHTML = data.map(row=>`
     <tr>
       <td>${row.id}</td>
       <td>${row.name}</td>
       <td>${new Date(row.date_added).toLocaleDateString()}</td>
       <td><button onclick="deleteRow(${row.id})">Delete</button></td>
       <td><button onclick="editRow(${row.id})">Edit</button></td>
     </tr>`).join('');
}
function addName(){
 const input=document.getElementById('nameinput');
 const name=input.value.trim();
 if(!name) return alert("Enter officer name!");
 fetch(`${API}/insert`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name})})
 .then(r=>r.json()).then(()=>{ input.value=""; loadData(); });
}
function deleteRow(id){ if(!confirm("Delete officer "+id+"?")) return; fetch(`${API}/delete/${id}`,{method:'DELETE'}).then(()=>loadData()); }
function editRow(id){ const n=prompt("New officer name:"); if(!n) return; fetch(`${API}/update/${id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:n})}).then(()=>loadData()); }
function searchName(){ const q=document.getElementById('searchbar').value.trim(); if(!q) return loadData(); fetch(`${API}/search/${q}`).then(r=>r.json()).then(renderTable); }