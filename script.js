// ========================================
// PERSONAL PORTFOLIO JAVASCRIPT
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("Portfolio JavaScript loaded.");


    // ========================================
    // CONTACT FORM
    // ========================================

    const contactForm =
        document.getElementById("contactForm");


    if (!contactForm) {

        console.error(
            "ERROR: contactForm was not found."
        );

        return;
    }


    contactForm.addEventListener(
        "submit",
        function (event) {

            // Prevent page reload
            event.preventDefault();


            // ========================================
            // GET FORM VALUES
            // ========================================

            const nameInput =
                document.getElementById("name");

            const emailInput =
                document.getElementById("email");

            const messageInput =
                document.getElementById("message");


            if (
                !nameInput ||
                !emailInput ||
                !messageInput
            ) {

                alert(
                    "Contact form fields are missing."
                );

                console.error(
                    "name, email or message field not found."
                );

                return;
            }


            const name =
                nameInput.value.trim();

            const email =
                emailInput.value.trim();

            const message =
                messageInput.value.trim();


            // ========================================
            // VALIDATION
            // ========================================

            if (name === "") {

                alert(
                    "Please enter your name."
                );

                nameInput.focus();

                return;
            }


            if (email === "") {

                alert(
                    "Please enter your email."
                );

                emailInput.focus();

                return;
            }


            if (message === "") {

                alert(
                    "Please enter your message."
                );

                messageInput.focus();

                return;
            }


            // ========================================
            // EMAIL VALIDATION
            // ========================================

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                alert(
                    "Please enter a valid email address."
                );

                emailInput.focus();

                return;
            }


            // ========================================
            // CREATE EMAIL SUBJECT
            // ========================================

            const subject =
                encodeURIComponent(
                    "New Portfolio Contact - " + name
                );


            // ========================================
            // CREATE EMAIL BODY
            // ========================================

            const body =
                encodeURIComponent(

                    "Hello Ankita," +

                    "\n\n" +

                    "You received a new message from your portfolio website." +

                    "\n\n" +

                    "Name: " +
                    name +

                    "\n\n" +

                    "Email: " +
                    email +

                    "\n\n" +

                    "Message:" +

                    "\n" +
                    message +

                    "\n\n" +

                    "--------------------------------" +

                    "\n" +

                    "Sent from Ankita Maske Portfolio"
                );


            // ========================================
            // CREATE MAILTO LINK
            // ========================================

            const mailtoLink =
                "mailto:maskeankita12@gmail.com" +
                "?subject=" +
                subject +
                "&body=" +
                body;


            console.log(
                "Opening email application..."
            );


            // ========================================
            // OPEN EMAIL APPLICATION
            // ========================================

            window.location.href =
                mailtoLink;

        }
    );

});