let num1, num2, operator;
let displayValue = '';

const calc = document.getElementById('calculator');
const display = document.getElementById('display-main');
const displaySec = document.getElementById('display-sec');

// array with each button in the calculator
let calcButtons = [
    { type: 'operator', id: 'add', value: '+', accessKey: '+' },
    { type: 'operator', id: 'subtract', value: '-', accessKey: '-' },
    { type: 'operator', id: 'multiply', value: '×', accessKey: 'x' },
    { type: 'operator', id: 'divide', value: '÷', accessKey: '/' },
    { type: 'operator', id: 'result', value: '=', accessKey: '=' },
    { type: 'operator', id: 'clear', value: 'clear', accessKey: 'c' },
    { type: 'operator', id: 'dot', value: '.', accessKey: '.' },
    { type: 'value', id: 'zero', value: 0, accessKey: '0' },
    ...Array.from({length: 9}, (_, i) => ({type:'value', value: i+1, accessKey: (i+1).toString()}))
]

// function to draw the calculator
function drawCalculator() {

    calcButtons.forEach(item =>{
        let element = document.createElement('div');
        if(item.id) {element.id = item.id}
        element.classList.add('button');
        element.textContent = item.value;

        element.addEventListener('click', ()=> handleButtonClick(item));
        calc.appendChild(element);

    })
}

drawCalculator();

// Function to handle clicks
function handleButtonClick(item) {
    if(item.type === 'value') {
        updateMainDisplay(item.value);
    } else {
        handleOperator(item.value);
    }
};


//function to update the displays
function updateMainDisplay(input) {
    display.innerHTML += input; 
    displayValue = display.innerHTML;
}; 

function updateSecDisplay() {
    displaySec.innerHTML = displayValue;
}

function clearMainDisplay() {
    display.innerHTML = '';
    displayValue = '';
    operator = undefined;
};


function handleOperator(value) {
    switch(value) {
        case '.':
            if(!displayValue.includes('.')) updateMainDisplay(value);
            break;
        case 'clear': 
            clearMainDisplay();
            break;
        case '=': 
            let result = calculateResults(displayValue);
            updateSecDisplay();
            clearMainDisplay();
            updateMainDisplay(result);
            break;
        default: 
            if(displayValue) {
                updateMainDisplay(value);
                operator = value;
            }
    }
}

// const btns = document.querySelectorAll('.button');

// function to operate
function operate(a, operator, b) {
    a = Number(a);
    b = Number(b);

    switch (operator) {
        case '×':
            return a * b;
        case '÷':
            return a / b;
        case '+':
            return a + b;
        case '-':
            return a - b;
        default:
            throw new Error(`Unsupported operator: ${operator}`);
    }
}

function calculateResults(input = '2+9÷3-5×2×3') {
    arr = input.match(/\d+|[×÷+\-]/g);
    const operators = [
        ['×', '÷'], // calc first
        ['+', '-']  // calc after
    ];

    for (const ops of operators) {
        let i = 0;
        while (i < arr.length) {
            if (ops.includes(arr[i])) {
                const a = arr[i - 1];
                const operator = arr[i];
                const b = arr[i + 1];

                // perform the calc
                const result = operate(a, operator, b);

                // replace the three elements with the result
                arr.splice(i - 1, 3, result.toString());

                i = Math.max(0, i - 2);
            } else {
                i++;
            }
        }
    }
    return arr;
}