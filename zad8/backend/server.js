const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/send", (req, res) => {
    const newData = req.body;

    let data = [];

    if (fs.existsSync("data.json")) {
        data = JSON.parse(fs.readFileSync("data.json"));
    }

    data.push(newData);

    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));

    res.json({ message: "Dane zapisane!" });
});

app.listen(3000, () => {
    console.log("Server działa: http://localhost:3000");
});