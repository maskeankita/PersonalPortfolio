const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// ================= MIDDLEWARE =================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve HTML, CSS and JavaScript files
app.use(express.static(__dirname));

// ================= MYSQL CONNECTION =================

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error("MySQL connection failed:", err.message);
        return;
    }

    console.log("MySQL connected successfully!");
});

// ================= BACKEND STATUS =================

app.get("/api/status", (req, res) => {
    res.json({
        success: true,
        message: "Portfolio backend is running successfully!"
    });
});

// ================= GET PROJECTS FROM MYSQL =================

app.get("/api/projects", (req, res) => {

    const sql = "SELECT * FROM projects";

    db.query(sql, (err, results) => {

        if (err) {
            console.error("Database error:", err.message);

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

// ================= CONTACT FORM =================

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
// ================= START SERVER =================

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Portfolio server running on port ${PORT}`);
});