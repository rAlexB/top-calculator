const calculatorDisplay = document.querySelector(".calculator-display");
const calculatorDigits = document.querySelector(".calculator-digits");
const calculatorOperators = document.querySelectorAll(".calculator-operators");
const calculatorClear = document.querySelector(".calculator-clear");
const calculatorEquals = document.querySelector(".caluclator-equals");

//TODO: preprar multiplas operaçoes (5+4 -2, analisar primeiro 5+4, depois o -2), nao esquecer da precedencia matemática

document.addEventListener("DOMContentLoaded", (event) => {
    calculatorEquals.addEventListener("click", prepareCalculation);
    calculatorClear.addEventListener("click", clearDisplay);
});

for (const digit of calculatorDigits.children) {
    digit.addEventListener("click", writeDigit);
}

for (const op of calculatorOperators) {
    op.addEventListener("click", writeOperator);
}

function writeOperator (elem) {
    const displayText = calculatorDisplay.textContent;
    if(validateDisplayText(splitDisplayContent(displayText), "O")) {
        calculatorDisplay.textContent = calculatorDisplay.textContent + ` ${elem.target.textContent} `;
        return;
    }
    inputError();
}

//funcao mais simples, simplesmente add nr
function writeDigit (elem) {
    const displayText = calculatorDisplay.textContent;
    if(validateDisplayText(splitDisplayContent(displayText))) {
        calculatorDisplay.textContent = calculatorDisplay.textContent + `${elem.target.textContent}`;
        return;
    }
    inputError();
}

function splitDisplayContent (text) {
    return text
    .trim()
    .split(" ")
    .map(str => str.split(""));
}

function isDigit (digit) {

    const validDigits = ["1","2","3","4","5","6","7","8","9","0"];

    for (const num of validDigits) {
        if(digit === num) {
            return true;
        }
    }

    return false;
}

function isOperator (operator) {

    const returnArr = [];
    
    const validOperators = ["+", "*","-","/"];

    for (const op of validOperators) {
        if(op === operator) {
            return true;
        }
    }

    return false;
}


function validateDisplayText (splittedArrayText, flagValType = "D") {
    const firstChar = splittedArrayText[0][0];
    const firstText = splittedArrayText[0].join("");
    
    //TODO: refactor this code (maybe in a switch statement) 
    if(firstText === "Welcome" || firstText === "Input") {
        calculatorDisplay.textContent = "";
        
        if(flagValType == "D") return true;
        return false;

    } else if(flagValType === "O") {
        if(firstChar == undefined) return false;
    
        return true;

    } else if (isDigit(firstChar)){
        return true;
    }

    return true;
}

function prepareCalculation() {
    let displayContent = calculatorDisplay.textContent;
    clearDisplay();
    const operands = displayContent.trim().split(" ");

    if(isOperator(operands.at(-1))) {
        inputError();
        return;
    }
    if(isDigit(operands.at(-1)) && operands.length == 1) {
        displayContent = operands.at(-1);
    }

    if(operatorsCount(operands) <= 1 && operands.length == 3) {
        const firstNum = operands[0];
        const operator = operands [1];
        const secondNum = operands [2];
    
        //TODO: lidar com o erro e se calhar concentrar alteracao de valores de display num metodo
        const result = calculate(operator,+firstNum,+secondNum);
        if(!(result == undefined)) {
            displayContent = result;
        } else {
            inputError();
            return;
        }
    }

    
    calculatorDisplay.textContent = displayContent;
    return;
}

function calculate (op, fisrstValue, secondValue) {
    switch(op){
        case "+":
            return fisrstValue + secondValue;
        case "-":
            return fisrstValue - secondValue;
        case "*":
            return fisrstValue * secondValue;
        case "/":
            if(secondValue == 0) break;
            return fisrstValue / secondValue;
        default:
            break;
    }
}         

function inputError () {
    calculatorDisplay.textContent = "";
    calculatorDisplay.textContent = "Input is not valid...";
}

function clearDisplay () {
    calculatorDisplay.textContent = "";
}

function operatorsCount (arr) {
    let count = 0;
    for (const op of arr) {
        if(isOperator(arr)) count++;
    }

    return count;
}

function mathPriority (arr) {
    const priorityOperators = ["*", "/"];
    const orderedMathArr = [];

    for (const key of arr) {
        
        if(priorityOperators.includes(key)) {

            let index = arr.indexOf(key);

            if(arr[index - 1] == undefined) {
                if(!(isOperator(arr[index]))) {
                    orderedMathArr.push(arr.splice((index + 1), 1));
                    orderedMathArr.push(arr.splice((index), 1));
                    break;
                } else {
                    orderedMathArr.push(...arr.splice(index, 2));
                }
            }
            let priorityItems = arr.splice((index - 1), 3);
            orderedMathArr.unshift(...priorityItems);
            
        }
    }

    for(const elem of arr) {
        let index = arr.indexOf(elem);

        /*if(isDigit(elem) && isOperator(arr[index + 1]) && arr.length == 2) {
            orderedMathArr.push(...arr.splice((index + 1), 1));
            orderedMathArr.push(...arr.splice((index), 1));*/
        if(index == 0 && isDigit(elem)) {
            orderedMathArr.push(...arr.splice((index + 1), 1));
            orderedMathArr.push(...arr.splice((index), 1));
        } else if (arr.length == 2) {
            //orderedMathArr.push(...arr.splice((index), (arr.length - 1)));
            orderedMathArr.push(...arr);
            arr = [];
        }
        
    }

    if(!(arr.length == 0)) orderedMathArr.push(...arr);

    return orderedMathArr;

}
// + 3
// 3 + 
// 3 + 3
// 1) main: 2 + 1 + 2 / 3
// 2) second: 2 / 3
// 2) main: 1 + 
// 3) second: 2 / 3 + 1 
// 4) main : undefined

// 1 / 2 * 2
// 1 + 2 * 3 -2
//1 + 2 / 3 * 2  -> 2 / 3 1 + * 2 -> 2 / 3 + 1 * 2