const themeBtn = document.getElementById("themeBtn");
const link = document.querySelector("link");

let isRed = true;

themeBtn.addEventListener("click", () => {
    if (isRed) {
        link.href = "green.css";
    } else {
        link.href = "red.css";
    }
    isRed = !isRed;
});


const toggleBtn = document.getElementById("toggleSection");
const section = document.getElementById("skills");

toggleBtn.addEventListener("click", () => {
    if (section.style.display === "none") {
        section.style.display = "block";
    } else {
        section.style.display = "none";
    }
});


const form = document.getElementById("contactForm");

const nameInput = document.getElementById("name");
const surnameInput = document.getElementById("surname");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const surnameError = document.getElementById("surnameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const surname = surnameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    let isValid = true;

    // очистка ошибок
    nameError.textContent = "";
    surnameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";

    const textRegex = /^[A-Za-zÀ-ž\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // имя
    if (name === "") {
        nameError.textContent = "Imię jest wymagane";
        isValid = false;
    } else if (!textRegex.test(name)) {
        nameError.textContent = "Imię nie może zawierać cyfr";
        isValid = false;
    }

    // фамилия
    if (surname === "") {
        surnameError.textContent = "Nazwisko jest wymagane";
        isValid = false;
    } else if (!textRegex.test(surname)) {
        surnameError.textContent = "Nazwisko nie może zawierać cyfr";
        isValid = false;
    }

    // email
    if (email === "") {
        emailError.textContent = "Email jest wymagany";
        isValid = false;
    } else if (!emailRegex.test(email)) {
        emailError.textContent = "Niepoprawny email";
        isValid = false;
    }

    // сообщение
    if (message === "") {
        messageError.textContent = "Wiadomość jest wymagana";
        isValid = false;
    }

    if (isValid) {
    fetch("http://localhost:3000/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            surname,
            email,
            message
        })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        form.reset();
    })
    .catch(() => {
        alert("Błąd połączenia z serwerem");
    });
}
});


// ---------------- JSON FETCH (ZADANIE 6) ----------------
fetch("data.json")
    .then(response => response.json())
    .then(data => {
        const skillsList = document.getElementById("skillsList");
        const projectsList = document.getElementById("projectsList");

        // skills
        data.skills.forEach(skill => {
            const li = document.createElement("li");
            li.textContent = skill;
            skillsList.appendChild(li);
        });

        // projects
        data.projects.forEach(project => {
            const li = document.createElement("li");
            li.textContent = project;
            projectsList.appendChild(li);
        });
    })
    .catch(error => {
        console.error("Błąd JSON:", error);
    });


// ---------------- LOCAL STORAGE (ZADANIE 7) ----------------
const noteInput = document.getElementById("noteInput");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesList = document.getElementById("notesList");

// загрузка
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// отображение
function renderNotes() {
    notesList.innerHTML = "";

    notes.forEach((note, index) => {
        const li = document.createElement("li");
        li.textContent = note;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Usuń";
        deleteBtn.style.marginLeft = "10px";

        deleteBtn.addEventListener("click", () => {
            notes.splice(index, 1);
            localStorage.setItem("notes", JSON.stringify(notes));
            renderNotes();
        });

        li.appendChild(deleteBtn);
        notesList.appendChild(li);
    });
}

addNoteBtn.addEventListener("click", () => {
    const value = noteInput.value.trim();

    if (value === "") return;

    notes.push(value);
    localStorage.setItem("notes", JSON.stringify(notes));

    noteInput.value = "";
    renderNotes();
});

noteInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addNoteBtn.click();
    }
});

renderNotes();