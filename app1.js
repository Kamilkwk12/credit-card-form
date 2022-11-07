// cleaning form onload
const inputs = document.getElementsByTagName('input');

window.onload = function() {
    for (let i=0; i < 5; i++) {
        var selectedInput = inputs[i];
        selectedInput.value = '';
    }
}

// error messages variables
const form = document.getElementById('form');
const errorName = document.getElementById('error-name');
const errorNumber = document.getElementById('error-number');
const errorExpDate = document.getElementById('error-exp');
const errorCvv = document.getElementById('error-cvv');


// functions locking number or letter inputs in fields
function checkNumbers(event) {
    var keyId = event.which;
    if (keyId >= 48 && keyId <= 57) {
        errorName.textContent = "Numbers aren't allowed in this field"; 
        event.returnValue = false;
    }
    else {
        event.returnValue = true;
    }
}

function checkLetters(event, fieldId) {
    var keyId = event.which;
    if (!(keyId >= 48 && keyId <= 57 || keyId == 8)) {
        if (fieldId == '1') {
            errorNumber.textContent = "Letters aren't allowed in this field";
        }
        if (fieldId == '2') {
            errorExpDate.textContent = "Letters aren't allowed";
        }
        if (fieldId == '3') {
            errorExpDate.textContent = "Letters aren't allowed";
        }
        if (fieldId == '4') {
            errorCvv.textContent = "Letters aren't allowed";
        }
        event.returnValue = false;
    }
    else {
        if (fieldId == '1') {
            errorNumber.textContent = "";
        }
        if (fieldId == '2') {
            errorExpDate.textContent = "";
        }
        if (fieldId == '3') {
            errorExpDate.textContent = "";
        }
        if (fieldId == '4') {
            errorCvv.textContent = "";
        }
        event.returnValue = true;
    }
}


// carholder name uptade on card and check if name and surname are typed correctly
const cardHolderInput = document.getElementById('cardholder-name');
const cardHolderOutput = document.getElementById('name-on-card');
const submit = document.getElementById('confirm');

cardHolderInput.addEventListener('input', nameOnCard);

function nameOnCard(e) {
    if(e.target.value == ''){
        cardHolderOutput.innerHTML = 'JANE APPLESEED'
    }
    else{
        var regexNumbers = /\d+/g;
        var regExArray = cardHolderInput.value.match(regexNumbers);
        if (regExArray == null) {
            regExArray = '';
        }
        if(regExArray.length >= 1) {
            errorName.textContent = "Numbers aren't allowed in this field";
        }
        else {
            errorName.textContent = '';
            cardHolderOutput.innerHTML = e.target.value;
        }
    }
    
}

cardHolderInput.addEventListener('blur', function() {
    var regex = /^[A-Z]{1}[a-z]+ [A-Z]{1}[a-z]+$/;
    var nameSurname = cardHolderInput.value;
    if(regex.test(nameSurname) == true){
        cardHolderInput.style.borderColor = 'green';
    }
    else {
        if(nameSurname == '') {
            cardHolderInput.style.borderColor = 'red';
            errorName.innerHTML = "Field can't be blank";
        }
        else {
            cardHolderInput.style.borderColor = 'red';
            errorName.innerHTML = 'Wrong format - enter required format';
        }
    }
})

// card number uptade on card and validation
const cardNumberOutput = document.getElementById('card-number-on-card');
const cardNumberInput = document.getElementById('card-number');


cardNumberInput.addEventListener('input', numberOnCard);

function numberOnCard(e) { 
    if(e.target.value == ''){
        cardNumberOutput.innerHTML = '1234 5678 9123 4000';
    }
    else{
        errorNumber.textContent = '';
        var elements = [
            firstQuartet = cardNumberInput.value.substring(0,4),
            secondQuartet = cardNumberInput.value.substring(4,8),
            thirdQuartet = cardNumberInput.value.substring(8,12),
            fourthQuartet = cardNumberInput.value.substring(12,16)
        ]
        cardNumberOutput.innerHTML = elements.join(' ');
    }
}

cardNumberInput.addEventListener('blur', function() {
    if(cardNumberInput.value.length != 16) {
        if(cardNumberInput.value == '') {
            cardNumberInput.style.borderColor = 'red';
            errorNumber.innerHTML = "Field can't be blank";
        }
        else{
            cardNumberInput.style.borderColor = 'red';
            errorNumber.innerHTML = 'Wrong format - enter 16 digit number';
        }
    }
    else {
        cardNumberInput.style.borderColor = 'green';
        errorNumber.innerHTML = '';
    }

})


// expiration date update on card and validation
const month = document.getElementById('expiration-month');
const year = document.getElementById('expiration-year');
const dateOutput = document.getElementById('date-on-card');

month.addEventListener('input', dateOnCard);
year.addEventListener('input', dateOnCard);

function dateOnCard() {
    if(month.value == '' && year.value == '') {
        dateOutput.innerHTML = '00/00';
    }
    else{
        dateOutput.innerHTML = month.value + '/' + year.value;
    }
}

month.addEventListener('blur', monthFormatCheck);
year.addEventListener('blur', yearFormatCheck);

function monthFormatCheck() {
    if (month.value.length != 2) {
        if(month.value == '') {
            errorExpDate.textContent = "Field can't be blank";
            month.style.borderColor = 'red'
        }
        else{
            errorExpDate.textContent = 'Enter date correctly'
            month.style.borderColor = 'red'
        }
    }
    else {
        var monthNumber = Number(month.value);
        if (monthNumber >= 1 && monthNumber <=12){
            if (!year.style.borderColor == "red") {
                errorExpDate.textContent = '';
            }
            else{
                month.style.borderColor = 'green'
            }
        }
        else {
            errorExpDate.textContent = 'Invalid date'
            month.style.borderColor = 'red'
        }
        if (month.style.borderColor == 'green' && year.style.borderColor == 'green') {
            errorExpDate.textContent = '';
        }
    }
}

function yearFormatCheck() {
    if (year.value.length != 2) {
        if(year.value == '') {
            errorExpDate.textContent = "Field can't be blank";
            year.style.borderColor = 'red'
        } 
        else {
            errorExpDate.textContent = 'Enter date correctly'
            year.style.borderColor = 'red'
        }
    }
    else {
        var yearNumber = Number(year.value);
        if (yearNumber >= 22 && yearNumber <=99){
                year.style.borderColor = 'green';
        }
        else {
            errorExpDate.textContent = 'Invalid date'
            year.style.borderColor = 'red'
        }
        if (month.style.borderColor == 'green' && year.style.borderColor == 'green') {
            errorExpDate.textContent = '';
        }
    }
}


// cvv update on card and validation
const cvvInput = document.getElementById('cvv');
const cvvOutput = document.getElementById('cvv-on-card');

cvvInput.addEventListener('input', cvvOnCard);

function cvvOnCard(e) {
    if (e.target.value == '') {
        cvvOutput.innerHTML = '123';
    }
    else {
        cvvOutput.innerHTML = e.target.value;
    }
}

cvvInput.addEventListener('blur', function() {
    if(cvvInput.value.length !== 3) {
        if(cvvInput.value == '') {
            cvvInput.style.borderColor = 'red';
            errorCvv.textContent = "Field can't be blank";
        }
        else {
            cvvInput.style.borderColor = 'red';
            errorCvv.textContent = "Enter 3 digit number";
        }
    }
    else{
        cvvInput.style.borderColor = 'green';
        errorCvv.textContent = "";
    }
})


// submit validations and saving date from a form in localstorage to 
// extract it in complete.html
form.addEventListener('submit', validateData);

function validateData(event) {
    if (cardHolderInput.value == '' || cardHolderInput.value == null) {
        cardHolderInput.style.borderColor = 'red'
        errorName.textContent = "Field can't be blank";
        event.preventDefault();
    }

    if (cardNumberInput.value == '' || cardNumberInput.value == null) {
        cardNumberInput.style.borderColor = 'red'
        errorNumber.textContent = "Field can't be blank";
        event.preventDefault();
    }

    if (month.value == '' || month.value == null) {
        month.style.borderColor = 'red'
        errorExpDate.textContent = "Field can't be blank";
        event.preventDefault();
    }
    if (year.value == '' || year.value == null) {
        year.style.borderColor = 'red'
        errorExpDate.textContent = "Field can't be blank";
        event.preventDefault();
    }
    if (cvvInput.value == '' || cvvInput.value == null) {
        cvvInput.style.borderColor = 'red'
        errorCvv.textContent = "Field can't be blank";
        event.preventDefault();
    }

    const errorMessages = document.getElementsByClassName('error');

    for (var i = 0; errorMessages.length > i; i++) {
        if(errorMessages[i].textContent != '') {
            event.preventDefault();
        }
    }

    const nameValue = cardHolderInput.value;
    const numberValue = cardNumberInput.value;
    const monthValue = month.value;
    const yearValue = year.value;
    const cvvValue = cvvInput.value;
    window.localStorage.setItem('name-value', nameValue);
    window.localStorage.setItem('number-value', numberValue);
    window.localStorage.setItem('month-value', monthValue);
    window.localStorage.setItem('year-value', yearValue);
    window.localStorage.setItem('cvv-value', cvvValue);
}










