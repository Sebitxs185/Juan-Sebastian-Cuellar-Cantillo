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
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxTitle = document.querySelector(".lightbox-title");
const lightboxCategory = document.querySelector(".lightbox-category");
const lightboxDescription = document.querySelector(".lightbox-description");

const closeButton = document.querySelector(".lightbox-close");
const prevButton = document.querySelector(".lightbox-prev");
const nextButton = document.querySelector(".lightbox-next");

let currentIndex = 0;

let currentImages = [];

let currentImageIndex = 0;

function updateLightbox(index){

    const item = galleryItems[index];

    currentImages = item.dataset.images
    .split(",")
    .map(img => img.trim());

currentImageIndex = 0;

lightboxImage.src = currentImages[currentImageIndex];

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

    });

});

closeButton.addEventListener("click",()=>{

    lightbox.classList.remove("active");

});

lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        lightbox.classList.remove("active");

    }

});

nextButton.addEventListener("click",()=>{

    if(currentImageIndex < currentImages.length - 1){

        currentImageIndex++;

        lightboxImage.src = currentImages[currentImageIndex];

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

        lightboxImage.src = currentImages[currentImageIndex];

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

        lightbox.classList.remove("active");

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

