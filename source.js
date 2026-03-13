const calculatorDisplay = document.querySelector(".calculator-display");
const calculatorDigits = document.querySelector(".calculator-digits");
const calculatorOperators = document.querySelectorAll(".calculator-operators");
const calculatorClear = document.querySelector(".calculator-clear");
const calculatorEquals = document.querySelector(".caluclator-equals");

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
        return;
    }

    if(operatorsCount(operands) <= 1 && operands.length == 3) {
        const firstNum = operands[0];
        const operator = operands [1];
        const secondNum = operands [2];
    
        const result = calculate(operator,+firstNum,+secondNum);
        if(!(result == undefined)) {
            displayContent = result;
            calculatorDisplay.textContent = displayContent;
            return;
        } else {
            inputError();
            return;
        }
    }

    for (let index = 0; index < operands.length; index++) {
        
        if(isHighestPrecedenceOperand(operands[index])) {
            let calculation = calculate(operands[index], +operands[index - 1], +operands[index + 1]);
            operands.splice(index - 1, 3, calculation);
            index ++;
        }
    }

    let compoundCalculation = 0 ; 
    while (operands.length != 0) {
        if(compoundCalculation == 0) {
            let fisrtCalculationArr = operands.splice(0, 3);
            compoundCalculation = calculate(fisrtCalculationArr[1], +fisrtCalculationArr[0], +fisrtCalculationArr[2]);
        }

        if(operands.length == 0) break;

        nextCalculationArr = operands.splice(0,2);

        compoundCalculation = calculate(nextCalculationArr[0], +compoundCalculation, +nextCalculationArr[1]);
    }

    if(compoundCalculation != 0 && compoundCalculation != undefined) {
        calculatorDisplay.textContent = compoundCalculation;
        return;
    } else {
        inputError();
    }

    //2 + 0.5 - 3 + 2 / 2 - 3
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

function isHighestPrecedenceOperand (elem) {
    const highPrecedenceOperand = ["*", "/"];

    for (const operand of highPrecedenceOperand) {
        if (operand == elem) return true;
    }

    return false;
}