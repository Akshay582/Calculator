const display = document.getElementById('display');

// fetching the click action from all the buttons in our calculator

const calculator = document.querySelector('main');
const keys = document.getElementById('controls');

const calculate = (n1, operator, n2) => {
    let result = '';

    if(operator === 'add'){
        result = parseFloat(n1) + parseFloat(n2);
    }else if(operator === 'subtract'){
        result = parseFloat(n1) - parseFloat(n2);
    }else if(operator === 'multiply'){
        result = parseFloat(n1) * parseFloat(n2);
    }else if(operator === 'divide' && n2 !== '0'){
        result = parseFloat(n1) / parseFloat(n2);
    }else if(operator === 'divide' && n2 === '0'){
        result = "Number cannot be divided by 0";
    }

    return result;
}

keys.addEventListener('click', e => {
    if(e.target.matches('button')){
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;

        if(!action){
            console.log('number key!');
            if(displayedNum === '0' || previousKeyType === 'operator' 
                || previousKeyType === 'calculate'){
                display.textContent = keyContent;
            }else{
                display.textContent = displayedNum + keyContent;
            }
            calculator.dataset.previousKeyType = 'number';
        }

        if(
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ){
            console.log('operand keys!');

            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;
            
            // Note: It's sufficient to check for firstValue and operator because secondValue always exists
            if (firstValue && operator && previousKeyType !== 'operator' &&
            previousKeyType !== 'calculate') {
                const calcValue = calculate(firstValue, operator, secondValue);
                display.textContent = calcValue;

                calculator.dataset.firstValue = calcValue;
            }else{
                calculator.dataset.firstValue = displayedNum;
            }
        
            key.classList.add('is-depressed');
            Array.from(key.parentNode.children)
            .forEach(k => k.classList.remove('is-depressed'));
            // Adding a custom attribute when an operator is clicked
            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.firstValue = displayedNum;
            calculator.dataset.operator = action;
        }

        if(action === 'decimal'){
            console.log('decimal key!');
            if(!displayedNum.includes('.')  && previousKeyType === 'operator'){
                display.textContent = '0.';
            }
            else if(!displayedNum.includes('.') && previousKeyType !== 'calculate'){
                display.textContent = displayedNum + '.';
            }else if(previousKeyType === 'operator' || previousKeyType === 'calculate'){
                display.textContent = '0.';
            }
            calculator.dataset.previousKeyType = 'decimal';
            
        }

        if(action === 'clear'){
            console.log('clear key!');
            if (key.textContent == 'AC'){
                calculator.dataset.firstValue = '';
                calculator.dataset.modValue = '';
                calculator.dataset.operator = '';
                calculator.dataset.previousKeyType = '';
            }else{
                key.textContent = 'AC';
            }

            display.textContent = 0;
            key.style.backgroundColor = '#605052';
            calculator.dataset.previousKeyType = 'clear';
        }

        if(action !== 'clear'){
            const clearButton = calculator.querySelector('[data-action=clear]');
            clearButton.textContent = 'CE';
            clearButton.style.backgroundColor = '#2e242c';
        }

        if(action === 'calculate'){
            console.log('calculate key!');
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;

            if(firstValue){
                if(previousKeyType === 'calculate'){
                    firstValue = displayedNum;
                    secondValue = calculator.dataset.modValue;
                }
                display.textContent = calculate(firstValue, operator, secondValue);

            }

            calculator.dataset.modValue = secondValue;
            calculator.dataset.previousKeyType = 'calculate';
        }
    }
})

