const loader = document.querySelector('.loader');
window.addEventListener('load', () =>{
    loader.style.display = "none";
    document.body.classList.remove('no-scroll');
});

const navbar = document.querySelector('.navbar');
window.onscroll = window.onload = () => {
    if(this.scrollY >= 60){
        navbar.classList.add('nav-scrolled');
    }
    else{
        navbar.classList.remove('nav-scrolled');
    }
}

$('.owl-carousel').owlCarousel({
    margin: 10,
    nav: true,
    loop: true,
    center: false,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    navText: ["<a data-aos='fade-right' class='btn btn-primary btn-book' style='margin-right:15px'><i class='bi bi-arrow-left'></i></a>","<a  data-aos='fade-left' class='btn btn-primary btn-book' style='margin-left:15px'><i class='bi bi-arrow-right'></i></a>"],
    responsive:{
        0:{
            items: 1
        },
        768:{
            items:2
        },
        992:{
            items:3
        }
    }
});


AOS.init({
    once: true
});

new Swiper(".testimonialSwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    centeredSlides: true,
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    autoplay: {
        delay: 7000,
        disableOnInteraction: false,
    },
});

new Swiper(".headerSwiper", {
    slidesPerView: 1,
    loop: true,
    effect: "fade",
    noSwiping: true,
    noSwipingClass: "swiper-slide",
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

gridGallery({
 selector: ".homepage-gg",
 layout: "horizontal"
});

Fancybox.bind("[data-fancybox]", {
    Toolbar:{
        display:{
            left:[],
            middle:["infobar"],
            right:["close"],
        },
    },
});

