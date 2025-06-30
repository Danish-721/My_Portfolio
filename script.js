/* ==================================
   TYPED.JS ANIMATION FOR HOME SECTION
   ================================== */
var typed = new Typed('#element', {
    strings: ['Web Designer,', 'Web Developer!'],
    typeSpeed: 65,
    backSpeed: 50,
    loop: true
});


/* ==========================================
   CONTACT FORM HANDLING USING FORMSPREE
   ========================================== */

// Pehle form aur status message element ko select karein
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

// Form submit hone par kya karna hai, woh yahan define karein
async function handleSubmit(event) {
    // 1. Browser ko page reload karne se rokein
    event.preventDefault();

    // 2. Status message ko "Sending..." par set karein
    formStatus.textContent = 'Sending...';
    formStatus.style.color = 'white';

    // 3. Form ka data taiyaar karein
    const data = new FormData(event.target);

    // 4. Formspree endpoint par data bhejein
    try {
        const response = await fetch("https://formspree.io/f/xgvylevj", { // <-- APNA FORMSPREE URL YAHAN DAALEIN
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        // 5. Response ke hisab se message dikhayein
        if (response.ok) {
            formStatus.textContent = "Thanks for your submission!";
            formStatus.style.color = 'aqua'; // Success color
            form.reset(); // Form ke fields ko khaali kar dein
        } else {
            // Agar server se koi error aaye
            const responseData = await response.json();
            if (responseData.hasOwnProperty('errors')) {
                formStatus.textContent = responseData.errors.map(error => error.message).join(", ");
            } else {
                formStatus.textContent = "Oops! There was a problem submitting your form.";
            }
            formStatus.style.color = 'red'; // Error color
        }
    } catch (error) {
        // Agar network ya koi aur error aaye
        formStatus.textContent = "Oops! There was a network problem.";
        formStatus.style.color = 'red'; // Error color
    }
}

// Form ke submit event par handleSubmit function ko jodein
form.addEventListener("submit", handleSubmit);