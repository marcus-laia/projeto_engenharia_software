const mysql = require("mysql");

let pw = prompt("Input password");

const db = mysql.createConnection({
    host: "",
    port: "",
    user: "",
    password: pw,
    database: ""
});

db.connect((err) => {
    if (err) {
        console.log(err.message);
        return;
    }
    console.log("Database connected");
});