//elementos do DOM
const display = document.querySelector(".display");
const input = document.querySelector(".inputs");
const log = document.querySelector(".log");

//global variables
let gPreviousOperand = '0';
let gCurrentOperand = '0';
let gResultNumber = 0;
let gLastOp = '';

function displayLog(){
    log.textContent =`result=${gResultNumber}     ` ;
    log.textContent +=`lastOp=${gLastOp}`;

}

function refreshOperand(inputNumber){
    if ((gCurrentOperand).length === 9) return;
    // gCurrentOperand += inputNumber;
    if(gLastOp =="_=") clear();
    if(gCurrentOperand === '0'){
        gCurrentOperand = inputNumber;
        display.textContent = gCurrentOperand;
        gResultNumber = calculate(gLastOp);
        console.log(gResultNumber);


    } else {
        gCurrentOperand += inputNumber;
        display.textContent = gCurrentOperand;
        console.log(gLastOp);

        gResultNumber = calculate(gLastOp);

    }
}

function clear() {
    gLastOp='';
    gPreviousOperand = '0';
    gResultNumber = '';
    gCurrentOperand = '0';
    display.textContent = gPreviousOperand;
}

function calculate(inputId) {
    // if that checks if a operator is being pressed after the other, in this case
    // the display value becames the currentOperand
    if (gCurrentOperand === '') gCurrentOperand = display.textContent;
    switch(inputId){
        case "_+":
            return +gPreviousOperand + +gCurrentOperand;
        case "_/":
            return +gPreviousOperand / +gCurrentOperand;
        case "_*":
            console.log("entrou produto")
            return +gPreviousOperand * +gCurrentOperand;
        case "_-":
            return +gPreviousOperand - +gCurrentOperand;
        case "_=":
            console.log("entrou =")
            return +gResultNumber;  
        case "":
            console.log("entrou vazio")
            return 0;
        default:
            console.log("entrou default")
            return 0;
}}

function userClick(event) {
    let clickedElement = event.target;
    if(clickedElement.id === "clear") clear();
    if (clickedElement.classList[0] === "number") {
        refreshOperand(clickedElement.textContent);
    }
    if (clickedElement.classList[0] === "operator") {
        if (gPreviousOperand === '0'){
            gPreviousOperand = gCurrentOperand;
            gCurrentOperand = '';
            gLastOp = clickedElement.id;

        }
        else {
            gResultNumber = +String(calculate(gLastOp)).slice(0,9);
            display.textContent = String(gResultNumber);
            gPreviousOperand = String(gResultNumber);
            gLastOp = clickedElement.id;
            gCurrentOperand = '';
        }
        displayLog();

        }
    }

input.addEventListener("click", userClick);