// ---------- 1. Select elements ----------
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const list = document.querySelector("#notes-list");
const count = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");

// ---------- 2. Storage and data ----------
const STORAGE_KEY = "quicknotes";

function loadNotes() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

let notes = loadNotes();

// ---------- 3. Count message ----------
function countMessage() {
  if (notes.length === 0) return "You have no notes yet.";
  if (notes.length === 1) return "You have 1 note.";
  return `You have ${notes.length} notes.`;
}

// ---------- 4. Render (with search filter) ----------
function render() {
  list.innerHTML = ""; // safe: contains no user text

  const term = searchInput.value.trim().toLowerCase();
  const visible = notes.filter((note) =>
    note.text.toLowerCase().includes(term)
  );

  if (visible.length === 0 && term !== "") {
    const empty = document.createElement("li");
    empty.classList.add("empty");
    empty.textContent = "No notes match your search.";
    list.appendChild(empty);
  }

  visible.forEach((note) => {
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
    del.addEventListener("click", () => deleteNote(note.id));

    li.appendChild(info);
    li.appendChild(del);
    list.appendChild(li);
  });

  count.textContent = countMessage();
}

// ---------- 5. Add and delete ----------
function addNote(text, category) {
  notes.push({
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString(),
  });
  saveNotes();
  render();
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
}

// ---------- 6. Events ----------
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }
  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";
  addNote(text, categorySelect.value);
  input.value = "";
  input.focus();
});

searchInput.addEventListener("input", render);

// ---------- 7. First draw ----------
render();

// ---------- 8. Bonus: clear all ----------
const clearAllBtn = document.querySelector("#clear-all");

clearAllBtn.addEventListener("click", () => {
  if (notes.length > 0 && confirm("Delete all notes?")) {
    notes = [];
    saveNotes();
    render();
  }
});
