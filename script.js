// ================= LOAD PROJECTS =================

async function loadProjects() {
    const container = document.getElementById("projects-container");

    try {
        const response = await fetch("/api/projects");
        const data = await response.json();

        if (!data.success) {
            container.innerHTML = "<p>Unable to load projects.</p>";
            return;
        }

        container.innerHTML = "";

        data.projects.forEach((project) => {
            const card = document.createElement("div");

            card.className = "project-card";

            card.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <p>
                    <strong>Technologies:</strong>
                    ${project.technologies}
                </p>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error(error);

        container.innerHTML = `
            <p>Unable to connect to the server.</p>
        `;
    }
}


// ================= CONTACT FORM =================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        try {

            const response = await fetch("/api/contact", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message
                })
            });

            const data = await response.json();

            alert(data.message);

            if (data.success) {
                contactForm.reset();
            }

        } catch (error) {

            console.error(error);

            alert("Unable to send message.");

        }
    });
}


// ================= START =================

loadProjects();