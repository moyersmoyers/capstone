/* SIDEBAR */
let smallWidth = false;

function setWindowWidth(){
	let getwidth = $(window).width();
	
	if(getwidth <= 768){
		smallWidth = true;
		$('#nav-bar').removeClass('show');
		$('#body-pd').removeClass('body-pd');
		$('#header').removeClass('body-pd');
	}
	else{
		smallWidth = false;
	}
	$('#nav-bar').removeClass('open');
}

$(window).on('load resize', function(){
	setWindowWidth();
});

$('#header-toggle').click(function(){
	if(!smallWidth){
		$('#nav-bar').toggleClass('show');
		$('#body-pd').toggleClass('body-pd');
		$('#header').toggleClass('body-pd');
	}
});


/* DROPDOWN SIDEBAR */
$('.nav_list-item a').click(function(){
	let getid = document.getElementById(this.id);
	if(getid.nextElementSibling === null){
		return false;
	}
	else{
		if(getid.nextElementSibling.id === "submenu"){
			$('#' + this.id).next().slideToggle();
			$('.chev-down').toggleClass('rotate');
		}
	}
});


$('.caret').click(function(){
	$('.header_img-submenu').toggleClass('header-sub-active');
});


/* OFFCANVAS */
const openBtn = document.querySelector('.open-btn');
const closeBtn = document.querySelector('.close-btn');
const offcanvasMenu = document.querySelector('.l-navbar')

openBtn.addEventListener('click', function(e) {
    e.preventDefault();
    offcanvasMenu.classList.add('open');
});

closeBtn.addEventListener('click', function (e) {
    e.preventDefault();
    offcanvasMenu.classList.remove('open');
});
