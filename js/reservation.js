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
    });
});

backBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        formStepsNum--;
        updateFormSteps();
        updateProgressbar();
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