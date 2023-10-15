window.addEventListener('load', () =>{
    document.querySelector('.loader').style.display = "none";
    document.body.classList.remove('no-scroll');
});

AOS.init({
    once: true
});

gridGallery({
	selector: "#image-gallery-gg",
	layout: "square"
});

/*gridGallery({
    selector: "#video-gallery-gg",
    layout: "square"
});

$('.filter-all').click(function(){
    $('.images').removeClass('filter-hide');
    $('.videos').removeClass('filter-hide');
});

$('.filter-images').click(function(){
    $('.videos').toggleClass('filter-hide');
});

$('.filter-videos').click(function(){
    $('.images').toggleClass('filter-hide');
});*/

/*$(document).ready(function() {
    $('.gg-box').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
            enabled: true,
            preload: [0,1],
            tPrev: 'Previous (Left arrow key)', // title for left button
            tNext: 'Next (Right arrow key)', // title for right button
            tCounter: '<span class="mfp-counter">%curr% of %total%</span>' // markup of counter
        }
    });
});*/



var modal = document.getElementById('modal');
var modalClose = document.getElementById('modal-close');
modalClose.addEventListener('click', function() { 
  modal.style.display = "none";
});

document.addEventListener('click', function (e) { 
  if (e.target.className.indexOf('modal-target') !== -1) {
      var img = e.target;
      var modalImg = document.getElementById("modal-content");
      var captionText = document.getElementById("modal-caption");
      modal.style.display = "block";
      modalImg.src = img.src;
      captionText.innerHTML = img.alt;
   }
});
