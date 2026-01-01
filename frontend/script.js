const token = localStorage.getItem("token");
if (!token && window.location.pathname.includes("dashboard")) {
  window.location.href = "index.html";
}

// Déconnexion
document.getElementById("logoutBtn")?.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "index.html";
});

// Helper fetch avec auth
async function api(url, options={}) {
  options.headers = { ...(options.headers||{}), "Authorization": "Bearer " + token, "Content-Type":"application/json"};
  const res = await fetch(url, options);
  return res.json();
}

// ---- DOMAINES ----
async function loadDomains() {
  const domains = await api("http://localhost:4000/domains");
  const ul = document.getElementById("domainList");
  const select = document.getElementById("quoteDomain");
  ul.innerHTML = "";
  select.innerHTML = "";
  domains.forEach(d => {
    ul.innerHTML += `<li>${d.domain}</li>`;
    select.innerHTML += `<option value="${d.id}">${d.domain}</option>`;
  });
}
document.getElementById("addDomainBtn")?.addEventListener("click", async () => {
  const value = document.getElementById("domainInput").value;
  if(!value) return alert("Entrez un domaine");
  await api("http://localhost:4000/domains", { method:"POST", body: JSON.stringify({domain: value}) });
  document.getElementById("domainInput").value="";
  loadDomains();
});

// ---- AUTEURS ----
async function loadAuthors() {
  const authors = await api("http://localhost:4000/authors");
  const ul = document.getElementById("authorList");
  const select = document.getElementById("quoteAuthor");
  ul.innerHTML = "";
  select.innerHTML = "";
  authors.forEach(a => {
    ul.innerHTML += `<li>${a.name} - ${a.bio}</li>`;
    select.innerHTML += `<option value="${a.id}">${a.name}</option>`;
  });
}
document.getElementById("addAuthorBtn")?.addEventListener("click", async () => {
  const name = document.getElementById("authorName").value;
  const bio = document.getElementById("authorBio").value;
  if(!name) return alert("Entrez un nom d'auteur");
  await api("http://localhost:4000/authors", { method:"POST", body: JSON.stringify({name,bio}) });
  document.getElementById("authorName").value="";
  document.getElementById("authorBio").value="";
  loadAuthors();
});

// ---- CITATIONS ----
async function loadQuotes() {
  const quotes = await api("http://localhost:4000/quotes");
  const ul = document.getElementById("quoteList");
  ul.innerHTML = "";
  quotes.forEach(q => {
    ul.innerHTML += `<li>"${q.quote}" (${q.reference || 'Sans référence'}) - ${q.author} [${q.domain}]</li>`;
  });
}
document.getElementById("addQuoteBtn")?.addEventListener("click", async () => {
  const quote = document.getElementById("quoteText").value;
  const reference = document.getElementById("quoteRef").value;
  const author_id = document.getElementById("quoteAuthor").value;
  const domain_id = document.getElementById("quoteDomain").value;
  if(!quote || !author_id || !domain_id) return alert("Remplissez tous les champs");
  await api("http://localhost:4000/quotes", { method:"POST", body: JSON.stringify({quote,reference,author_id,domain_id}) });
  document.getElementById("quoteText").value="";
  document.getElementById("quoteRef").value="";
  loadQuotes();
});

// Initial load
loadDomains();
loadAuthors();
loadQuotes();
