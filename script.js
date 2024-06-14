const addButton = document.getElementById("add");
const searchInput = document.getElementById("search");
const searchButton = document.getElementById("search-btn");
let notes = JSON.parse(localStorage.getItem("notes")) || [];

const updateLocalStorage = () => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

const addNewNote = (noteObj = { id: Date.now(), text: "", title: "" }) => {
  const note = document.createElement("div");
  note.classList.add("note");

  note.innerHTML = `
    <div class="tools">
      <input type="text" class="title" value="${noteObj.title}" placeholder="Title">
      <div>
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
      </div>
    </div>
    <div class="main ${noteObj.text ? "" : "hidden"}"></div>
    <textarea class="${noteObj.text ? "hidden" : ""}"></textarea>
  `;

  const editButton = note.querySelector(".edit");
  const deleteButton = note.querySelector(".delete");
  const main = note.querySelector(".main");
  const textArea = note.querySelector("textarea");
  const titleInput = note.querySelector(".title");

  textArea.value = noteObj.text;
  main.innerHTML = marked(noteObj.text);

  deleteButton.addEventListener("click", () => {
    note.remove();
    notes = notes.filter(n => n.id !== noteObj.id);
    updateLocalStorage();
  });

  editButton.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  textArea.addEventListener("input", (e) => {
    const { value } = e.target;
    main.innerHTML = marked(value);
    noteObj.text = value;
    updateLocalStorage();
  });

  titleInput.addEventListener("input", (e) => {
    noteObj.title = e.target.value;
    updateLocalStorage();
  });

  document.body.appendChild(note);
};

addButton.addEventListener("click", () => {
  const newNote = { id: Date.now(), text: "", title: "" };
  notes.push(newNote);
  addNewNote(newNote);
  updateLocalStorage();
});

if (notes.length) {
  notes.forEach(addNewNote);
}

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  document.querySelectorAll(".note").forEach(note => {
    const title = note.querySelector(".title").value.toLowerCase();
    const text = note.querySelector("textarea").value.toLowerCase();
    if (title.includes(searchTerm) || text.includes(searchTerm)) {
      note.style.display = "block";
    } else {
      note.style.display = "none";
    }
  });
});

searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value.toLowerCase();
  document.querySelectorAll(".note").forEach(note => {
    const title = note.querySelector(".title").value.toLowerCase();
    const text = note.querySelector("textarea").value.toLowerCase();
    if (title.includes(searchTerm) || text.includes(searchTerm)) {
      note.style.display = "block";
    } else {
      note.style.display = "none";
    }
  });
});
