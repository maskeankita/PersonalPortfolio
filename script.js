// ========================================
// STATIC PORTFOLIO - GITHUB PAGES
// ========================================


// ========================================
// PROJECTS
// ========================================

const projects = [

    {
        title: "Personal Portfolio",

        description:
            "A responsive personal portfolio website showcasing my skills, education, projects and contact information.",

        technologies:
            "HTML, CSS, JavaScript"
    },

    {
        title: "Library Management System",

        description:
            "A library management system developed using XML and XQuery to store and retrieve book and student information.",

        technologies:
            "XML, XQuery"
    },

    {
        title: "Student Management System",

        description:
            "A student management project for storing and managing student information.",

        technologies:
            "HTML, CSS, JavaScript"
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


    // Clear existing content

    container.innerHTML = "";


    // Create project cards

    projects.forEach((project) => {

        const card =
            document.createElement("div");

        card.className =
            "project-card";


        // ================================
        // PROJECT TITLE
        // ================================

        const title =
            document.createElement("h3");

        title.textContent =
            project.title;


        // ================================
        // PROJECT DESCRIPTION
        // ================================

        const description =
            document.createElement("p");

        description.textContent =
            project.description;


        // ================================
        // TECHNOLOGIES
        // ================================

        const technologies =
            document.createElement("p");


        const strong =
            document.createElement("strong");

        strong.textContent =
            "Technologies: ";


        technologies.appendChild(
            strong
        );


        technologies.appendChild(
            document.createTextNode(
                project.technologies
            )
        );


        // ================================
        // ADD CONTENT TO CARD
        // ================================

        card.appendChild(
            title
        );

        card.appendChild(
            description
        );

        card.appendChild(
            technologies
        );


        // ================================
        // ADD CARD TO CONTAINER
        // ================================

        container.appendChild(
            card
        );

    });

}


// ========================================
// CONTACT FORM
// ========================================

function setupContactForm() {

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    if (!contactForm) {

        console.log(
            "Contact form not found."
        );

        return;
    }


    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            // ============================
            // GET FORM INPUTS
            // ============================

            const nameInput =
                document.getElementById(
                    "name"
                );


            const emailInput =
                document.getElementById(
                    "email"
                );


            const messageInput =
                document.getElementById(
                    "message"
                );


            const name =
                nameInput.value.trim();


            const email =
                emailInput.value.trim();


            const message =
                messageInput.value.trim();


            // ============================
            // VALIDATION
            // ============================

            if (
                !name ||
                !email ||
                !message
            ) {

                alert(
                    "Please fill in all fields."
                );

                return;
            }


            // ============================
            // YOUR EMAIL ADDRESS
            // ============================

            const myEmail =
                "maskeankita12@gmail.com";


            // ============================
            // EMAIL SUBJECT
            // ============================

            const subject =
                encodeURIComponent(
                    "Portfolio Contact from " +
                    name
                );


            // ============================
            // EMAIL BODY
            // ============================

            const body =
                encodeURIComponent(

                    "Name: " +
                    name +

                    "\n\n" +

                    "Email: " +
                    email +

                    "\n\n" +

                    "Message:\n" +
                    message

                );


            // ============================
            // OPEN EMAIL APPLICATION
            // ============================

            window.location.href =
                "mailto:" +
                myEmail +
                "?subject=" +
                subject +
                "&body=" +
                body;


            // ============================
            // RESET FORM
            // ============================

            contactForm.reset();

        }
    );

}


// ========================================
// START WEBSITE
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadProjects();

        setupContactForm();

    }
);