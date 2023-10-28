window.addEventListener('load', () =>{
    document.querySelector('.loader').style.display = "none";
    document.body.classList.remove('no-scroll');
});

AOS.init({
    once: true
});

$('.card').click(function(e){
    e.preventDefault();
    $('.private-modal').modal('show');  
});
