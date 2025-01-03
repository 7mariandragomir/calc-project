let num1, num2, operator;
let displayValue = '';

const calc = document.getElementById('calculator');
const display = document.getElementById('display-main');
const displaySec = document.getElementById('display-sec');

// array with each button in the calculator
let calcButtons = [
    { type: 'operator', id: 'add', value: '+'},
    { type: 'operator', id: 'subtract', value: '-'},
    { type: 'operator', id: 'multiply', value: '×'},
    { type: 'operator', id: 'divide', value: '÷'},
    { type: 'operator', id: 'result', value: '='},
    { type: 'operator', id: 'clear', value: 'clear'},
    { type: 'operator', id: 'del', value: '⬅'},
    { type: 'operator', id: 'dot', value: '.'},
    { type: 'value', id: 'zero', value: 0},
    ...Array.from({length: 9}, (_, i) => ({type:'value', value: i+1}))
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


// handle keyboard inputs
window.addEventListener('keydown', (e)=> {
    const regNum = /\d+/g;
    const regOp = /[×÷=+\\-]/g;
    console.log(e);


    if(regNum.test(e.key)) {
        updateMainDisplay(e.key)
    } else if(regOp.test(e.key)) {
        handleOperator(e.key);
    } else {
        switch(e.key) {
            case 'Enter':
                handleOperator('=');
                break;
            case '/':
                handleOperator('÷');
                break;
            case 'x':
                handleOperator('×');
                break;
            case 'Backspace':
                eraseLast();
                break;
        }
    }
});

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

function eraseLast() {
    displayValue = displayValue.slice(0, -1);
    display.innerHTML = displayValue;
}

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
        case '⬅':
            eraseLast();
            break;
        case '=': 
            let result = calculateResults(displayValue);
            updateSecDisplay();
            clearMainDisplay();
        
            // add limit of 4 decimals if there are more than 4
            if(result.includes('.')) {
                let[intgPart, decmPart] = result.split('.');
                if(decmPart.length > 4){
                    updateMainDisplay(parseFloat(result).toFixed(4));
                } else updateMainDisplay(result);
            } else {
                updateMainDisplay(result);
            };
            
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
    arr = input.match(/\d+|[×÷/x+\-]/g);
    const operators = [
        ['×', '÷', '/', 'x'], // calc first
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
    return arr[0];
}