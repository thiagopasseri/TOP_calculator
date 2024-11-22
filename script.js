//elementos do DOM
const display = document.querySelector(".display");
const input = document.querySelector(".inputs");
const log = document.querySelector(".log");
//global variables
let gPreviousOperand = '';
let gCurrentOperand = '';
let gResultNumber = 0;
let gLastOp = '';

function displayLog(){
    log.textContent=`previous = ${gPreviousOperand}      `;
    log.textContent +=`result = ${gResultNumber}`;
}

function refreshOperand(inputNumber){
    if ((gCurrentOperand).length === 9) return;
    // gCurrentOperand += inputNumber;
    if(gCurrentOperand === ''){
        gCurrentOperand = inputNumber;
        display.textContent = gCurrentOperand;
        gResultNumber = calculate(gLastOp);
        console.log(gResultNumber);


    } else {
        gCurrentOperand += inputNumber;
        display.textContent = gCurrentOperand;
        gResultNumber = calculate();

    }
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
        if (gPreviousOperand === ''){
            gPreviousOperand = gCurrentOperand;
            gCurrentOperand = '';
            lastOp = clickedElement.id;

        }
        else {
            gResultNumber = calculate(lastOp);
            display.textContent = String(gResultNumber);
            gPreviousOperand = String(gResultNumber);
            lastOp = clickedElement.id;
            gCurrentOperand = '';
        }
        displayLog();

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