const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || message === "") {
        alert("Please fill in all the fields.");
        return;
    }

    fetch("/api/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
            message: message
        })
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            if (data.success) {
                alert(data.message);
                contactForm.reset();
            } else {
                alert("Something went wrong.");
            }
        })
        .catch(function (error) {

            console.error("Error:", error);
            alert("Unable to send your message.");
        });
});


const navigationLinks = document.querySelectorAll("nav a");

navigationLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (targetId.startsWith("#")) {

            const targetSection = document.querySelector(targetId);

            if (targetSection) {

                event.preventDefault();

                targetSection.scrollIntoView({
                    behavior: "smooth"
                });

            }
        }
    });

});
// ================= LOAD PROJECTS FROM MYSQL =================

const projectsContainer = document.getElementById("projects-container");

if (projectsContainer) {

    fetch("/api/projects")
        .then(function (response) {
            return response.json();
        })
        .then(function (projects) {

            projectsContainer.innerHTML = "";

            projects.forEach(function (project) {

                const projectCard = document.createElement("div");

                projectCard.className = "project-card";

                projectCard.innerHTML = `
                    <h3>${project.title}</h3>

                    <p>${project.description}</p>

                    <p>
                        <strong>Technologies:</strong>
                        ${project.technologies}
                    </p>
                `;

                projectsContainer.appendChild(projectCard);
            });
        })
        .catch(function (error) {

            console.error("Error loading projects:", error);

            projectsContainer.innerHTML =
                "<p>Unable to load projects.</p>";
        });
}