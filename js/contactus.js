const othersTextbox = document.querySelector('.specify');

window.addEventListener('load', () => {
	othersTextbox.style.display = "none";
});

const subjectSelect = document.querySelector('.form-select');

subjectSelect.addEventListener('change', () => {
	if(subjectSelect.value === "Others"){
		othersTextbox.style.display = "block";
	}
	else{
		othersTextbox.style.display = "none";
	}
});