window.addEventListener('load', () =>{
    document.querySelector('.loader').style.display = "none";
    document.body.classList.remove('no-scroll');
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

    startDate = start.format('MM-DD-YYYY');
    endDate = end.format('MM-DD-YYYY');

    startDateArray = start.toArray()[1]+1 + '/' + start.toArray()[2] + '/' + start.toArray()[0];
    endDateArray = end.toArray()[1]+1 + '/' + end.toArray()[2] + '/' + end.toArray()[0];

    $('.display-check-in').html(startDate);
    $('.display-check-out').html(endDate);
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

$('.guest-info-next').click(function(e){
    e.preventDefault();

    let valid = 0;
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
    }
});

$('.payment-next').click(function(e){
    e.preventDefault();

    if(document.querySelector("input[type='file']").files.length === 0){
        $('.file-error').css('display', 'block');
    }
    else{
        $('.file-error').css('display', 'none');
        formStepsNum++;
        updateFormSteps();
        updateProgressbar();
        scrollToTop();
    }

    let randomNum = Math.floor((Math.random() * 10000) + 1000);
    $('.r_id').text(randomNum);
    $('.checkin').text(startDate);
    $('.checkout').text(endDate);
    $('.first_name').text($('input[name="firstname"]').val());
    $('.last_name').text($('input[name="lastname"]').val());

    $('.summary-total').text($('.display-total').text());
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

let isChanged = false;
$('.accomodation-select').change(function(){
    $('.accomodation-error').css('display', 'none');

    $('.selected-accomodation').html('<b>Accomodation</b>: <span class="display-accomodation">'+$(".accomodation-select option:selected").text()+'</span>');

    if($(this).val() === "public"){
        if(($('.time-select').get(0).selectedIndex !== 0) || ($('.private-extra').get(0).selectedIndex !== 0) || isChanged){
            $('.discard-modal').modal('show');
        }
        else{
            $('.public-container').css('display', 'inline-flex');
            $('.public-room-selected').css('display', 'block');
            $('.private-container').css('display', 'none');
            $('.private-room-selected').css('display', 'none');
            $('.display-total').html('0');
        }
    }
    else{
        if(newSelectedRoomsCottages.length !== 0){
            $('.discard-modal').modal('show');
        }
        else{
            $('.private-container').css('display', 'inline-flex');
            $('.private-room-selected').css('display', 'block');
            $('.public-container').css('display', 'none');
            $('.public-room-selected').css('display', 'none');
            privatePoolSelected();
        }
    }
});

$('.private-addons input').change(function(){
    isChanged = true;
});

$('.discard-changes').siblings().click(function(){
    if($('.accomodation-select').val() === 'public'){
        $('.accomodation-select').get(0).selectedIndex = 2;
    }
    else{
        $('.accomodation-select').get(0).selectedIndex = 1;
    }
});

$('.discard-changes').click(function(){
    if($('.accomodation-select').val() === 'private'){
        for(let i = 0; i < $('.room-item').length; i++){
            $('.room-item').remove();
        }
        $('.addons input').each(function() {
            $(this).prop('checked', false);
        });
        newSelectedRoomsCottages = [];

        $('.private-container').css('display', 'inline-flex');
        $('.private-room-selected').css('display', 'block');
        $('.public-container').css('display', 'none');
        $('.public-room-selected').css('display', 'none');
        privatePoolSelected();
    }
    else{
        $('.time-select').get(0).selectedIndex = 0;
        $('.private-extra').get(0).selectedIndex = 0;

        $('.private-addons input').each(function() {
            $(this).prop('checked', false);
        });
        privateTotal = 10000;

        $('.public-container').css('display', 'inline-flex');
        $('.public-room-selected').css('display', 'block');
        $('.private-container').css('display', 'none');
        $('.private-room-selected').css('display', 'none');
        isChanged = false;
        $('.display-total').html('0');
    }
    setTimeout(function(){
        $(".discard-modal").modal('hide');
    }, 100);

});

$(document).ready(function(){
    $('.public-container').css('display', 'none');
    $('.public-rooms-container').children().css('display','none');
    $('.private-container').css('display', 'none');

    $('.display-check-in').html(moment().format('MM/DD/YYYY'));
    $('.display-check-out').html(moment().add(1, 'days').format('MM/DD/YYYY'));
});

$('.room-cottage-select').change(function(){
    $('.select-room-error').css('display', 'none');
    $('.select-atleast-error').css('display', 'none');

    $('.addons input').each(function() {
        $(this).prop('checked', false);
    });

    if($('.room-cottage-select-div').hasClass('col-lg-12')){
        $('.room-cottage-select-div').removeClass('col-lg-12');
        $('.room-cottage-select-div').addClass('col-lg-3');
    }

    if($(this).val() === 'umbrella'){
        $('.umbrella-card').css('display', 'block');
        $('.umbrella-card').siblings().css('display', 'none');
    }
    else if($(this).val() === 'cottagekubo'){
        $('.cottage-kubo-card').css('display', 'block');
        $('.cottage-kubo-card').siblings().css('display', 'none');
    }
    else if($(this).val() === 'room'){
        $('.room-card').css('display', 'block');
        $('.room-card').siblings().css('display', 'none');
    }
});

$('.room-cottage-select').change(function(){
    $('.select-room-error').css('display', 'none');
});



let tempSelectedRoomsCottages = [];
let roomId, roomName, roomPrice, numOfAdult, numOfKids, selectedAddOns, total;
let numOfRes = 0;

$('.select-this-room').click(function(e){
    e.preventDefault();
    numOfRes++;
    tempSelectedRoomsCottages = [];

    /*$('.added-modal').modal('show');
    setTimeout(function(){
        $(".added-modal").modal('hide');
    }, 2000);*/

    selectedAddOns = [];

    roomId = numOfRes;
    roomName = $(this).parent().parent().find('.card-title').text();
    numOfAdult = $(this).parent().siblings().find('#select-adult').val();
    numOfKids = $(this).parent().siblings().find('#select-kids').val();
    roomPrice = $(this).prev().find('b').text().split(' ')[1];

    $('.addons input:checked').each(function() {
        selectedAddOns.push($(this).attr('name'));
    });

    tempSelectedRoomsCottages.push({roomId, roomName, roomPrice, numOfAdult, numOfKids, selectedAddOns});

    total = 0;
    for(let i = 0; i < selectedAddOns.length; i++){
        if($.inArray('Karaoke', tempSelectedRoomsCottages[0].selectedAddOns) !== -1){
            total += 200;
        }
        else if($.inArray('Dirty Kitchen', tempSelectedRoomsCottages[0].selectedAddOns) !== -1){
            total += 250;
        }
    }

    publicPoolSelected();
});

let isAddonsEmpty;
function publicPoolSelected(){
    $('.public-room-selected').css('display','block');
    $('.private-room-selected').css('display','none');

    newSelectedRoomsCottages = newSelectedRoomsCottages.concat(tempSelectedRoomsCottages);

    if(tempSelectedRoomsCottages[0].selectedAddOns.length === 0){
        isAddonsEmpty = 'None';
    }
    else{
        isAddonsEmpty = tempSelectedRoomsCottages[0].selectedAddOns;
    }

    let roomSummary = $(`<div class="room-item">
                        <div class="selected-room-name">
                            <span class="room-id" name="`+tempSelectedRoomsCottages[0].roomId+`" style="display: none;"></span>
                            <b class="display-room">Room/Cottage: </b>`+tempSelectedRoomsCottages[0].roomName+`
                        </div>
                        <div class="selected-price">
                            <b>Price</b>: <span class="display-price">`+tempSelectedRoomsCottages[0].roomPrice+`</span>
                        </div>
                        <div class="selected-number-of-people">
                            <b>Guest(s)</b>:
                            <span class="selected-number-of-adult">
                                <span class="display-adult">`+tempSelectedRoomsCottages[0].numOfAdult+`</span> Adult(s),
                            </span>
                            <span class="selected-number-of-kids">
                                <span class="display-kids">`+tempSelectedRoomsCottages[0].numOfKids+`</span> Kid(s)
                            </span>
                        </div>
                        <div class="selected-addons">
                            <b>Add-ons</b>: <span class="display-addons">`+isAddonsEmpty+`</span>
                        </div>
                        <div>
                            <a href="#" style="color:red" class="room-remove" onclick="roomRemove(event, this)">Remove</a>
                        </div>
                    </div>`);

    $('.public-room-selected .room-summary').append(roomSummary.clone());

    for(let i = 0; i <= newSelectedRoomsCottages.length-1; i++){
        total += parseInt(newSelectedRoomsCottages[i].roomPrice);
    }
    for(let i = 1; i < parseInt(tempSelectedRoomsCottages[0].numOfAdult); i++){
        total += 150;
    }
    for(let i = 0; i < parseInt(tempSelectedRoomsCottages[0].numOfKids); i++){
        total += 100;
    }
    $('.display-total').html(total);
}

let newSelectedRoomsCottages = [];

function roomRemove(e, el){
    e.preventDefault();

    let parentEl = $(el).parent().parent();
    let getRoomId = parentEl.find('.room-id').attr('name');
    let getRoomIndex = newSelectedRoomsCottages.findIndex(x => x.roomId === parseInt(getRoomId));

    // REMOVE FROM ROOM LIST HTML
    parentEl.fadeOut(500, function(){ parentEl.remove(); });

    // UPDATE TOTAL PRICE
    let price = newSelectedRoomsCottages[getRoomIndex].roomPrice;
    total = total - parseInt(price);
    $('.display-total').html(total);

    // REMOVE FROM ROOM ARRAY
    newSelectedRoomsCottages.splice(getRoomIndex,1);
}

let privateAddons = [];
let privateTime, privateExtra, isPrivateAddonsEmpty, privateTotal = 10000;
function privatePoolSelected(){
    $('.public-room-selected').css('display','none');
    $('.private-room-selected').css('display','block');

    // EXTRA
    privateExtra = $('.private-extra').val();

    

    // ADD ONS
    if(privateAddons.length === 0){
        isPrivateAddonsEmpty = 'None';
    }
    else{
        isPrivateAddonsEmpty = privateAddons;
    }

    // TIME
    if($('.time-select').val() === null){
        privateTime = 'None selected';
    }

    

    let privateRoomSummary = $(`<div class="private-item">
                                    <div class="selected-price">
                                        <span>
                                            <b>Price</b>: <span class="display-price">10000</span>
                                        </span>
                                    </div>
                                    <div class="selected-time">
                                        <b>Time</b>:
                                        <span class="display-time">
                                            `+privateTime+`
                                        </span>
                                    </div>
                                    <div class="selected-extra">
                                        <b>Extra Pax</b>:
                                        <span class="display-extra">
                                            `+privateExtra+`
                                        </span>
                                    </div>
                                    <div class="selected-add-ons">
                                        <b>Add-ons</b>: <span class="display-add-ons">`+isPrivateAddonsEmpty+`</span>
                                    </div>
                                </div>`);

    $('.private-room-selected .room-summary').html(privateRoomSummary);

    for(let i = 0; i < parseInt(privateExtra); i++){
        privateTotal += 300;
    }

    /*for(let i = 0; i < privateAddons.length; i++){
        if($.inArray('Karaoke', privateAddons) !== -1){
            privateTotal += 200;
        }
        else if($.inArray('Dirty Kitchen', privateAddons) !== -1){
            privateTotal += 250;
        }
        else if($.inArray('Gasul', privateAddons) !== -1){
            privateTotal += 300;
        }
    }*/
    $('.display-total').html(privateTotal);
}

$('.time-select').change(function(){
    privateTime = $('.time-select').val();
    privatePoolSelected();
});

$('.private-extra').change(function(){
    privateExtra = $('.private-extra').val();
    privatePoolSelected();
});

$('.private-addons input').change(function(){
    if(!$(this).is(':checked')){
        let removeItem = $(this).attr('name');

        privateAddons = $.grep(privateAddons, function(value) {
          return value !== removeItem;
        });
        if($(this).attr('name') === 'Karaoke'){
            privateTotal -= 200;
        }
        if($(this).attr('name') === 'Dirty Kitchen'){
            privateTotal -= 250;
        }
        if($(this).attr('name') === 'Gasul'){
            privateTotal -= 300;
        }
    }
    else{
        privateAddons.push($(this).attr('name'));

        if($(this).attr('name') === 'Karaoke'){
            privateTotal += 200;
        }
        if($(this).attr('name') === 'Dirty Kitchen'){
            privateTotal += 250;
        }
        if($(this).attr('name') === 'Gasul'){
            privateTotal += 300;
        }
    }
    privatePoolSelected();
});

function privateRemove(el){
    // REMOVE FROM ROOM LIST HTML
    let remove = $(el).parent().parent().parent();
    remove.fadeOut(500, function(){ remove.remove(); });

    $('.display-total').html('0');
}

function privateEdit(){
    formStepsNum--;
    updateFormSteps();
    updateProgressbar();
    scrollToTop();
}

$('.time-select').change(function(){
    $('.select-time-error').css('display','none');
})

$('.date-next').click(function(e){
    e.preventDefault();

    if($('.accomodation-select').val()){
        $('.accomodation-error').css('display', 'none');

        if($('.accomodation-select').val() === "public"){
            if($('.room-cottage-select').val()){
                $('.select-room-error').css('display', 'none');

                if(newSelectedRoomsCottages.length === 0){
                    $('.select-atleast-error').css('display', 'block');
                }
                else{
                    $('.select-atleast-error').css('display', 'none');
                    formStepsNum++;
                    updateFormSteps();
                    updateProgressbar();
                    scrollToTop();
                }
            }
            else{
                $('.select-room-error').css('display', 'block');
            }
        }

        if($('.accomodation-select').val() === "private"){
            if(!$('.time-select').val()){
                $('.select-time-error').css('display','block');
            }
            else{
                $('.select-time-error').css('display','none');
                formStepsNum++;
                updateFormSteps();
                updateProgressbar();
                scrollToTop();
            }
        }
    }
    else{
        $('.accomodation-error').css('display', 'block');
    }
});

$('.view-full-details').click(function(e){
    e.preventDefault();

    $('.view-full-modal').modal('show');
});

$('.final-confirm').click(function(){
    if(!$('.i-have-read-check').is(':checked')){
        $('.check-error').css('display', 'block');
    }
    else{
        $('.check-error').css('display', 'none');
        $('.confirmation-modal').modal('show');
    }
});
$('.i-have-read-check').change(function(){
    $('.check-error').css('display', 'none');
});
