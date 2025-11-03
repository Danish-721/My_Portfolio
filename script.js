
var typed = new Typed('#element', {
    strings: ['Data Analyst!'],
    typeSpeed: 65,
    backSpeed: 50,
    loop: true
});

const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

async function handleSubmit(event) {
    
    event.preventDefault();
   
    formStatus.textContent = 'Sending...';
    formStatus.style.color = 'white';

    const data = new FormData(event.target);

    
    try {
        const response = await fetch("https://formspree.io/f/xgvylevj", { 
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            formStatus.textContent = "Thanks for your submission!";
            formStatus.style.color = 'aqua'; 
            form.reset(); 
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

form.addEventListener("submit", handleSubmit);
