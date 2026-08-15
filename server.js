const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ==================================================
// SERVER PORT
// Railway automatically provides PORT.
// Local computer uses 3000.
// ==================================================

const PORT = process.env.PORT || 3000;


// ==================================================
// MIDDLEWARE
// ==================================================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Serve HTML, CSS, JavaScript, images, etc.
app.use(express.static(__dirname));


// ==================================================
// MYSQL CONFIGURATION CHECK
// ==================================================

console.log("=================================");
console.log("MYSQL CONFIG CHECK");
console.log("=================================");

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT || 3306);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PASSWORD exists:", !!process.env.DB_PASSWORD);

console.log("=================================");


// ==================================================
// MYSQL CONNECTION
// ==================================================

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


// ==================================================
// MYSQL CONNECT
// ==================================================

db.connect((err) => {

    if (err) {

        console.error("=================================");
        console.error("MYSQL CONNECTION FAILED");
        console.error("=================================");

        console.error("Error code:", err.code);
        console.error("Error message:", err.message);
        console.error("Error errno:", err.errno);
        console.error("Error sqlState:", err.sqlState);

        console.error("=================================");

        return;
    }

    console.log("=================================");
    console.log("MySQL connected successfully!");
    console.log("=================================");

});


// ==================================================
// BACKEND STATUS
// ==================================================

app.get("/api/status", (req, res) => {

    res.json({
        success: true,
        message: "Portfolio backend is running successfully!"
    });

});


// ==================================================
// GET PROJECTS FROM MYSQL
// ==================================================

app.get("/api/projects", (req, res) => {

    const sql = "SELECT * FROM projects";

    db.query(sql, (err, results) => {

        if (err) {

            console.error(
                "Database error while fetching projects:",
                err.message
            );

            return res.status(500).json({
                success: false,
                message: "Unable to fetch projects"
            });

        }

        res.json({
            success: true,
            projects: results
        });

    });

});


// ==================================================
// CONTACT FORM
// ==================================================

app.post("/api/contact", (req, res) => {

    const { name, email, message } = req.body;


    // Check required fields

    if (!name || !email || !message) {

        return res.status(400).json({
            success: false,
            message: "Please fill in all fields."
        });

    }


    // Insert contact message into MySQL

    const sql = `
        INSERT INTO contacts (name, email, message)
        VALUES (?, ?, ?)
    `;


    db.query(
        sql,
        [name, email, message],
        (err, result) => {

            if (err) {

                console.error(
                    "Contact database error:",
                    err.message
                );

                return res.status(500).json({
                    success: false,
                    message: "Unable to save your message."
                });

            }


            console.log(
                "New contact message saved. ID:",
                result.insertId
            );


            res.json({
                success: true,
                message: "Thank you! Your message has been received."
            });

        }
    );

});


// ==================================================
// START SERVER
// ==================================================

app.listen(PORT, "0.0.0.0", () => {

    console.log("=================================");
    console.log(`Portfolio server running on port ${PORT}`);
    console.log("=================================");

});





