
// =====================================
// 1. SCROLL REVEAL ANIMATIONS
// =====================================

const faders = document.querySelectorAll("section");

const revealSections = () => {
    faders.forEach(section => {
        const position = section.getBoundingClientRect().top;

        if (position < window.innerHeight - 150) {
            section.classList.add("show");
        }
    });
};

window.addEventListener("scroll", revealSections);
window.addEventListener("load", revealSections);


// =====================================
// 2. HERO TYPING ANIMATION
// =====================================

const text = [
    "Software Developer",
    "Web Developer",
    "System Analyst",
    "Future Software Engineer"
];

let count = 0;
let index = 0;

(function type() {
    const heading = document.querySelector(".hero-content h2");

    if (!heading) return;

    if (count === text.length) {
        count = 0;
    }

    const currentText = text[count];
    const letter = currentText.slice(0, ++index);

    heading.textContent = letter;

    if (letter.length === currentText.length) {
        count++;
        index = 0;
        setTimeout(type, 1000);
    } else {
        setTimeout(type, 120);
    }
})();


// =====================================
// 3. EMAILJS CONTACT FORM
// =====================================

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    if (typeof emailjs !== "undefined") {
        emailjs.init({
            publicKey: "jrdAX27VnR-pmEL1x"
        });
    }

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        if (this.elements.website.value.trim() !== "") {
    return;
}
        const submitButton = document.getElementById("submit-btn");
        const formStatus = document.getElementById("form-status");

        if (typeof emailjs === "undefined") {
            formStatus.textContent = "Email service is unavailable.";
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
        formStatus.textContent = "";

        emailjs.sendForm(
            "service_xosfsw7",
            "template_7f3q2uq",
            this
        )
        .then(() => {

            formStatus.textContent =
                "Your message has been sent successfully!";

            formStatus.style.color = "#00e5ff";

            contactForm.reset();

        })
        .catch((error) => {

            console.error("EmailJS error:", error);

            formStatus.textContent =
                "Message could not be sent. Please try again.";

            formStatus.style.color = "#ff7777";

        })
        .finally(() => {

            submitButton.disabled = false;
            submitButton.textContent = "Send Message";

        });

    });

}

// =====================================
// 4. TYRONE PORTFOLIO LOADING ANIMATION
// =====================================

document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("portfolio-loader");
    const progress = document.getElementById("loader-progress");
    const percentage = document.getElementById("loader-percentage");

    if (!loader || !progress || !percentage) return;

    const duration = 7000;
    const startTime = Date.now();

    const updateLoader = () => {
        const elapsed = Date.now() - startTime;
        const percent = Math.min((elapsed / duration) * 100, 100);

        progress.style.width = percent + "%";
        percentage.textContent = Math.floor(percent) + "%";

        if (percent < 100) {
            requestAnimationFrame(updateLoader);
        } else {
            setTimeout(() => {
                loader.classList.add("loader-hidden");
            }, 300);
        }
    };

    updateLoader();
});


// =====================================
// 5. ROTATING PORTFOLIO LOADER MESSAGES
// =====================================

document.addEventListener("DOMContentLoaded", () => {
    const message = document.getElementById("loader-message");

    if (!message) return;

    const messages = [
        "Exploring creative ideas...",
        "Loading web development projects...",
        "Discovering software solutions...",
        "Building digital experiences...",
        "Almost ready — welcome aboard!"
    ];

    let index = 0;

    const messageTimer = setInterval(() => {
        index = (index + 1) % messages.length;
        message.textContent = messages[index];
    }, 2000);

    setTimeout(() => {
        clearInterval(messageTimer);
    }, 7000);
});



// =====================================
// 6. TYRONE OFFLINE SUPPORT
// =====================================

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js")
            .catch(error => console.error("Offline support error:", error));
    });
}

// =====================================
// 7. MOBILE COLLAPSIBLE NAVIGATION
// =====================================

document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector("nav.site-nav");
    const menuButton = nav?.querySelector(".menu-toggle");
    const menu = nav?.querySelector("#primary-navigation");

    if (!nav || !menuButton || !menu) return;

    const closeMenu = () => {
        nav.classList.remove("menu-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");
    };

    const openMenu = () => {
        nav.classList.add("menu-open");
        menuButton.setAttribute("aria-expanded", "true");
        menuButton.setAttribute("aria-label", "Close navigation menu");
    };

    menuButton.addEventListener("click", () => {
        const isOpen = menuButton.getAttribute("aria-expanded") === "true";

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    menu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", event => {
        if (!nav.contains(event.target)) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeMenu();
            menuButton.focus();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
});

