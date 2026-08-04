/*==================================================
            RASTRO DE CURSOR
==================================================*/

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

/*==================================================
            ESTRELLAS CAYENDO
==================================================*/

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

        const count = Math.floor((window.innerWidth * window.innerHeight) / 9000);

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

        if(Math.random() < 0.006 && shootingStars.length < 2){

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

/*==================================================
        BARRA DE PROGRESO DE SCROLL + PARALLAX FONDO
==================================================*/

const scrollProgress = document.querySelector(".scroll-progress");

const bgOrbs = document.querySelector(".bg-orbs");

let ticking = false;

let lastScrollTrailTime = 0;

function spawnScrollTrail(progress){

    const now = Date.now();

    if(now - lastScrollTrailTime < 120) return;

    lastScrollTrailTime = now;

    const particle = document.createElement("span");

    particle.className = "scroll-trail";

    const jitter = (Math.random() - 0.5) * 40;

    particle.style.left = `calc(${progress}% + ${jitter}px)`;

    document.documentElement.appendChild(particle);

    setTimeout(()=> particle.remove(), 1100);

}

function handleScrollEffects(){

    const scrollTop = window.scrollY;

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if(scrollProgress){

        scrollProgress.style.width = `${progress}%`;

    }

    if(bgOrbs){

        bgOrbs.style.transform = `translateY(${scrollTop * 0.06}px)`;

    }

    spawnScrollTrail(progress);

    ticking = false;

}

window.addEventListener("scroll",()=>{

    if(!ticking){

        requestAnimationFrame(handleScrollEffects);

        ticking = true;

    }

},{passive:true});

handleScrollEffects();

/*==================================================
        VISTA PREVIA DE VIDEO EN LAS TARJETAS
==================================================*/

document.querySelectorAll(".gallery-item-video").forEach(video=>{

    const card = video.closest(".gallery-item");

    if(!card) return;

    card.addEventListener("mouseenter",()=>{

        video.currentTime = 0;

        video.play().catch(()=>{});

    });

    card.addEventListener("mouseleave",()=>{

        video.pause();

        video.currentTime = 0;

    });

});

/*==================================================
                FILTROS
==================================================*/

const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        const filter = button.dataset.filter;

        galleryItems.forEach(item => {

            if (filter === "all" || item.dataset.category === filter) {

                item.style.display = "block";

            } else {

                item.style.display = "none";

            }

        });

    });

});

/*==================================================
                LIGHTBOX
==================================================*/

const lightbox = document.querySelector(".lightbox");
const lightboxMedia = document.querySelector(".lightbox-media");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxVideo = document.querySelector(".lightbox-video");
const lightboxLoader = document.querySelector(".lightbox-loader");
const lightboxCounter = document.querySelector(".lightbox-counter");
const lightboxThumbs = document.querySelector(".lightbox-thumbs");
const lightboxTitle = document.querySelector(".lightbox-title");
const lightboxCategory = document.querySelector(".lightbox-category");
const lightboxDescription = document.querySelector(".lightbox-description");

const closeButton = document.querySelector(".lightbox-close");
const backButton = document.querySelector(".lightbox-back");
const prevButton = document.querySelector(".lightbox-prev");
const nextButton = document.querySelector(".lightbox-next");

const videoControls = document.querySelector(".video-controls");
const videoPlayToggle = document.querySelector(".video-play-toggle");
const videoMiniToggle = document.querySelector(".video-mini-toggle");
const videoMuteToggle = document.querySelector(".video-mute-toggle");
const videoProgressFill = document.querySelector(".video-progress-fill");
const videoProgressBuffer = document.querySelector(".video-progress-buffer");
const videoProgressSeek = document.querySelector(".video-progress-seek");
const videoTimeCurrent = document.querySelector(".video-time-current");
const videoTimeDuration = document.querySelector(".video-time-duration");

const VIDEO_EXTENSIONS = /\.(mp4|webm|ogg|mov)$/i;

function isVideo(src){

    return VIDEO_EXTENSIONS.test(src);

}

let currentIndex = 0;

let currentImages = [];

let currentImageIndex = 0;

/* Marca con un ícono de video las tarjetas que contienen algún video */
galleryItems.forEach(item=>{

    const files = item.dataset.images.split(",").map(img=>img.trim());

    if(files.some(isVideo)){

        item.classList.add("has-video");

    }

});

function buildThumbs(item){

    lightboxThumbs.innerHTML = "";

    if(currentImages.length <= 1){

        lightboxThumbs.classList.remove("show");

        return;

    }

    lightboxThumbs.classList.add("show");

    currentImages.forEach((src,i)=>{

        const thumb = document.createElement("button");

        thumb.className = "lightbox-thumb";

        thumb.type = "button";

        if(isVideo(src)){

            thumb.innerHTML = `<i class="fa-solid fa-circle-play"></i>`;

            thumb.classList.add("is-video");

        }else{

            thumb.style.backgroundImage = `url(${src})`;

        }

        thumb.addEventListener("click",()=>{

            currentImageIndex = i;

            renderMedia();

        });

        lightboxThumbs.appendChild(thumb);

    });

    highlightThumb();

}

function highlightThumb(){

    const thumbs = lightboxThumbs.querySelectorAll(".lightbox-thumb");

    thumbs.forEach((t,i)=>{

        t.classList.toggle("active", i === currentImageIndex);

    });

}

function renderMedia(){

    const src = currentImages[currentImageIndex];

    lightboxMedia.classList.add("loading");

    lightboxMedia.classList.remove("fade-in");

    lightboxVideo.pause();

    videoControls.classList.remove("show-center","show-bar");

    videoProgressFill.style.width = "0%";

    videoProgressBuffer.style.width = "0%";

    videoProgressSeek.value = 0;

    videoTimeCurrent.textContent = "0:00";

    videoTimeDuration.textContent = "0:00";

    updatePlayIcons();

    if(isVideo(src)){

        lightboxImage.classList.remove("visible");

        lightboxVideo.classList.add("visible");

        lightboxVideo.src = src;

        lightboxVideo.oncanplay = ()=>{

            lightboxMedia.classList.remove("loading");

            lightboxMedia.classList.add("fade-in");

            videoControls.classList.add("show-center","show-bar");

        };

    }else{

        lightboxVideo.classList.remove("visible");

        lightboxImage.classList.add("visible");

        lightboxImage.classList.remove("zoomed");

        lightboxImage.onload = ()=>{

            lightboxMedia.classList.remove("loading");

            lightboxMedia.classList.add("fade-in");

        };

        lightboxImage.src = src;

    }

    lightboxCounter.textContent = `${currentImageIndex + 1} / ${currentImages.length}`;

    highlightThumb();

}

function updateLightbox(index){

    const item = galleryItems[index];

    currentImages = item.dataset.images
    .split(",")
    .map(img => img.trim());

    currentImageIndex = 0;

    renderMedia();

    buildThumbs(item);

    lightboxTitle.textContent = item.dataset.title;

    lightboxCategory.textContent = item.dataset.type;

    lightboxDescription.textContent = item.dataset.description;

}

galleryItems.forEach((item,index)=>{

    item.addEventListener("click",(e)=>{

        e.preventDefault();

        currentIndex = index;

        updateLightbox(currentIndex);

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});

function closeLightbox(){

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

    lightboxVideo.pause();

    clearTimeout(controlsHideTimer);

}

closeButton.addEventListener("click", closeLightbox);

backButton.addEventListener("click", closeLightbox);

lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        closeLightbox();

    }

});

/*==================================================
        CONTROLES DE VIDEO PERSONALIZADOS
==================================================*/

function formatTime(seconds){

    if(!isFinite(seconds) || seconds < 0) return "0:00";

    const m = Math.floor(seconds / 60);

    const s = Math.floor(seconds % 60).toString().padStart(2,"0");

    return `${m}:${s}`;

}

function updatePlayIcons(){

    const playing = !lightboxVideo.paused && !lightboxVideo.ended;

    const iconClass = playing ? "fa-pause" : "fa-play";

    videoPlayToggle.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;

    videoMiniToggle.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;

}

function triggerVideoPulse(iconClass){

    const pulse = document.createElement("div");

    pulse.className = "video-pulse animate";

    pulse.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;

    lightboxMedia.appendChild(pulse);

    pulse.addEventListener("animationend", ()=> pulse.remove());

}

function toggleVideoPlay(withPulse){

    if(!lightboxVideo.classList.contains("visible")) return;

    if(lightboxVideo.paused){

        lightboxVideo.play().catch(()=>{});

        if(withPulse) triggerVideoPulse("fa-play");

    }else{

        lightboxVideo.pause();

        if(withPulse) triggerVideoPulse("fa-pause");

    }

}

let controlsHideTimer = null;

function showControlsBar(){

    videoControls.classList.add("show-bar");

    clearTimeout(controlsHideTimer);

    controlsHideTimer = setTimeout(()=>{

        if(!lightboxVideo.paused){

            videoControls.classList.remove("show-bar");

        }

    }, 2600);

}

lightboxVideo.addEventListener("click",()=> toggleVideoPlay(true));

lightboxVideo.addEventListener("play",()=>{

    updatePlayIcons();

    videoControls.classList.remove("show-center");

    showControlsBar();

});

lightboxVideo.addEventListener("pause",()=>{

    updatePlayIcons();

    videoControls.classList.add("show-center","show-bar");

    clearTimeout(controlsHideTimer);

});

lightboxVideo.addEventListener("ended",()=>{

    updatePlayIcons();

    videoControls.classList.add("show-center","show-bar");

    clearTimeout(controlsHideTimer);

});

lightboxVideo.addEventListener("timeupdate",()=>{

    if(lightboxVideo.duration){

        const pct = (lightboxVideo.currentTime / lightboxVideo.duration) * 100;

        videoProgressFill.style.width = `${pct}%`;

        videoProgressSeek.value = pct;

    }

    videoTimeCurrent.textContent = formatTime(lightboxVideo.currentTime);

});

lightboxVideo.addEventListener("loadedmetadata",()=>{

    videoTimeDuration.textContent = formatTime(lightboxVideo.duration);

});

lightboxVideo.addEventListener("progress",()=>{

    if(lightboxVideo.buffered.length && lightboxVideo.duration){

        try{

            const end = lightboxVideo.buffered.end(lightboxVideo.buffered.length - 1);

            videoProgressBuffer.style.width = `${(end / lightboxVideo.duration) * 100}%`;

        }catch(err){}

    }

});

videoPlayToggle.addEventListener("click",(e)=>{

    e.stopPropagation();

    toggleVideoPlay(false);

});

videoMiniToggle.addEventListener("click",(e)=>{

    e.stopPropagation();

    toggleVideoPlay(false);

});

videoMuteToggle.addEventListener("click",(e)=>{

    e.stopPropagation();

    lightboxVideo.muted = !lightboxVideo.muted;

    videoMuteToggle.innerHTML =
        `<i class="fa-solid ${lightboxVideo.muted ? "fa-volume-xmark" : "fa-volume-high"}"></i>`;

});

videoProgressSeek.addEventListener("mousedown",(e)=> e.stopPropagation());

videoProgressSeek.addEventListener("click",(e)=> e.stopPropagation());

videoProgressSeek.addEventListener("input",()=>{

    if(lightboxVideo.duration){

        const time = (videoProgressSeek.value / 100) * lightboxVideo.duration;

        lightboxVideo.currentTime = time;

        videoProgressFill.style.width = `${videoProgressSeek.value}%`;

    }

});

lightboxMedia.addEventListener("mousemove",()=>{

    if(lightboxVideo.classList.contains("visible")){

        showControlsBar();

    }

});

/*==================================================
        NAVEGACIÓN CON SWIPE (TÁCTIL)
==================================================*/

let touchStartX = 0;

let touchStartY = 0;

lightboxMedia.addEventListener("touchstart",(e)=>{

    const t = e.touches[0];

    touchStartX = t.clientX;

    touchStartY = t.clientY;

},{passive:true});

lightboxMedia.addEventListener("touchend",(e)=>{

    const t = e.changedTouches[0];

    const dx = t.clientX - touchStartX;

    const dy = t.clientY - touchStartY;

    if(Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)){

        if(dx < 0){

            nextButton.click();

        }else{

            prevButton.click();

        }

    }

},{passive:true});

/* Zoom con clic sobre la imagen (no aplica a video) */
lightboxImage.addEventListener("click",()=>{

    lightboxImage.classList.toggle("zoomed");

});

nextButton.addEventListener("click",()=>{

    if(currentImageIndex < currentImages.length - 1){

        currentImageIndex++;

        renderMedia();

    }else{

        currentIndex++;

        if(currentIndex >= galleryItems.length){

            currentIndex = 0;

        }

        updateLightbox(currentIndex);

    }

});

prevButton.addEventListener("click",()=>{

    if(currentImageIndex > 0){

        currentImageIndex--;

        renderMedia();

    }else{

        currentIndex--;

        if(currentIndex < 0){

            currentIndex = galleryItems.length - 1;

        }

        updateLightbox(currentIndex);

    }

});

document.addEventListener("keydown",(e)=>{

    if(!lightbox.classList.contains("active")) return;

    if(e.key==="Escape"){

        closeLightbox();

    }

    if(e.key==="ArrowRight"){

        nextButton.click();

    }

    if(e.key==="ArrowLeft"){

        prevButton.click();

    }

});

/*==================================================
            SCROLL ANIMATION
==================================================*/

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            const index = [...galleryItems].indexOf(entry.target);

            entry.target.style.transitionDelay = `${(index % 3) * 0.12}s`;

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.15
});

galleryItems.forEach(item=>{

    observer.observe(item);

});

/*==================================================
            CONTADORES
==================================================*/

const counters = document.querySelectorAll(".stat-card h2");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;

        const text = counter.textContent;

        const target = parseInt(text);

        let current = 0;

        const increment = Math.max(1, Math.ceil(target / 50));

        const interval = setInterval(() => {

            current += increment;

            if (current >= target) {

                current = target;

                clearInterval(interval);

            }

            if (text.includes("+")) {

                counter.textContent = current + "+";

            } else if (text.includes("%")) {

                counter.textContent = current + "%";

            } else {

                counter.textContent = current;

            }

        }, 20);

        counterObserver.unobserve(counter);

    });

}, {

    threshold: 0.5

});

counters.forEach(counter => {

    counterObserver.observe(counter);

});

