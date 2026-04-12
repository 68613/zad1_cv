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