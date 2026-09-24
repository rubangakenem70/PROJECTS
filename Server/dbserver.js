const API = "http://localhost:3000";
const tbBody = document.querySelector("#tb tbody");
const nameInput = document.getElementById("nameinput");

async function loadData() {
  try {
    const res = await fetch(`${API}/api/officers`);
    const data = await res.json();
    renderTable(data);
  } catch (e) {
    console.error("DB not loaded yet", e);
  }
}

function renderTable(data) {
  if(!tbBody) return;
  tbBody.innerHTML = "";
  data.forEach(officer => {
    tbBody.innerHTML += `
      <tr>
        <td>${officer.id}</td>
        <td>${officer.name}</td>
        <td>${officer.created_at? new Date(officer.created_at).toLocaleDateString() : '-'}</td>
        <td><button onclick="deleteOfficer(${officer.id})"><i class="fa-solid fa-trash"></i></button></td>
        <td><button onclick="editOfficer(${officer.id}, '${officer.name}')"><i class="fa-solid fa-pen"></i></button></td>
      </tr>`;
  });
}

document.getElementById("addbtn")?.addEventListener("click", async () => {
  const name = nameInput.value.trim();
  if (!name) return alert("Enter officer name");
  await fetch(`${API}/api/officers`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  });
  nameInput.value = "";
  loadData();
});

document.getElementById("viewallbtn")?.addEventListener("click", loadData);

document.getElementById("srchbtn")?.addEventListener("click", async () => {
  const term = document.getElementById("searchbar").value.trim();
  if (!term) return loadData();
  const res = await fetch(`${API}/api/officers/search/${term}`);
  const data = await res.json();
  renderTable(data);
});

async function deleteOfficer(id) {
  if (!confirm("Delete this officer?")) return;
  await fetch(`${API}/api/officers/${id}`, { method: "DELETE" });
  loadData();
}

async function editOfficer(id, oldName) {
  const newName = prompt("Edit officer name:", oldName);
  if (!newName) return;
  await fetch(`${API}/api/officers/${id}`, {
    method: "PUT", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: newName })
  });
  loadData();
}

document.getElementById("contactForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = {
    name: document.getElementById("c_name").value,
    email: document.getElementById("c_email").value,
    message: document.getElementById("c_message").value
  };
  const res = await fetch(`${API}/api/contact`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  const result = await res.json();
  document.getElementById("msgStatus").innerText = result.success? "Message sent!" : "Failed";
  e.target.reset();
});

loadData();