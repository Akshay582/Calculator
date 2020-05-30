const display = document.getElementById('display');
const calculator = document.querySelector('main');
const expression = document.getElementById('expression');
const heading = document.querySelector('header');
const control = document.getElementById('controls');

var evalExp = "";

control.addEventListener('click', event => {
    if(event.target.matches('button')){
        const key = event.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;

        // FOR HEADING SET AS NOT DEFINED
        if(heading.textContent === 'NOT DEFINED'){
            console.log('Because the title is NOT DEFINED.')
            heading.textContent = 'CALCULATOR';
        }

        // FOR NUMBER KEYS
        if(!action){
            // if action is UNDEFINED
            console.log('Number Key: ' + keyContent);
            if(displayedNum === '0' || 
            previousKeyType === 'operator'){
                display.textContent = keyContent;
                calculator.dataset.previousKeyType = 'number';
            }else if(previousKeyType === 'calculate' ){
                evalExp = "";
                calculator.dataset.previousKeyType = 'number';
                display.textContent = keyContent;
            }else{
                display.textContent = displayedNum + keyContent;
            }

            evalExp = evalExp + keyContent;
            expression.textContent = evalExp;
        }

        // FOR OPERATOR KEYS

        if(
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'){
            
            console.log('Operator Key: ' + keyContent);
            lastOperator = keyContent;
            if(previousKeyType !== 'operator' &&
                previousKeyType !== 'calculate' &&
                displayedNum !== '0'){ 
            evalExp = evalExp + keyContent;
            calculator.dataset.previousKeyType = 'operator';01
            expression.textContent = evalExp;
            }else if(displayedNum === '0'){
                evalExp = displayedNum + keyContent;
                expression.textContent = evalExp;
                calculator.dataset.previousKeyType = 'operator';
            }
            else if(previousKeyType === 'calculate'){
                evalExp = displayedNum + keyContent;
                expression.textContent = evalExp;
                display.textContent = '0';
                calculator.dataset.previousKeyType = 'operator';
            }else{
                evalExp = evalExp.substring(0, evalExp.length - 1) + keyContent;
                expression.textContent = evalExp;
            }
        }

        // FOR RESETTING THE CALCULATOR TO FRESH STATE

        if(action === 'clear'){
            console.log('Clear Key!');
            evalExp = "";
            expression.textContent = evalExp;
            display.textContent = '0';
        }

        // WILL NOT BE USED

        if(action === 'negate'){
            console.log('Negate Key!');
        }

        // NO IDEA  

        if(action === 'percentage'){
            if(evalExp !== ''){
                console.log('Percentage Key!');
                evalExp = evalExp + '/100';
                expression.textContent = evalExp;
                display.textContent = eval(evalExp);
            }
        }

        // TO GET THE ANSWER

        if(action === 'calculate'){
            console.log('Calculate Key!');
            if(previousKeyType === 'operator'){
                evalExp = evalExp.substring(0, evalExp.length - 1);
            }
            calculator.dataset.previousKeyType = 'calculate';
            if(Number.isNaN(eval(evalExp))){
                console.log('in NaN!');
                // Need to reset the calculator
                evalExp = "";
                expression.textContent = evalExp;
                display.textContent = '0';
                heading.textContent = 'NOT DEFINED';
            }else{
                display.textContent = eval(evalExp);
                expression.textContent = evalExp;
            }
        }

        // TO ADD THE DECIMAL

        if(action === 'decimal'){
            console.log('Decimal Key!');
            if(previousKeyType === 'operator'){
                evalExp = evalExp + '0.';
                expression.textContent = evalExp;
                display.textContent = '0.';
            }else if(displayedNum === '0'){
                evalExp = '0.';
                expression.textContent = evalExp;
                display.textContent = displayedNum + '.';
            }else if(!displayedNum.includes('.')){
                evalExp = evalExp + '.';
                expression.textContent = evalExp;
                display.textContent = displayedNum + '.';
            }
            calculator.dataset.previousKeyType = 'decimal';
        }
    }
})