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
.contact-form,
.workstation-photo
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
            RASTRO DE CURSOR
==========================================*/

let lastTrailTime = 0;

document.addEventListener("mousemove",(e)=>{

    const now = Date.now();

    if(now - lastTrailTime < 30) return;

    lastTrailTime = now;

    const dot = document.createElement("span");

    dot.className = "cursor-dot";

    dot.style.left = `${e.clientX}px`;

    dot.style.top = `${e.clientY}px`;

    document.documentElement.appendChild(dot);

    setTimeout(()=> dot.remove(), 700);

});

/*==========================================
            ESTRELLAS DE FONDO
==========================================*/

const starsCanvas = document.querySelector(".stars-canvas");

if(starsCanvas){

    const ctx = starsCanvas.getContext("2d");

    let stars = [];

    let shootingStars = [];

    function resizeStarsCanvas(){

        starsCanvas.width = window.innerWidth;

        starsCanvas.height = window.innerHeight;

    }

    function createStars(){

        const count = Math.floor((window.innerWidth * window.innerHeight) / 11000);

        stars = Array.from({length: count}, () => ({

            x: Math.random() * starsCanvas.width,

            y: Math.random() * starsCanvas.height,

            radius: Math.random() * 1.6 + 0.4,

            speed: Math.random() * 0.5 + 0.15,

            drift: (Math.random() - 0.5) * 0.3,

            baseOpacity: Math.random() * 0.6 + 0.3,

            twinkleSpeed: Math.random() * 0.02 + 0.006,

            twinklePhase: Math.random() * Math.PI * 2

        }));

    }

    function maybeSpawnShootingStar(){

        if(Math.random() < 0.004 && shootingStars.length < 2){

            shootingStars.push({

                x: Math.random() * starsCanvas.width * 0.6,

                y: -20,

                length: Math.random() * 80 + 60,

                speed: Math.random() * 8 + 6,

                angle: Math.PI / 4,

                opacity: 1

            });

        }

    }

    function drawStars(){

        ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);

        stars.forEach(star => {

            star.twinklePhase += star.twinkleSpeed;

            const twinkle = (Math.sin(star.twinklePhase) + 1) / 2;

            const alpha = star.baseOpacity * (0.5 + twinkle * 0.5);

            ctx.beginPath();

            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

            ctx.fillStyle = `rgba(255,224,130,${alpha})`;

            ctx.fill();

            star.y += star.speed;

            star.x += star.drift;

            if(star.y > starsCanvas.height + 5){

                star.y = -5;

                star.x = Math.random() * starsCanvas.width;

            }

            if(star.x < -5) star.x = starsCanvas.width + 5;

            if(star.x > starsCanvas.width + 5) star.x = -5;

        });

        maybeSpawnShootingStar();

        shootingStars.forEach(s => {

            const dx = Math.cos(s.angle) * s.length;

            const dy = Math.sin(s.angle) * s.length;

            const gradient = ctx.createLinearGradient(s.x, s.y, s.x - dx, s.y - dy);

            gradient.addColorStop(0, `rgba(255,214,10,${s.opacity})`);

            gradient.addColorStop(1, "rgba(255,214,10,0)");

            ctx.strokeStyle = gradient;

            ctx.lineWidth = 2;

            ctx.beginPath();

            ctx.moveTo(s.x, s.y);

            ctx.lineTo(s.x - dx, s.y - dy);

            ctx.stroke();

            s.x += Math.cos(s.angle) * s.speed;

            s.y += Math.sin(s.angle) * s.speed;

            s.opacity -= 0.012;

        });

        shootingStars = shootingStars.filter(s => s.opacity > 0 && s.y < starsCanvas.height + 100);

        requestAnimationFrame(drawStars);

    }

    resizeStarsCanvas();

    createStars();

    drawStars();

    window.addEventListener("resize", () => {

        resizeStarsCanvas();

        createStars();

    });

}

/*==========================================
        BARRA DE PROGRESO DE SCROLL
==========================================*/

const scrollProgress = document.querySelector(".scroll-progress");

let progressTicking = false;

function handleScrollProgress(){

    const scrollTop = window.scrollY;

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if(scrollProgress){

        scrollProgress.style.width = `${progress}%`;

    }

    progressTicking = false;

}

if(scrollProgress){

    window.addEventListener("scroll", () => {

        if(!progressTicking){

            requestAnimationFrame(handleScrollProgress);

            progressTicking = true;

        }

    }, {passive:true});

    handleScrollProgress();

}

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