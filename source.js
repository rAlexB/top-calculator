const calculatorDisplay = document.querySelector(".calculator-display");
const calculatorDigits = document.querySelector(".calculator-digits");
const calculatorOperators = document.querySelector(".calculator-operators");

for (const digit of calculatorDigits.children) {
    //TODO: acabar a implementação do metodo
    console.log(digit);
    
    digit.addEventListener("click", writeDigit);
}


function writeOperator (elem) {
    const displayText = calculatorDisplay.textContent;
    let splitDisplayText = displayText.split(" ");
    if(validateDisplayText(splitDisplayText)) {
        calculatorDisplay.textContent = calculatorDisplay.textContent + ` ${elem.target.value} `;
        return;
    }
    inputError();
}

//funcao mais simples, simplesmente add nr
function writeDigit (elem) {
    const displayText = calculatorDisplay.textContent;
    let splitDisplayText = displayText.split(" ");
    if(validateDisplayText(splitDisplayText)) {
        //TODO: Atualizar elem.value pra versao completa
        calculatorDisplay.textContent = calculatorDisplay.textContent + `${elem.target.value}`;
        return;
    }
    inputError();
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
        let count = 0;

        for (const text of splittedArrayText) {
            if(isOperator(text)) count++;
        }
        if(count > 0) return false
        return false
    }

    return false
}


function inputError () {
    calculatorDisplay.textContent = "";
    calculatorDisplay.textContent = "Input is not valid...";
}