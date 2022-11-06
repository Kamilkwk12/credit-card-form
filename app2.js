
const cardholderName = window.localStorage.getItem('name-value');
const number = window.localStorage.getItem('number-value');
const month = window.localStorage.getItem('month-value');
const year = window.localStorage.getItem('year-value');
const cvv = window.localStorage.getItem('cvv-value');


document.getElementById('name-on-card').textContent = cardholderName;


var elements = [
    firstQuartet = number.substring(0,4),
    secondQuartet = number.substring(4,8),
    thirdQuartet = number.substring(8,12),
    fourthQuartet = number.substring(12,16)
]
document.getElementById('card-number-on-card').textContent = elements.join(' ');

document.getElementById('date-on-card').textContent = month + "/" + year;
document.getElementById('cvv-on-card').textContent = cvv;


