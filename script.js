let num1;
let updateNum2 = false;
let num2;
let operator;
let displayValue = '';
const calc = document.getElementById('calculator');
const display = document.getElementById('display-main');
const displaySec = document.getElementById('display-sec');

// array with each button in the calculator
let calcButtons = [
    {
        'type': 'operator',
        'id': 'add',
        'value': '+',
        'accessKey': '+'
    },
    {
        'type': 'operator',
        'id': 'substract',
        'value': '-',
        'accessKey': '-'
    },
    {
        'type': 'operator',
        'id': 'multiply',
        'value': '×',
        'accessKey': 'x'
    },
    {
        'type': 'operator',
        'id': 'divide',
        'value': '÷',
        'accessKey': '/'
    },
    {
        'type': 'operator',
        'id': 'result',
        'value': '=',
        'accessKey': '='
    },
    {
        'type': 'operator',
        'id': 'clear',
        'value': 'clear',
        'accessKey': 'c'
    },
    {
        'type': 'operator',
        'id': 'dot',
        'value': '.',
        'accessKey': '.'
    },
    {
        'type': 'value',
        'id': 'zero',
        'value': 0,
        'accessKey': '0'
    },
    {
        'type': 'value',
        'value': 1,
        'accessKey': '1'
    },
    {
        'type': 'value',
        'value': 2,
        'accessKey': '2'
    },
    {
        'type': 'value',
        'value': 3,
        'accessKey': '3'
    },
    {
        'type': 'value',
        'value': 4,
        'accessKey': '4'
    },
    {
        'type': 'value',
        'value': 5,
        'accessKey': '5'
    },
    {
        'type': 'value',
        'value': 6,
        'accessKey': '6'
    },
    {
        'type': 'value',
        'value': 7,
        'accessKey': '7'
    },
    {
        'type': 'value',
        'value': 8,
        'accessKey': '8'
    },
    {
        'type': 'value',
        'value': 9,
        'accessKey': '9'
    }
]

// function to draw the calculator
function drawCalculator() {

    calcButtons.forEach(item =>{

        let element = document.createElement('div');
        if('id' in item) {element.setAttribute('id', item.id);}
        element.classList.add('button');
        element.textContent = item.value;

        // handle behavior of button
        element.addEventListener('click', e => {
            if(item.type === 'value') {updateMainDisplay(item.value)}
            else {
                switch(item.value) {
                    case '.': 
                        (displayValue.includes('.')) ? updateMainDisplay('') : updateMainDisplay(item.value);
                        break;
                    case 'clear': 
                        updateMainDisplay(item.value);
                        break;
                    case '÷': 
                        if(! displayValue == '' & operator == undefined) {
                            updateMainDisplay(item.value);
                            operator = item.value;
                        };
                        break
                    case '×': 
                        if(! displayValue == '' & operator == undefined) {
                            updateMainDisplay(item.value);
                            operator = item.value;
                        };
                        break
                    case '-':
                        if(! displayValue == '' & operator == undefined) {
                            updateMainDisplay(item.value);
                            operator = item.value;
                        };
                        break
                    case '+': 
                        if(! displayValue == '' & operator == undefined) {
                            updateMainDisplay(item.value);
                            operator = item.value;
                        };
                        break
                }
            }

        });

        calc.appendChild(element);

    })
}

drawCalculator();

//function to update the displays
function updateMainDisplay(input) {
    if(input ==='clear') {
        display.innerHTML = ''; 
        operator = undefined;
    } else {
        display.innerHTML += input;
    }

    displayValue = display.innerHTML;
}

const btns = document.querySelectorAll('.button');

// function to operate
function operate(operator, num1, num2) {

    switch(operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '/':
            console.log(num1 / num2);
            return num1 / num2;
        case 'x': 
            return num1 * num2;
    }
}

operate('/', 423, 53);