// ========================================
// YOUR PROJECTS
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
// LOAD PROJECTS
// ========================================

function loadProjects() {

    const container =
        document.getElementById("projects-container");

    if (!container) {
        console.error(
            "ERROR: projects-container not found."
        );
        return;
    }

    container.innerHTML = "";

    projects.forEach((project) => {

        const card =
            document.createElement("div");

        card.className = "project-card";


        // Project title
        const title =
            document.createElement("h3");

        title.textContent =
            project.title;


        // Project description
        const description =
            document.createElement("p");

        description.textContent =
            project.description;


        // Technologies
        const technologies =
            document.createElement("p");

        const strong =
            document.createElement("strong");

        strong.textContent =
            "Technologies: ";

        technologies.appendChild(strong);

        technologies.appendChild(
            document.createTextNode(
                project.technologies
            )
        );


        // Add everything to card
        card.appendChild(title);

        card.appendChild(description);

        card.appendChild(technologies);


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


            const nameInput =
                document.getElementById("name");

            const emailInput =
                document.getElementById("email");

            const messageInput =
                document.getElementById("message");


            const name =
                nameInput.value.trim();

            const email =
                emailInput.value.trim();

            const message =
                messageInput.value.trim();


            // Validate
            if (!name || !email || !message) {

                alert(
                    "Please fill in all fields."
                );

                return;
            }


            // YOUR EMAIL
            const myEmail =
                "maskeankita12@gmail.com";


            // Email subject
            const subject =
                encodeURIComponent(
                    "Portfolio Contact from " + name
                );


            // Email body
            const body =
                encodeURIComponent(
                    "Name: " +
                    name +
                    "\n\nEmail: " +
                    email +
                    "\n\nMessage:\n" +
                    message
                );


            // Open email application
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
// START
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadProjects();

        setupContactForm();

    }
);