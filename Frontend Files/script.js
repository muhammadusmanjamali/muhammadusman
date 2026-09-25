document.addEventListener("DOMContentLoaded", function () {

    // ==============================
    // MOBILE MENU
    // ==============================

    const menuButton = document.getElementById("menuButton");
    const navLinks = document.getElementById("navLinks");

    console.log("script.js is working");

    if (menuButton && navLinks) {

        menuButton.addEventListener("click", function () {

            navLinks.classList.toggle("active");

            if (navLinks.classList.contains("active")) {
                menuButton.innerHTML = "✕";
            } else {
                menuButton.innerHTML = "☰";
            }

        });

        const navItems = navLinks.querySelectorAll("a");

        navItems.forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("active");

                menuButton.innerHTML = "☰";

            });

        });

    }


    // ==============================
    // CONTACT FORM
    // ==============================

    const contactForm = document.querySelector(".contactForm");

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

                const response = await fetch(
                    "http://127.0.0.1:8000/api/contact",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({
                            name: name,
                            email: email,
                            message: message
                        })
                    }
                );

                const data = await response.json();

                if (response.ok) {

                    alert("Message sent successfully!");

                    contactForm.reset();

                    console.log("Server response:", data);

                } else {

                    alert(
                        "Something went wrong: " +
                        (data.detail || "Unable to send message.")
                    );

                    console.error("Server error:", data);

                }

            } catch (error) {

                console.error("Connection error:", error);

                alert(
                    "Unable to connect to the server. " +
                    "Please make sure your FastAPI backend is running."
                );

            }

        });

    }

});