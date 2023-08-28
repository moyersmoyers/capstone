/* SIDEBAR START */
let smallWidth = false;

function setWindowWidth(){
	let getwidth = $(window).width();
	
	if(getwidth <= 768){
		smallWidth = true;
		$('#nav-bar').removeClass('show');
		$('#body-pd').removeClass('body-pd');
		$('#header').removeClass('body-pd');
		$('.backdrop').css('display', 'none');
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
/* SIDEBAR END */



/* DROPDOWN SIDEBAR NAV START */
$('.nav_list-item a').click(function(event){
	let getid = document.getElementById(this.id);
	if(!(getid.nextElementSibling === null)){
		if(getid.nextElementSibling.id === "submenu"){
			event.preventDefault();
			$('#' + this.id).next().slideToggle();
			$('#' + this.id + ' .chev-down').toggleClass('rotate');
		}
	}
});
/* DROPDOWN SIDEBAR NAV END */



/* USER AT BOTTOM NAV START */
$(document).mouseup(function(e){
	let userSetting = $('.user-settings');
	let userSettingSubmenu = $('.user-settings-submenu');
	if (!userSetting.is(e.target) && userSetting.has(e.target).length === 0) 
    {
        userSettingSubmenu.removeClass('user-settings-sub-active');
    }
    else{
    	userSettingSubmenu.toggleClass('user-settings-sub-active');
    }
});
$('.nav').on('scroll', function(){
	if($('.user-settings-submenu').hasClass('user-settings-sub-active')){
		$('.user-settings-submenu').removeClass('user-settings-sub-active');
	}
});
/* USER AT BOTTOM NAV END */



/* OFFCANVAS START */
const openBtn = document.querySelector('.open-btn');
const closeBtn = document.querySelector('.close-btn');
const offcanvasMenu = document.querySelector('.l-navbar');
const backdrop = document.querySelector('.backdrop');

openBtn.addEventListener('click', function(e) {
    e.preventDefault();
    offcanvasMenu.classList.add('open');
    backdrop.style.display = "block";
});

backdrop.addEventListener('click', function(){
    offcanvasMenu.classList.remove('open');
    backdrop.style.display = "none";
});

closeBtn.addEventListener('click', function (e) {
    e.preventDefault();
    offcanvasMenu.classList.remove('open');
    backdrop.style.display = "none";
});
/* OFFCANVAS END */
