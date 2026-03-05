const calculatorDisplay = document.querySelector(".calculator-display");
const calculatorDigits = document.querySelector(".calculator-digits");
const calculatorOperators = document.querySelectorAll(".calculator-operators");

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
        let count = 1;

        for (const text of splittedArrayText) {
            if(isOperator(text[0])) count++;
        }
        if(count > 1) return false;
        return true;

    } else {
        if(isDigit(firstChar)) return true;
        
    }

    return false;
}


function inputError () {
    calculatorDisplay.textContent = "";
    calculatorDisplay.textContent = "Input is not valid...";
}