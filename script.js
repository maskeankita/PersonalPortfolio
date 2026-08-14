// ================= PROJECTS =================

function loadProjects() {

    const container = document.getElementById("projects-container");

    if (!container) {
        return;
    }

    const projects = [

        {
            title: "Intelligent Automatic Bathroom Ventilation System",

            description:
                "An automatic bathroom ventilation system using ESP32 and DHT22 sensor. The system monitors humidity and automatically controls an exhaust fan when humidity increases.",

            technologies:
                "ESP32, DHT22, Arduino IDE, Embedded C"
        },

        {
            title: "Automatic Bell System using IoT",

            description:
                "An IoT-based automatic bell system designed to schedule and control a school bell automatically using a microcontroller and real-time clock.",

            technologies:
                "NodeMCU ESP8266, RTC DS3231, Arduino IDE, IoT"
        },

        {
            title: "Personal Portfolio Website",

            description:
                "A personal portfolio website showcasing my skills, education, projects, certifications, internship experience and contact information.",

            technologies:
                "HTML, CSS, JavaScript, GitHub Pages"
        }

    ];

    // Clear the loading message
    container.innerHTML = "";

    // Create project cards
    projects.forEach(function (project) {

        const card = document.createElement("div");

        card.className = "project-card";

        card.innerHTML = `
            <h3>${project.title}</h3>

            <p>
                ${project.description}
            </p>

            <p>
                <strong>Technologies:</strong>
                ${project.technologies}
            </p>
        `;

        container.appendChild(card);

    });
}


// ================= CONTACT FORM =================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const message =
            document.getElementById("message").value.trim();


        // Check if fields are empty
        if (!name || !email || !message) {

            alert("Please fill in all fields.");

            return;
        }


        // Prepare email
        const subject = encodeURIComponent(
            "Portfolio Contact from " + name
        );

        const body = encodeURIComponent(
            "Name: " + name +
            "\nEmail: " + email +
            "\n\nMessage:\n" + message
        );


        // Open user's email application
        window.location.href =
            "mailto:maskeankita12@gmail.com" +
            "?subject=" + subject +
            "&body=" + body;

    });

}


// ================= START WEBSITE =================

document.addEventListener("DOMContentLoaded", function () {

    loadProjects();

});