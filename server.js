// ========================================
// PERSONAL PORTFOLIO SERVER
// MySQL-free version
// ========================================

const express = require("express");

const path = require("path");

const app = express();


// ========================================
// PORT
// ========================================

// Railway or another hosting service provides
// process.env.PORT automatically.
//
// When running locally, port 3000 is used.

const PORT =
    process.env.PORT || 3000;


// ========================================
// MIDDLEWARE
// ========================================

app.use(
    express.json()
);


app.use(
    express.urlencoded({
        extended: true
    })
);


// ========================================
// SERVE PORTFOLIO FILES
// ========================================

app.use(
    express.static(__dirname)
);


// ========================================
// HOME PAGE
// ========================================

app.get("/", function (req, res) {

    res.sendFile(
        path.join(
            __dirname,
            "index.html"
        )
    );

});


// ========================================
// BACKEND STATUS
// ========================================

app.get(
    "/api/status",
    function (req, res) {

        res.json({

            success: true,

            message:
                "Portfolio backend is running successfully!"

        });

    }
);


// ========================================
// 404 HANDLER
// ========================================

app.use(
    function (req, res) {

        res.status(404).send(
            "Page not found."
        );

    }
);


// ========================================
// START SERVER
// ========================================

app.listen(
    PORT,
    "0.0.0.0",
    function () {

        console.log(
            "================================="
        );

        console.log(
            "Portfolio server running on port " +
            PORT
        );

        console.log(
            "================================="
        );

        console.log(
            "Open: http://localhost:" +
            PORT
        );

        console.log(
            "================================="
        );

    }
);