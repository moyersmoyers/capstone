window.addEventListener('load', () =>{
    document.querySelector('.loader').style.display = "none";
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

AOS.init({
    once: true
});

$('.owl-carousel').owlCarousel({
    margin: 10,
    nav: true,
    loop: true,
    center: false,
    autoplay: false,
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

/*Fancybox.bind("[data-fancybox]", {
    Toolbar:{
        display:{
            left:[],
            middle:["infobar"],
            right:["close"],
        },
    },
});*/



/*let input = document.querySelector('.date-picker');
let datepicker = new HotelDatepicker(input, {
    clearButton: true,
    format: "MM/DD/YYYY",
    moveBothMonths: true,
    selectForward: true,
    topbarPosition: 'bottom',
    onSelectRange: () => {
        let datesArr = input.value.split(" - ");
        console.log("check in " + datesArr[0]);
        console.log("check out " + datesArr[1]);
    }
});*/
