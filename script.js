// ---------- 1. Select elements ----------
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const list = document.querySelector("#notes-list");
const count = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");

// ---------- 2. Data ----------
let notes = [];

// ---------- 3. Render ----------
function render() {
  list.innerHTML = ""; // safe: no user text

  notes.forEach((note) => {
    const li = document.createElement("li");
    li.classList.add("note", `category-${note.category}`);

    const info = document.createElement("div");
    info.classList.add("note-info");

    const text = document.createElement("span");
    text.textContent = note.text;

    const meta = document.createElement("small");
    meta.classList.add("note-meta");
    const label = note.category.charAt(0).toUpperCase() + note.category.slice(1);
    meta.textContent = `${label} · ${note.createdAt}`;

    info.appendChild(text);
    info.appendChild(meta);

    const del = document.createElement("button");
    del.textContent = "Delete";
    del.classList.add("delete-btn");

    li.appendChild(info);
    li.appendChild(del);
    list.appendChild(li);
  });
}

// ---------- 4. Add ----------
function addNote(text, category) {
  notes.push({
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString(),
  });
  render();
}

// ---------- 5. Events ----------
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  addNote(text, categorySelect.value);
  input.value = "";
  input.focus();
});

render();
