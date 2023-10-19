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

function scrollToTop(){
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


/* -------------------- DATEPICKER -------------------- */
let startDate, endDate;
let startDateArray, endDateArray, diff;

$('input[name="datetimes"]').daterangepicker({
    minDate: moment().format('MM/DD/YYYY'),
    autoApply: true,
    startDate: moment().format('MM/DD/YYYY'),
    endDate: moment().add(1, 'days').format('MM/DD/YYYY')
}, function(start, end, label) {
    startDate = start.format('MM-DD-YYYY');
    endDate = end.format('MM-DD-YYYY');

    startDateArray = start.toArray()[1]+1 + '/' + start.toArray()[2] + '/' + start.toArray()[0];
    endDateArray = end.toArray()[1]+1 + '/' + end.toArray()[2] + '/' + end.toArray()[0];

    $('.display-check-in').html(startDate);
    $('.display-check-out').html(endDate);
});

startDate = moment($('.datepicker').val().split('-')[0]).format('MM-DD-YYYY');
endDate = moment($('.datepicker').val().split('-')[1]).format('MM-DD-YYYY');

function getNumOfDaysDifference(){
    let cur = moment(new Date(startDateArray));
    let end = moment(new Date(endDateArray));
    diff = end.diff(cur, 'days');
    return diff;
}


/* -------------------- ACCOMODATION -------------------- */
$(document).ready(function(){
    $('.public-container').css('display', 'none');
    $('.public-rooms-container').children().css('display','none');
    $('.private-container').css('display', 'none');
    $('.private-room-selected').css('display', 'none');
    $('.public-room-selected').css('display', 'none');

    $('.display-check-in').html(moment().format('MM/DD/YYYY'));
    $('.display-check-out').html(moment().add(1, 'days').format('MM/DD/YYYY'));
});

let discard_text, isChanged = false;
$('.accomodation-select').change(function(){
    $('.accomodation-error').css('display', 'none');

    $('.selected-accomodation').html('<b>Accomodation</b>: <span class="display-accomodation">'+$(".accomodation-select option:selected").text()+'</span>');

    /* TO PRIVATE */
    if($(this).val() === "public"){
        if(($('.time-select').get(0).selectedIndex !== 0) || ($('.private-extra').get(0).selectedIndex !== 0) || isChanged){
            discard_text = $(`<p class="fs-6">You have made some change(s). Discard it?</p>`);
            $('.discard-modal .modal-body').html(discard_text);
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
    /* TO PUBLIC */
    else{
        if(newSelectedRoomsCottages.length !== 0){
            discard_text = $(`<p class="fs-6">You have reserved item(s). Discard it?</p>`);
            $('.discard-modal .modal-body').html(discard_text);
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

let tempSelectedRoomsCottages = [], newSelectedRoomsCottages = [];
let roomId, roomName, roomPrice, numOfAdult, numOfKids, selectedAddOns, subtotal, total = 0, numOfRes = 0;

$('.select-this-room').click(function(e){
    e.preventDefault();

    /*$('.added-modal').modal('show');
    setTimeout(function(){
        $(".added-modal").modal('hide');
    }, 2000);*/

    numOfRes++;
    tempSelectedRoomsCottages = [];
    subtotal = 0;
    selectedAddOns = [];

    roomId = numOfRes;
    roomName = $(this).parent().parent().find('.card-title').text();
    numOfAdult = $(this).parent().siblings().find('#select-adult').val();
    numOfKids = $(this).parent().siblings().find('#select-kids').val();
    roomPrice = $(this).prev().find('b').text().split(' ')[1];

    $('.addons input:checked').each(function() {
        selectedAddOns.push($(this).attr('name'));

        if($(this).attr('name') === 'Karaoke'){
            subtotal += 200;
        }
        if($(this).attr('name') === 'Dirty Kitchen'){
            subtotal += 250;
        }
    });

    publicPoolSelected();
});


let isAddonsEmpty;
function publicPoolSelected(){
    $('.public-room-selected').css('display','block');
    $('.private-room-selected').css('display','none');
    
    for(let i = 1; i < parseInt(numOfAdult); i++){
        subtotal += 150;
    }
    for(let i = 0; i < parseInt(numOfKids); i++){
        subtotal += 100;
    }
    /*for(let i = 0; i < selectedAddOns.length; i++){
        if($.inArray('Karaoke', selectedAddOns) !== -1){
            subtotal += 200;
        }
        else if($.inArray('Dirty Kitchen', selectedAddOns) !== -1){
            subtotal += 250;
        }
    }*/


    subtotal += parseInt(roomPrice);
    total += subtotal;
    tempSelectedRoomsCottages.push({roomId, roomName, roomPrice, numOfAdult, numOfKids, selectedAddOns, subtotal});
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
                        <div class="sub-total">
                            <b>Sub Total</b>: <span class="display-sub-total">`+subtotal+`</span>
                        </div>
                        <div>
                            <a href="#" style="color:red" class="room-remove" onclick="roomRemove(event, this)">Remove</a>
                        </div>
                    </div>`);
    $('.public-room-selected .room-summary').append(roomSummary.clone());
    $('.display-total').html(total);
}

function roomRemove(e, el){
    e.preventDefault();

    let parentEl = $(el).parent().parent();
    let getRoomId = parentEl.find('.room-id').attr('name');
    let getRoomIndex = newSelectedRoomsCottages.findIndex(x => x.roomId === parseInt(getRoomId));

    // REMOVE FROM ROOM LIST HTML
    parentEl.fadeOut(500, function(){ parentEl.remove(); });

    // UPDATE TOTAL PRICE
    let price = newSelectedRoomsCottages[getRoomIndex].subtotal;
    total = total - parseInt(price);
    $('.display-total').html(total);

    // REMOVE FROM ROOM ARRAY
    newSelectedRoomsCottages.splice(getRoomIndex,1);
}

let privateAddons = [];
let privateTime, privateExtra, isPrivateAddonsEmpty, privateTotal, addonsCheck = 0;
function privatePoolSelected(){
    $('.public-room-selected').css('display','none');
    $('.private-room-selected').css('display','block');

    privateTotal = 10000 + addonsCheck;

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
    $('.display-total').html(privateTotal);
}


$('.time-select').change(function(){
    $('.select-time-error').css('display','none');

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
            addonsCheck -= 200;
        }
        if($(this).attr('name') === 'Dirty Kitchen'){
            addonsCheck -= 250;
        }
        if($(this).attr('name') === 'Gasul'){
            addonsCheck -= 300;
        }
    }
    else{
        privateAddons.push($(this).attr('name'));

        if($(this).attr('name') === 'Karaoke'){
            addonsCheck += 200;
        }
        if($(this).attr('name') === 'Dirty Kitchen'){
            addonsCheck += 250;
        }
        if($(this).attr('name') === 'Gasul'){
            addonsCheck += 300;
        }
    }
    privatePoolSelected();
});

$('.discard-modal').click(function(e){
    if (e.target === e.currentTarget) {
        /* TO PUBLIC */
        if($('.accomodation-select').val() === "public"){
            $('.accomodation-select').get(0).selectedIndex = 2;
        }
        /* TO PRIVATE */
        else{
            $('.accomodation-select').get(0).selectedIndex = 1;
        }
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

$('.discard-changes').siblings().click(function(){
    if($('.accomodation-select').val() === 'public'){
        $('.accomodation-select').get(0).selectedIndex = 2;
    }
    else{
        $('.accomodation-select').get(0).selectedIndex = 1;
    }
});

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


/* -------------------- GUEST INFO -------------------- */
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


/* -------------------- PAYMENT -------------------- */
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


/* -------------------- CONFIRM -------------------- */
$('.view-full-details').click(function(e){
    e.preventDefault();
    let details, rooms, footerTotal;
    
    if($('.accomodation-select').val() === 'public'){
        details = $(`<table class="table text-center">
                        <thead>
                            <tr>
                                <th>Accomodation Type</th>
                                <th>Check In Date</th>
                                <th>Check Out Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Public Pool</td>
                                <td>`+startDate+`</td>
                                <td>`+endDate+`</td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="table text-center mb-0">
                        <thead>
                            <tr>
                                <th style="width: 30%">Room/Cottage Selected</th>
                                <th style="width: 10%">Adult(s)</th>
                                <th style="width: 10%">Kid(s)</th>
                                <th style="width: 20%">Add-ons</th>
                                <th style="width: 15%">Price Per Night</th>
                                <th style="width: 15%">Sub Total</th>
                            </tr>
                        </thead>
                    </table>
                    `);
        $('.view-full-modal .modal-body').html(details);
        for(let i = 0; i <= newSelectedRoomsCottages.length-1; i++){
            rooms = $(`<table class="table mb-0 text-center">
                            <tbody>
                                <tr>
                                    <td style="width: 30%">`+newSelectedRoomsCottages[i].roomName+`</td>
                                    <td style="width: 10%">`+newSelectedRoomsCottages[i].numOfAdult+`</td>
                                    <td style="width: 10%">`+newSelectedRoomsCottages[i].numOfKids+`</td>
                                    <td style="width: 20%">`+newSelectedRoomsCottages[i].selectedAddOns+`</td>
                                    <td style="width: 15%">`+newSelectedRoomsCottages[i].roomPrice+`</td>
                                    <td style="width: 15%">`+newSelectedRoomsCottages[i].subtotal+`</td>
                                </tr>
                            </tbody>
                        </table>`);
            $('.view-full-modal .modal-body').append(rooms);
        }
        footerTotal = $(`<table class="table">
                            <tbody>
                                <tr>
                                    <td class="text-end">
                                        <b>TOTAL</b>:
                                    </td>
                                    <td class="text-center" style="width: 15%">
                                        <b>`+total+`</b>
                                    </td>
                                </tr>
                            </tbody>
                        </table>`);
        $('.view-full-modal .modal-body').append(footerTotal);
    }
    else{
        details = $(`<table class="table text-center">
                        <thead>
                            <tr>
                                <th>Accomodation Type</th>
                                <th>Check In Date</th>
                                <th>Check Out Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Private Pool</td>
                                <td>`+startDate+`</td>
                                <td>`+endDate+`</td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="table text-center mb-0">
                        <thead>
                            <tr>
                                <th style="width: 30%">Time</th>
                                <th style="width: 10%">Extra(s)</th>
                                <th style="width: 10%">Add-ons</th>
                                <th style="width: 15%">Price Per Night</th>
                                <th style="width: 15%">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>`+privateTime+`</td>
                                <td>`+privateExtra+`</td>
                                <td>`+privateAddons+`</td>
                                <td>10000</td>
                                <td>`+privateTotal+`</td>
                            </tr>
                        </tbody>
                    </table>`);
        $('.view-full-modal .modal-body').html(details);
    }

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
