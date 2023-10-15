window.addEventListener('load', () =>{
    document.querySelector('.loader').style.display = "none";
    document.body.classList.remove('no-scroll');
});

AOS.init({
    once: true
});

$('.card-public').click(function(e){
    e.preventDefault();
    $('.public-modal').modal('show');
});

$('.card-private').click(function(e){
    e.preventDefault();
    $('.private-modal').modal('show');  
});