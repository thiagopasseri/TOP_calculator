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
    // serves to clear the display if the user is inputing a number after a
    // final result
    if(gLastOp =="_=") clear();
    if(gCurrentOperand === '0'){
        gCurrentOperand = inputNumber;
        display.textContent = gCurrentOperand;
        gResultNumber = calculate(gLastOp);
        

    } else {
        gCurrentOperand += inputNumber;
        display.textContent = gCurrentOperand;
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
    if (gCurrentOperand === '0') gCurrentOperand = display.textContent;
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
        case "":
            return 0;
        default:
            return 0;
}}

function userClick(event) {
    let clickedElement = event.target;
    switch (clickedElement.id) {
        case "clear": 
            clear();
            return;
        case  "_.":
            // serves to refresh the lastOp (_=) when . is pressed after a final result
            if(gLastOp =="_=") clear();
            if (gCurrentOperand.includes(".")) return;
            else {
                if(gCurrentOperand === "0") {
                    gCurrentOperand = "0.";
                    display.textContent = gCurrentOperand;
                    

                }
                else {
                    gCurrentOperand += ".";
                    console.log(gCurrentOperand);
                    display.textContent = gCurrentOperand;
                    
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
            
}}

input.addEventListener("click", userClick);