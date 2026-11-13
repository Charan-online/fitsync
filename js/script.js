
// ==========================================
// FITSYNC - JAVASCRIPT FUNCTIONALITY
// ==========================================


// 1. MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.textContent = isOpen ? "✕" : "☰";

});


// Close mobile menu after clicking a navigation link

const navItems = navLinks.querySelectorAll("a");

navItems.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.textContent = "☰";

    });

});


// 2. FITSYNC SIZE RECOMMENDATION DEMO

const fitForm = document.getElementById("fitForm");

const demoResults = document.getElementById("demoResults");

const resultContent = document.getElementById("resultContent");


// Function to calculate illustrative clothing size

function calculateSize(chest, waist, shoulder, brand) {

    // Different illustrative sizing rules for each brand.
    // These are sample rules, not actual brand size charts.

    let size;

    if (brand === "H&M") {

        if (chest <= 38 && waist <= 31) {
            size = "S";
        } else if (chest <= 42 && waist <= 35) {
            size = "M";
        } else if (chest <= 46 && waist <= 39) {
            size = "L";
        } else {
            size = "XL";
        }

    }

    else if (brand === "Peter England") {

        if (chest <= 36 && waist <= 30) {
            size = "S";
        } else if (chest <= 40 && waist <= 34) {
            size = "M";
        } else if (chest <= 44 && waist <= 38) {
            size = "L";
        } else {
            size = "XL";
        }

    }

    else if (brand === "Zara") {

        if (chest <= 37 && waist <= 30) {
            size = "S";
        } else if (chest <= 41 && waist <= 34) {
            size = "M";
        } else if (chest <= 45 && waist <= 38) {
            size = "L";
        } else {
            size = "XL";
        }

    }

    return size;

}


// 3. HANDLE FORM SUBMISSION

fitForm.addEventListener("submit", function (event) {

    // Prevent page refresh

    event.preventDefault();


    // Get input values

    const chest = Number(document.getElementById("chest").value);

    const waist = Number(document.getElementById("waist").value);

    const shoulder = Number(document.getElementById("shoulder").value);


    // Basic validation

    if (
        !Number.isFinite(chest) ||
        !Number.isFinite(waist) ||
        !Number.isFinite(shoulder) ||
        chest < 20 || chest > 70 ||
        waist < 20 || waist > 70 ||
        shoulder < 10 || shoulder > 30
    ) {

        alert("Please enter valid measurements within the specified ranges.");

        return;

    }


    // Calculate recommendations

    const brands = ["H&M", "Peter England", "Zara"];

    const recommendations = brands.map(function (brand) {

        return {
            brand: brand,
            size: calculateSize(chest, waist, shoulder, brand)
        };

    });


    // Clear previous results

    resultContent.replaceChildren();


    // Display results

    recommendations.forEach(function (item) {

        const row = document.createElement("div");

        row.className = "demo-result-row";

        const brandName = document.createElement("span");

        brandName.textContent = item.brand;

        const size = document.createElement("strong");

        size.textContent = item.size;

        row.append(brandName, size);

        resultContent.appendChild(row);

    });


    // Show result section

    demoResults.hidden = false;


    // Scroll to results

    demoResults.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });

});

// ==========================================
// 4. SCROLL REVEAL ANIMATIONS
// ==========================================

const revealElements = document.querySelectorAll(
    ".problem-card, .feature-card, .step-card, .price-card, .demo-card, .contact-container"
);

revealElements.forEach(function (element) {
    element.classList.add("reveal");
});

const observer = new IntersectionObserver(function (entries, observer) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {

            entry.target.classList.add("active");

            observer.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.15
});

revealElements.forEach(function (element) {
    observer.observe(element);
});

// ==========================================
// 5. CONTACT FORM VALIDATION
// ==========================================

const contactForm = document.getElementById("contactForm");

const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("contactName").value.trim();

    const email = document.getElementById("contactEmail").value.trim();

    const message = document.getElementById("contactMessage").value.trim();

    formMessage.classList.remove("error");

    if (name.length < 2) {

        formMessage.textContent = "Please enter a valid name.";

        formMessage.classList.add("error");

        return;

    }

    if (message.length < 10) {

        formMessage.textContent = "Please enter at least 10 characters.";

        formMessage.classList.add("error");

        return;

    }

    if (!contactForm.checkValidity()) {

        contactForm.reportValidity();

        return;

    }

    formMessage.textContent =
        "Thank you, " + name + "! Your demo request has been submitted successfully.";

    contactForm.reset();

});
