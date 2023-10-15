window.addEventListener('load', () =>{
    document.querySelector('.loader').style.display = "none";
    document.body.classList.remove('no-scroll');
});

AOS.init({
    once: true
});

const nextBtn = document.querySelectorAll(".btn-next");
const backBtn = document.querySelectorAll(".btn-back");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-steps");
const progressSteps = document.querySelectorAll(".progress-step");

let formStepsNum = 0;

nextBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        formStepsNum++;
        updateFormSteps();
        updateProgressbar();
        scrollToTop();
    });
});

backBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        formStepsNum--;
        updateFormSteps();
        updateProgressbar();
        scrollToTop();
    });
});

function updateFormSteps(){
    formSteps.forEach((formStep) => {
        formStep.classList.contains("form-steps-active") && formStep.classList.remove("form-steps-active");
    });

    formSteps[formStepsNum].classList.add("form-steps-active");
}

function updateProgressbar(){
    progressSteps.forEach((progressStep, index) => {
        if(index < formStepsNum + 1){
            progressStep.classList.add("progress-step-active");
        }
        else{
            progressStep.classList.remove("progress-step-active");
        }
    });

    const progressActive = document.querySelectorAll(".progress-step-active");

    progress.style.width = ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}

let startDate, endDate;
let startDateArray, endDateArray, diff;

$('input[name="datetimes"]').daterangepicker({
    minDate: moment().format('MM/DD/YYYY'),
    autoApply: true,
    startDate: moment().format('MM/DD/YYYY'),
    endDate: moment().add(1, 'days').format('MM/DD/YYYY')
}, function(start, end, label) {
    console.log("A new date : " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));

    startDate = start.format('YYYY-MM-DD');
    endDate = end.format('YYYY-MM-DD');

    startDateArray = start.toArray()[1]+1 + '/' + start.toArray()[2] + '/' + start.toArray()[0];
    endDateArray = end.toArray()[1]+1 + '/' + end.toArray()[2] + '/' + end.toArray()[0];
});

startDate = moment($('.datepicker').val().split('-')[0]).format('YYYY-MM-DD');
endDate = moment($('.datepicker').val().split('-')[1]).format('YYYY-MM-DD');


/*$('.next1').click(function(){
    console.log(startDate);
    console.log(endDate);
});
*/

$('.room-next').click(function(e){
    e.preventDefault();
    $('.room-select-modal').modal('show');
});

function scrollToTop(){
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function getNumOfDaysDifference(){
    let cur = moment(new Date(startDateArray));
    let end = moment(new Date(endDateArray));
    diff = end.diff(cur, 'days');
    return diff;
}

$('.select-this-room').click(function(e){
    e.preventDefault();
    $('.no-room').css('display', 'none');
    $('.yes-room').css('display', 'block');
});

$('.remove-room').click(function(e){
    e.preventDefault();
    $('.no-room').css('display', 'block');
    $('.yes-room').css('display', 'none');
});

$('.guest-info-next').click(function(e){
    e.preventDefault();
        formStepsNum++;
        updateFormSteps();
        updateProgressbar();
        scrollToTop();

    /*let valid = 0;
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let inputs = document.querySelectorAll('.guest-info-input');
    inputs.forEach(function(el){
        if(el.value === ""){
            el.nextElementSibling.nextElementSibling.style.display = "block";
            if(!(valid === 0)){
                valid -= 1;
            }
        }
        else{
            if(el.name === "e_mail"){
                if(el.value.match(emailRegex)){
                    el.nextElementSibling.nextElementSibling.style.display = "none";
                    valid += 1;
                }
                else{
                    el.nextElementSibling.nextElementSibling.style.display = "block";
                    if(!(valid === 0)){
                        valid -= 1;
                    }
                }
            }
            else{
                el.nextElementSibling.nextElementSibling.style.display = "none";
                valid += 1;
            }
        }
    });

    if(valid === 5){
        formStepsNum++;
        updateFormSteps();
        updateProgressbar();
        scrollToTop();
    }*/
});

$('.payment-next').click(function(e){
    e.preventDefault();

    formStepsNum++;
    updateFormSteps();
    updateProgressbar();
    scrollToTop();
    /*if(document.querySelector("input[type='file']").files.length === 0){
        $('.file-error').css('display', 'block');
    }
    else{
        $('.file-error').css('display', 'none');
        formStepsNum++;
        updateFormSteps();
        updateProgressbar();
        scrollToTop();
    }*/

    $('.r_id').text('2000086185');
    $('.checkin').text(startDate);
    $('.checkout').text(endDate);
    $('.first_name').text($('input[name="firstname"]').val());
    $('.last_name').text($('input[name="lastname"]').val());
});

function validate(evt){
  var theEvent = evt || window.event;

  if (theEvent.type === 'paste'){
      key = event.clipboardData.getData('text/plain');
  } 
  else{
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
  }
  var regex = /[0-9]/;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}

$('.method-select').change(function(){
    $('.payment-info').css('display', 'block');
    $('.payment-next').removeClass('disabled');
    if($(this).val() === "gcash"){
        $('.bdo').css('display','none');
        $('.gcash').css('display','block');
    }
    else{
        $('.bdo').css('display','block');
        $('.gcash').css('display','none');
    }
});