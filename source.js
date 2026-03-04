const calculatorDisplay = document.querySelector(".calculator-display");
const calculatorDigits = document.querySelector(".calculator-digits");
const calculatorOperators = document.querySelector(".calculator-operators");

for (const digit in calculatorDigits.childNodes) {
    //TODO: acabar a implementação do metodo
    digit.addEventListenner("click", writeDigit());
}


//funcao mais simples, simplesmente add nr
function writeDigit (elem) {
    const displayText = calculatorDisplay.textContent;
    let splitDisplayText = displayText.split(" ");
    if(validateDisplayText(splitDisplayText)) {    
        calculatorDisplay.textContent = calculatorDisplay.textContent + `${elem.value}`;
    }


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
            returnArr[0] = op;
            returnArr[1] = true;
        }
    }

    return false;
}


function validateDisplayText (splittedArrayText) {
    const firstText = splittedArrayText[0];
    
    if(firstText === "Welcome" || firstText === "Input") {
        calculatorDisplay.textContent = "";
        return true;
    } else if (isDigit(firstText)) {
        return true
    } else {
        return false
    }

    //Welcome... |num + op | num + num
    
}


function inputError () {
    calculatorDisplay.textContent = "";
    calculatorDisplay.textContent = "Input is not valid...";
}