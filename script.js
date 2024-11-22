//elementos do DOM
const display = document.querySelector(".display");
const input = document.querySelector(".inputs");

//global variables
let gPreviousOperand = '';
let gCurrentOperand = '';
let gResult = '';
let gResultNumber = 0;
let gBuffer = '';

function refreshOperand(inputNumber){
    if ((gCurrentOperand).length === 9) return;
    // gCurrentOperand += inputNumber;
    if(gCurrentOperand === ''){
        gCurrentOperand = inputNumber;
        display.textContent = gCurrentOperand;

    } else {
        gCurrentOperand += inputNumber;
        display.textContent = gCurrentOperand;
    }
}

function displayResult(){
    display.textContent = gResult;
}

function clearDisplay() {
    display.textContent = '';
}

function updateResult(input) {
    gResultNumber = calculate(input);

}

function calculate(inputId) {
    switch(inputId){
        case "_+":
            return +gPreviousOperand + +gCurrentOperand;
        case "_/":
            return +gPreviousOperand / +gCurrentOperand;
        case "_*":
            return +gPreviousOperand * +gCurrentOperand;
        case "_-":
            return +gPreviousOperand - +gCurrentOperand;
        case "_=":
            return +gResultNumber;
}}

function userClick(event) {
    let clickedElement = event.target;
    if (clickedElement.classList[0] === "number") {
        refreshOperand(clickedElement.textContent);
    }
    if (clickedElement.classList[0] === "operator") {
        console.log(`operator was clicked ->previous:${gPreviousOperand}`)
        if (gPreviousOperand === ''){
            gPreviousOperand = gCurrentOperand;
            gCurrentOperand = ''
        }
        else {
            console.log("*")
            gResultNumber = calculate(clickedElement.id);
            display.textContent = String(gResultNumber);
            gPreviousOperand = String(gResultNumber);
            gCurrentOperand = '';
        }

        }
    }

    // switch(event.target.id) {
    //     case _0:
    //         // code
    //         break;
    //     case 1:
    //         // code
    //         break;
    //     case 1:
    //         // code
    //         break;      
  
input.addEventListener("click", userClick);