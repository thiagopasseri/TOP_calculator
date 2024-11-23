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
    log.textContent +=`current=${gCurrentOperand}   ` ;
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
        displayLog();

    } else {
        gCurrentOperand += inputNumber;
        display.textContent = gCurrentOperand;
        gResultNumber = calculate(gLastOp);
        displayLog();

    }
}

function clear() {
    gLastOp='';
    gPreviousOperand = '0';
    gResultNumber = '';
    gCurrentOperand = '0';
    display.textContent = gPreviousOperand;
    displayLog();

}

function calculate(inputId) {
    // if that checks if a operator is being pressed after the other, in this case
    // the display value becames the currentOperand
    if (gCurrentOperand === '0') gCurrentOperand = display.textContent;
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
    switch (clickedElement.id) {
        case "clear": 
            clear();
            return;
        case  "_.":
            if(gLastOp =="_=") clear();
            if (gCurrentOperand.includes(".")) return;
            else {
                if(gCurrentOperand === "0") {
                    gCurrentOperand = "0.";
                    display.textContent = gCurrentOperand;
                    displayLog();

                }
                else {
                    gCurrentOperand += ".";
                    console.log(gCurrentOperand);
                    display.textContent = gCurrentOperand;
                    displayLog();
                }
            }
            return;
    }
    switch (clickedElement.classList[0]) {
        case "number":
            refreshOperand(clickedElement.textContent);
            break;
        case "operator":
            if (gPreviousOperand === '0'){
                gPreviousOperand = gCurrentOperand;
                gCurrentOperand = '0';
                gLastOp = clickedElement.id;
    
            }
            else {
                gResultNumber = +String(calculate(gLastOp)).slice(0,9);
                display.textContent = String(gResultNumber);
                gPreviousOperand = String(gResultNumber);
                gLastOp = clickedElement.id;
                gCurrentOperand = '0';
            }
            displayLog();
}}

input.addEventListener("click", userClick);