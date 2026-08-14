// ================= PROJECTS =================

async function loadProjects() {

    const container = document.getElementById("projects-container");

    if (!container) {
        return;
    }

    try {

        const response = await fetch("/api/projects");

        if (!response.ok) {
            throw new Error("Failed to fetch projects");
        }

        const data = await response.json();

        if (!data.success) {

            container.innerHTML = `
                <p>Unable to load projects.</p>
            `;

            return;
        }

        container.innerHTML = "";

        if (!data.projects || data.projects.length === 0) {

            container.innerHTML = `
                <p>No projects available.</p>
            `;

            return;
        }

        data.projects.forEach((project) => {

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

    } catch (error) {

        console.error("Project loading error:", error);

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

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {

            alert("Please fill in all fields.");

            return;
        }

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

            if (!response.ok) {
                throw new Error("Contact request failed");
            }

            const data = await response.json();

            alert(data.message);

            if (data.success) {
                contactForm.reset();
            }

        } catch (error) {

            console.error("Contact form error:", error);

            alert("Unable to send message.");
        }
    });
}


// ================= START =================

loadProjects();