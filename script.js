/*==========================================
    PORTFOLIO - SEBASTIAN CUELLAR
==========================================*/


/*==========================================
    ACTIVE NAVBAR
==========================================*/

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll(".nav-links a");


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

/*==========================================
        SCROLL REVEAL
==========================================*/

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:.15
});


const hiddenElements = document.querySelectorAll(

`
.about-card,
.skill-card,
.hardware-card,
.software-card,
.project-card,
.timeline-item,
.stats-card,
.contact-info,
.contact-form
`

);

hiddenElements.forEach((el,index)=>{

    el.classList.add("hidden");

    el.style.transitionDelay = `${index * 30}ms`;

    observer.observe(el);

});

/*==========================================
            ANIMATED COUNTERS
==========================================*/

const counters = document.querySelectorAll(".stats-card h2");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            const counter = entry.target;

            const target = +counter.dataset.count;

            let current = 0;

            const increment = target / 80;

            const updateCounter = () =>{

                if(current < target){

                    current += increment;

                    counter.innerText = Math.ceil(current);

                    requestAnimationFrame(updateCounter);

                }else{

                    counter.innerText = target + "+";

                }

            }

            updateCounter();

            counterObserver.unobserve(counter);

        }

    });

},{
    threshold:.5
});

counters.forEach(counter=>{

    counterObserver.observe(counter);

});



/*==========================================
            NAVBAR SCROLL
==========================================*/

const header = document.querySelector(".header");

window.addEventListener("scroll",()=>{

    if(window.scrollY>80){

        header.classList.add("header-scroll");

    }else{

        header.classList.remove("header-scroll");

    }

});

/*==========================================
        SKILLS ANIMATION
==========================================*/

const progressBars = document.querySelectorAll(".progress");

const skillsObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            const bar = entry.target;

            bar.style.width = bar.dataset.width;

            skillsObserver.unobserve(bar);

        }

    });

},{
    threshold:.4
});

progressBars.forEach(bar=>{

    skillsObserver.observe(bar);

});

/*==========================================
            CARD GLOW
==========================================*/

const glowCards = document.querySelectorAll(

`
.profile-card,
.about-card,
.skill-card,
.stats-card,
.hardware-card,
.software-card,
.project-card,
.timeline-item,
.contact-info
`

);

glowCards.forEach(card=>{

    card.classList.add("glow-card");

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        card.style.setProperty("--x",`${x}px`);

        card.style.setProperty("--y",`${y}px`);

    });

});

/*==========================================
            BACK TO TOP
==========================================*/

const backToTop = document.querySelector("#backToTop");

if(backToTop){

    window.addEventListener("scroll",()=>{

        if(window.scrollY>500){

            backToTop.classList.add("show");

        }else{

            backToTop.classList.remove("show");

        }

    });

    backToTop.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/*==========================================
            BUTTON RIPPLE
==========================================*/

const buttons = document.querySelectorAll(".btn");

buttons.forEach(button=>{

    button.addEventListener("mousemove",(e)=>{

        const rect = button.getBoundingClientRect();

        button.style.setProperty(

            "--x",

            `${e.clientX-rect.left}px`

        );

        button.style.setProperty(

            "--y",

            `${e.clientY-rect.top}px`

        );

    });

});

/*==========================================
            PROJECT SLIDER
==========================================*/

const sliders = document.querySelectorAll(".slider");

sliders.forEach(slider => {

    const images = slider.querySelectorAll("img");

    let current = 0;

    setInterval(() => {

        images[current].classList.remove("active");

        current = (current + 1) % images.length;

        images[current].classList.add("active");

    }, 3000);

});

/*==========================================
            TYPING PROFILE
==========================================*/

const professions = [

    "Diseñador Gráfico",

    "Optimizador de Contenido",

    "Content Creator",

    "Editor de video",

    "Fotógrafo",

    "Streamer"

];

const typingText = document.querySelector("#typing-text");

let profession = 0;

let character = 0;

let deleting = false;

function typingAnimation(){

    if(!typingText) return;

    const current = professions[profession];

    if(!deleting){

        typingText.textContent = current.substring(0,character++);

        if(character > current.length){

            deleting = true;

            setTimeout(typingAnimation,1800);

            return;

        }

    }else{

        typingText.textContent = current.substring(0,--character);

        if(character === 0){

            deleting = false;

            profession = (profession + 1) % professions.length;

        }

    }

    setTimeout(typingAnimation,deleting ? 40 : 80);

}

typingAnimation();

/*==========================================
            EMAILJS
==========================================*/

emailjs.init({
    publicKey: "VgBaQ2DbHH2fBAFzj"
});

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const button = contactForm.querySelector("button");
        const originalText = button.innerHTML;

        button.innerHTML = "Enviando...";
        button.disabled = true;

        emailjs.sendForm(
            "service_fs3nirg",
            "template_95kfssw",
            contactForm
        )

        .then(function () {

            alert("✅ Mensaje enviado correctamente.");

            contactForm.reset();

        })

        .catch(function (error) {

            console.error(error);

            alert("❌ Ocurrió un error al enviar el mensaje.");

        })

        .finally(function () {

            button.innerHTML = originalText;
            button.disabled = false;

        });

    });

}
