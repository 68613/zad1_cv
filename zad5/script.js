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

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const surname = document.getElementById("surname").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    let isValid = true;

    document.getElementById("nameError").textContent = "";
    document.getElementById("surnameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("messageError").textContent = "";

    const textRegex = /^[A-Za-zÀ-ž\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === "") {
        document.getElementById("nameError").textContent = "Imię jest wymagane";
        isValid = false;
    } else if (!textRegex.test(name)) {
        document.getElementById("nameError").textContent = "Imię nie może zawierać cyfr";
        isValid = false;
    }

    if (surname === "") {
        document.getElementById("surnameError").textContent = "Nazwisko jest wymagane";
        isValid = false;
    } else if (!textRegex.test(surname)) {
        document.getElementById("surnameError").textContent = "Nazwisko nie może zawierać cyfr";
        isValid = false;
    }

    if (email === "") {
        document.getElementById("emailError").textContent = "Email jest wymagany";
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById("emailError").textContent = "Niepoprawny adres email";
        isValid = false;
    }

    if (message === "") {
        document.getElementById("messageError").textContent = "Wiadomość jest wymagana";
        isValid = false;
    }

    if (isValid) {
        alert("Formularz został wysłany poprawnie!");
        form.reset();
    }
});