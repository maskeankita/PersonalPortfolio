// ========================================
// PERSONAL PORTFOLIO
// ========================================


// ========================================
// PROJECT DATA
// ========================================

const projects = [
    {
        title: "Automatic Bell System using IoT",

        description:
            "An IoT-based automatic bell system designed to automate scheduled bell operations.",

        technologies:
            "NodeMCU ESP8266, RTC DS3231, LCD, Relay and Buzzer"
    },

    {
        title: "Automated Bathroom Ventilation Using Humidity Sensor",

        description:
            "An ESP32-based automatic bathroom ventilation system that monitors humidity using a DHT22 sensor and automatically controls an exhaust fan.",

        technologies:
            "ESP32, DHT22 Sensor, Relay Module, Exhaust Fan, Arduino IDE, Embedded C/C++, Bluetooth"
    }
];


// ========================================
// DISPLAY PROJECTS
// ========================================

function loadProjects() {

    const container =
        document.getElementById("projects-container");

    if (!container) {
        console.error("projects-container not found.");
        return;
    }

    container.innerHTML = "";

    projects.forEach(function (project) {

        const card = document.createElement("div");

        card.className = "project-card";


        // Project title
        const title = document.createElement("h3");

        title.textContent = project.title;


        // Project description
        const description = document.createElement("p");

        description.textContent = project.description;


        // Technologies
        const technologyText = document.createElement("p");

        const technologyLabel =
            document.createElement("strong");

        technologyLabel.textContent = "Technologies: ";

        technologyText.appendChild(technologyLabel);

        technologyText.appendChild(
            document.createTextNode(
                project.technologies
            )
        );


        // Add elements to card
        card.appendChild(title);

        card.appendChild(description);

        card.appendChild(technologyText);


        // Add card to page
        container.appendChild(card);
    });
}


// ========================================
// CONTACT FORM
// ========================================

function setupContactForm() {

    const contactForm =
        document.getElementById("contactForm");

    if (!contactForm) {
        console.log("Contact form not found.");
        return;
    }


    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById("name")
                    ?.value.trim();

            const email =
                document.getElementById("email")
                    ?.value.trim();

            const message =
                document.getElementById("message")
                    ?.value.trim();


            // Validate
            if (!name || !email || !message) {

                alert(
                    "Please fill in all fields."
                );

                return;
            }


            // ====================================
            // YOUR EMAIL ADDRESS
            // ====================================

            const myEmail =
                "maskeankita12@gmail.com";


            // ====================================
            // EMAIL SUBJECT
            // ====================================

            const subject =
                encodeURIComponent(
                    "Portfolio Contact - " + name
                );


            // ====================================
            // EMAIL MESSAGE
            // ====================================

            const body =
                encodeURIComponent(
                    "Name: " +
                    name +

                    "\n\nEmail: " +
                    email +

                    "\n\nMessage:\n" +
                    message
                );


            // ====================================
            // OPEN EMAIL APPLICATION
            // ====================================

            window.location.href =
                "mailto:" +
                myEmail +
                "?subject=" +
                subject +
                "&body=" +
                body;


            // Clear form
            contactForm.reset();
        }
    );
}


// ========================================
// PAGE START
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadProjects();

        setupContactForm();

    }
);