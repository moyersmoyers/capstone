@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500&family=Rubik:wght@300&display=swap');

body{
	font-family: "Rubik", arial, sans-serif;
}

button{
	outline: none !important;
    box-shadow: none !important;
}

.heading-font{
	font-family: "Playfair Display", times, serif;
}

.line{
	display: grid;
	justify-items: center;
	padding-bottom: 1.4rem;
}

.line hr{
	width: 5rem;
}

.page-section{
	padding: 5rem 0;
}

.section-heading{
	font-size: 2.5rem;
}


/* LOADER START */
.no-scroll {
   overflow: hidden;
}

.loader {
	z-index: 2000;
	height: 100vh;
	width: 100vw;
	position: fixed;
	background: #fff;
	display: flex;	
	align-items: center;
	justify-content: center;
	transition: all 0.3s;
}

.loader:after {
	content: " ";
	width: 64px;
	height: 64px;
	margin: 8px;
	border-radius: 50%;
	border: 6px solid #222;
	border-color: #222 transparent #222 transparent;
	animation: loader 1.2s linear infinite;
}

@keyframes loader {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
/* LOADER END */


/* HEADER CAROUSEL START */
.carousel {
	height: 100vh;
}

.carousel-inner{
	height: 100%;
}

.carousel-caption {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
	text-align: center;
	z-index: 10;
	height: 100%;
	bottom: 0;
}

.carousel-item {
  height: auto;
}
/* HEADER CAROUSEL START */


/* MASTERHEAD START */
.masterhead {
	height: 100vh;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	color: #fff;
	background-repeat: no-repeat;
	background-attachment: scroll;
	background-position: center center;
	background-size: cover;
}

.masterhead:before{
	content: "";
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgba(0, 0, 0, .5);
}

.masterhead-subheading{
	font-size: 1.5rem;
	line-height: 2.25rem;
	margin-bottom: 2rem;
}

.masterhead-heading{
	font-size: 3.5rem;
	line-height: 4.5rem;
	margin-bottom: 1rem;
}

@media (min-width: 768px) {
	.masterhead-subheading{
		font-size: 1.35rem;
	}

	.masterhead-heading{
		font-size: 4rem;
	}
}

/* MASTERHEAD END */


/* NAVBAR START */
.navbar{
	transition: all 0.3s;
}

.nav-scrolled{
	background-color: #1B1B1E;
}

.navbar-toggler span{
	text-decoration: none; 
}

.navbar_ul{
	background-color: red;
}

.offcanvas{
	transition: all 0.2s;
}

.offcanvas:after{
	content: '';
}
/* NAVBAR END */


/* ABOUT US START */
.about-us img{
	width: 100%;
	height: 100%;
	background-repeat: no-repeat;
	background-attachment: scroll;
	background-position: center center;
	background-size: cover;
}

.about-us-content{
	width: 80%;
	overflow: hidden;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 6;
	display: -webkit-box;
}

@media (max-width: 991px){
	.about-us-text{
		padding: 3rem 0;
	}
}
/* ABOUT US END */


/* AMENITIES START */
.card {
	overflow: hidden;
	width: 100%;
	filter: drop-shadow(0.2rem 0.2rem 0.5rem rgba(0,0,0,0.3));
}

.card-image{
	overflow: hidden;
}

.card-img-top{
	max-height: 15rem;
	transition: all 0.3s;
}

.card-img-top:hover{
	cursor: pointer;
	transform: scale(1.035);
}

.card-title{
	font-size: 1.35rem;
    letter-spacing: .5px;
}

.card-text{
	overflow: hidden;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 5;
	display: -webkit-box;
}
/* AMENITIES END */


/* OWL CAROUSEL START */
.owl-stage{
	height: 600px;
}

.owl-stage-outer{
	height: 570px;
}

.owl-nav{
    position: relative;
    /*bottom: 10rem;*/
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin-bottom: 1rem;
}
/*.owl-prev{
	position: relative;
	right: 3rem;
}
.owl-next{
	position: relative;
	left: 3rem;
}*/
/* OWL CAROUSEL END */


/* ROOMS SECTION START*/
.room-button-container{
	display: flex;
	align-content: center;
	justify-content: space-evenly;
}

.room-item img{
	background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    position: relative;
    height: 300px;
    width: 100%;
    display: table;
    overflow: hidden;
}

.details{
	box-shadow: 0px 15px 18px -17px rgba(0, 0, 0, 0.07);
    background: #fff;
    padding: 20px;
    padding-top: 25px;
    height: 250px;
}

.details ul {
	margin: 0 0 30px 0;
	padding-left: 0;
}

.room-description, .masterhead-subheading{
	overflow: hidden;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	display: -webkit-box;
}

.room-price{
	font-size: 1.7rem;
	padding-bottom: 1rem;
}

.pernight-text{
	font-size: 16px;
}
/* ROOMS SECTION START*/


/* TESTIMONIAL START */
.swiper {
	width: 80%;
	height: 30rem;
	padding: 0 0 2.5rem 0;
}

.swiper-slide {
	text-align: center;
	font-size: 18px;
	background: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
}

.swiper-buttons{
	position: relative;
	display: flex;
	flex-wrap: wrap;
	flex-direction: row-reverse;
	justify-content: space-between;
}

.swiper-button-next, .swiper-button-prev{
	position: relative;
	/*bottom: -1.7rem;*/
	bottom: 16rem;
	left: 0;
    padding: 2rem 1rem;
    background: red;
}

/*.swiper-button-next{
	left: 4rem;
}

.swiper-button-prev{
	left: -4rem;
}*/

:root {
    --swiper-navigation-size: 20px;
    --swiper-theme-color: #fff;
}

.quote{
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	font-size: 4.5rem;
}

figure{
	width: 80%;
	margin: auto;
}

.blockquote{
	overflow: hidden;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 8;
	display: -webkit-box;
}


@media (max-width: 991px){
	figure{
		width: 75%;
	}
}
@media (max-width: 767px){
	figure{
		width: 70%;
	}
}
@media (max-width: 430px){
	figure{
		width: 60%;
	}
.blockquote{
	overflow: hidden;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 5;
	display: -webkit-box;
}
}

/*.testi{
	background: linear-gradient(180deg, #fdcd3b 60%, #f8f9fa 40%) !important;
}*/
/* TESTIMONIAL END */


/* AMENITIES START */
.left-amenity, .right-amenity{
	display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: flex-start;
}

.amenity-item{
	margin: 0.5rem 0;
}

@media (max-width: 991px){
	.left-amenity, .right-amenity{
		display: flex;
	    flex-wrap: wrap;
	    flex-direction: row;
	    align-content: space-around;
	    justify-content: space-evenly;
	    align-items: center;
	}
}

@media (max-width: 550px){
	.left-amenity, .right-amenity{
		display: flex;
	    flex-wrap: wrap;
	    flex-direction: column;
	    align-content: center;
	    justify-content: center;
	    align-items: center;
	}
}

.amenity-name{
	margin: 0 1rem;
}
/* AMENITIES END */


/* GOOGLE MAP START */
.google-map{
	position: relative;
	overflow: hidden;
}

.google-map iframe{
	height: 100%;
	width: 100%;
	left: 0;
	top: 0;
	position: absolute;
	overflow: hidden;
}

@media (max-width: 991px){
	.google-map{
		margin-top: 2rem;
	}
	.google-map iframe{
		height: 500px;
		width: 100%;
		position: inherit;
	}
}
/* GOOGLE MAP END */


/* FOOTER START */
footer small, footer .social-icon{
	color: #aaa;
}
.address{
	text-decoration: none;
}
.address p small:hover{
	color: #fff;
}
.copyright{
	font-size: 14px;
	margin-bottom: 0;
}
@media (max-width: 460px){
	footer .text-start{
		text-align: center !important;
	}
}
/* FOOTER END */
