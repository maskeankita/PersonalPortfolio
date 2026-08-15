// ========================================
// PROJECTS
// ========================================

async function loadProjects() {
    const container = document.getElementById("projects-container");

    if (!container) {
        console.error("ERROR: projects-container not found.");
        return;
    }

    try {
        console.log("Loading projects...");

        const response = await fetch("/api/projects");

        console.log("API status:", response.status);

        if (!response.ok) {
            throw new Error(
                `Server returned status ${response.status}`
            );
        }

        const data = await response.json();

        console.log("Projects API response:", data);

        if (!data.success) {
            container.innerHTML = `
                <p>Unable to load projects.</p>
            `;
            return;
        }

        if (!data.projects || data.projects.length === 0) {
            container.innerHTML = `
                <p>No projects available.</p>
            `;
            return;
        }

        // Clear loading message
        container.innerHTML = "";

        // Create project cards
        data.projects.forEach((project) => {
            const card = document.createElement("div");

            card.className = "project-card";

            const title = document.createElement("h3");
            title.textContent = project.title || "Untitled Project";

            const description = document.createElement("p");
            description.textContent =
                project.description || "No description available.";

            const technologies = document.createElement("p");

            const strong = document.createElement("strong");
            strong.textContent = "Technologies: ";

            technologies.appendChild(strong);
            technologies.appendChild(
                document.createTextNode(
                    project.technologies || "Not specified"
                )
            );

            card.appendChild(title);
            card.appendChild(description);
            card.appendChild(technologies);

            container.appendChild(card);
        });

    } catch (error) {
        console.error("Project loading error:", error);

        container.innerHTML = `
            <p>Unable to connect to the server.</p>
        `;
    }
}


// ========================================
// CONTACT FORM
// ========================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const messageInput = document.getElementById("message");

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

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

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Contact request failed"
                );
            }

            alert(data.message);

            if (data.success) {
                contactForm.reset();
            }

        } catch (error) {

            console.error(
                "Contact form error:",
                error
            );

            alert("Unable to send message.");
        }
    });
}


// ========================================
// START
// ========================================

document.addEventListener("DOMContentLoaded", () => {
    loadProjects();
});