const calculatorDisplay = document.querySelector(".calculator-display");
const calculatorDigits = document.querySelector(".calculator-digits");
const calculatorOperators = document.querySelector(".calculator-operators");

const validOperators = ["+", "*","-","/"];
const validDigits = ["1","2","3","4","5","6","7","8","9","0"];

for (const digit in calculatorDigits.childNodes) {
    digit.addEventListenner("click",)
}


function writeDigit () {
    const displayText = calculatorDisplay.textContent;
    let splitDisplayText = displayText.split(" ");
    if(validateDisplayText(splitDisplayText)) {

    }

}


function validateDisplayText (splittedArrayText) {
    const firstText = splittedArrayText[0];
    const foundNum = splittedArrayText.find((elem) => elem == firstText);
    
    if(firstText === "Welcome") {
        calculatorDisplay.textContent = "";
        return true;
    } else if (!(undefined === foundNum)) {
        return true
    } else {
        return false
    }

    //Welcome... |num + op | num + num
    
}