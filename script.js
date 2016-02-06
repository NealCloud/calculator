/**
 * Created by Mad Martigan on 2/2/2016.
 */

$(document).ready(function(){
    //buttons activate calculator methods
    $('button').on('click', function () {
        var val = $(this).text();
        //console.log(val);
        switch (val) {
            case 'C':
                nCalc.clear();
                break;
            case 'AC':
                nCalc.allClear();
                break;
            default:
                nCalc.addItem(val);
                break;
        }
    });
})

nCalc = {
    // holds longest equation array
    equation: [],
    // the current equation array index
    equaIndex: 0,
    // holds next number to be placed inside array
    curNum: "",
    //stores extra operator
    storOp: null,
    //stores last calculation
    lastCalc : null,
    //decimal flag
    noDecimal: true,
    //multiple operator flag
    firstOp: false,
    //numbers allowed flag
    numbersOn: true,
    //negative number flag
    negative: false,

    //reset the current equation variables
    allClear: function(){
        this.equation = [];
        this.curNum  = "";
        this.equaIndex = 0;
        this.lastCalc = null;
        this.firstOp = false;
        this.numbersOn = true;
        this.noDecimal = true;
        this.negative = false;
        //display output to the display
        this.display(this.equation.join(" "));
    },
    //reset only the current number
    clear: function(){
        this.curNum = "";
        this.negative = false;
        this.firstOp = false;
        this.numbersOn = true;
        this.noDecimal = true;
        this.lastDisplay = this.display(this.equation.join(" "));
    },

    addItem: function(val){
        //check for errors or ready state!
        if(this.curNum == "Error"){
            console.log("Error Reset");
            this.allClear();
            return;
        }
        else if(this.curNum == "Ready"){
            this.allClear();
        }

        //check which buttons are pressed and add them to equation array and send to process function when equals is hit
        switch(val){
            case "=":
                //get length of equation array
                var len = this.equation.length;
                //check if equation array uses an operator at the end  ex ["2", "+", "1", "+"]
                if(len > 1 && !this.curNum) {
                    //check if equation length is only 2 ex ["2", "+"]
                    //push the first equation number to the back ["2", "+", "2"] and process the equation
                    if(len == 2){
                        this.equation.push(this.equation[0]);
                        this.curNum = process(this.equation);
                        this.lastCalc = [this.curNum, this.equation[this.equation.length - 2],this.equation[this.equation.length - 1]];
                    }
                    //else equation must be similar to ["2", "+", "1", "+"]
                     else{
                        // process the equation without the last operator and store it ["2", "+", "1"]    pop ["+"]
                        this.storeOp = this.equation.pop();
                        this.curNum = process(this.equation);
                        // create a new equation with result of previous calculation  ["3" , "+", "3"]
                        this.equation[0] = this.curNum;
                        this.equation[2] = this.curNum;
                        this.curNum = process(this.equation);
                        // set lastCalc to ["6", "+" , "3"]
                        this.lastCalc = [this.curNum, this.storeOp, this.equation[this.equation.length - 1]];
                    }
                    this.resetEquation();
                }
                // if equation ends with a number ["4","+","6"]  (really its ["4","+"] and curNum = "6")
                else if(len > 1 && this.curNum) {
                    //push the curNum to equation array to complete it and send it to be processed
                    this.equation[this.equaIndex] = this.curNum;
                    this.curNum = process(this.equation);
                    //set the last Calc to ["10" , "+", "6"] so it continues to add 6 until changed
                    this.lastCalc = [this.curNum, this.equation[len - 1],this.equation[len]];
                    this.resetEquation();
                }

                //No equation found, but lastCalc exists so process the lastCalc instead  ["10", "+", "6"]
                else if(this.lastCalc){
                    this.curNum = process(this.lastCalc);
                    // set first index of last calc to total  ["16", "+", "6"]
                    this.lastCalc[0] = this.curNum;
                    this.resetEquation();
                }
                else if(this.curNum){}
                else {
                    this.curNum = "Ready";
                }

                break;
            case "-":
            case "+":
            case "/":
            case "x":
                //check if operators are allowed
                if(this.firstOp) {
                    //lock out operators and unlock numbers and decimals
                    this.firstOp = false;
                    this.numbersOn = true;
                    this.noDecimal = true;
                    //push curNum to the equation array using equaIndex and reset current number
                    this.equation[this.equaIndex] = this.curNum;
                    this.curNum = "";
                    //increase equaIndex and push the operator to the equation array and increase index again
                    this.equaIndex++;
                    this.equation[this.equaIndex] = val;
                    this.equaIndex++;
                }
                else{
                    //if operators are locked out change the last operator in the equation array with new one
                    this.equation[this.equaIndex - 1] = val;
                    //update selection
                    this.display(this.equation.join(" ") + this.curNum);
                }
                break;
            case "- / +":
                //toggle a plus or minus sign to current Number
                //check if its negative and numbers unlocked then add a minus to current number
                if(this.numbersOn && !this.negative) {
                    this.curNum = "-" + this.curNum;
                    this.negative = true;
                }
                //other wise slice off minus sign from current number
                else if(this.numbersOn && this.negative){
                    var newCur = this.curNum.slice(1);
                    this.negative = false;
                    this.curNum = newCur;
                }
                break;
            case ".":
                //check for decimals and number lock and concat to current number
                if(this.noDecimal && this.numbersOn){
                    this.curNum += val;
                    //reset lastCalc and disable decimals
                    this.lastCalc = null;
                    this.noDecimal = false;
                }
                break;
            default:
                //checks for number lock
                if(this.numbersOn) {
                    //concat number to current number
                    this.curNum += val;
                    //reset lastCalc and allow operators
                    this.lastCalc = null;
                    this.firstOp = true;
                }
                break;
        }
       // update display to show current button pressed
       this.display(this.equation.join(" ") + " " + this.curNum);
    },
    //returns input and updates display
    display: function(show){
        $('#display').val(show);
        return show;
    },
    //resets equation/index and locks numbers and allows operators
    resetEquation: function(){
        this.equation = [];
        this.equaIndex = 0;
        this.numbersOn = false;
        this.firstOp = true;
    }
}

//loop through the equation array and send to the appropriate calculation
//only accepts equations with number operator number format
//["2",  "+",  "1",  "x",    "5"]
//["a", "op", "b-a", "op", "b-a"]
//function process(equation){
//    var output, operator, a, b;
//    //set a to starting number
//    a = equation[0];
//    //go through array using a double iteration to skip over operators ;
//    for(var i = 0; i < equation.length - 1; i+= 2){
//        //the operator must come after the first number
//        operator = equation[i + 1];
//        //set b to 3rd array index (should be a number)
//        b = equation[i + 2];
//        //set a to the value of the calculation between (a operator b)
//        a = checkOperator(operator, a, b);
//    //    keep repeating using a to hold the total calculations in the order or the array
//    }
//    // return result as a string;
//    output = a.toString();
//    return output;
//}
//replaced
// process equation with index of
function process(equation){
    var a = equation[0];
    var b, operator;
    //search through equation array and match with indexOf
    for(var i = 0; i < equation.length; i ++){
        var index = "x+/-".indexOf(equation[i]);
        //match found send the operator with before/after items to be calculated
        if(index >= 0){
            b = equation[i + 1];
            operator  = equation[i];
            a = checkOperator(operator, a, b);
        }
    }
    return a.toString();
}
//checks Operator and applies  and returns correct operation
function checkOperator(operator, a, b){
    switch (operator) {
        case '+':
            return addIt(a,b);
            break;
        case '-':
            return subtractIt(a,b);
            break;
        case 'x':
            return multiplyIt(a,b);
            break;
        case '/':
            return divideIt(a,b);
            break;
        default:
            return "Error";
            break;
    }
}

function addIt(a,b){
    return parseFloat(a) + parseFloat(b);
}
function subtractIt(a,b){
    return parseFloat(a) - parseFloat(b);
}
function multiplyIt(a,b){
    return parseFloat(a) * parseFloat(b);
}
function divideIt(a,b){
    if(b == 0) return "Error";
    return parseFloat(a) / parseFloat(b);
}

//var my_calculator = new calculator(calc);
//
//function calc(type, value, item){
//    console.log("calling calc: " + value);
//    switch (value) {
//        case undefined:
//            $('#display').val("");
//            break;
//        default:
//            $('#display').val(value);
//            break;
//    }
//}


