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
    // holds output display
    output: "",
    // holds longest equation array
    equation: [],
    // the current equation array index
    equaIndex: 0,
    // holds next number to be placed inside array
    curNum: "",
    //equation store
    lastCalc : null,
    //lastStore
    lastDisplay: 0,
    //decimal flag
    noDecimal: true,
    //multiple operands flag
    firstOp: false,
    //numbers allowed flag
    numbersOn: true,
    //Error Check
    error: false,
    //negative number check
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
        //display output to the display
        this.lastDisplay = this.display(this.equation.join(" "));
    },
    //reset only the current number
    clear: function(){
        this.curNum = "";
        this.firstOp = false;
        this.numbersOn = true;
        this.noDecimal = true;
        this.lastDisplay = this.display(this.equation.join(" "));
    },

    addItem: function(val){
        //check for errors
        if(this.curNum == "Error"){
            console.log("Error Reset");
            return
        }

        //check which button is pressed
        switch(val){
            //add the last current number to equation array and send  it to be processed
            //reset the equation array and set current number to the result
            //set flags numbers off and operands on
            case "=":
                if(this.equation.length > 1 && this.curNum) {
                    this.equation[this.equaIndex] = this.curNum;
                    console.log(this.equation);
                    this.curNum = process(this.equation);
                    this.lastCalc = [this.curNum, this.equation[this.equation.length - 2],this.equation[this.equation.length - 1]];
                    this.equation = [];


                    this.equaIndex = 0;
                    this.numbersOn = false;
                    this.firstOp = true;
                }
                else if(this.equation.length > 0) {

                    this.equation = [this.lastCalc[0], this.equation[1],this.lastCalc[0]] ;
                    console.log("operand only detected" , this.equation);
                    this.curNum = process(this.equation);
                    this.lastCalc = [this.curNum, this.equation[this.equation.length - 2],this.equation[this.equation.length - 1]];
                    this.equation = [];


                    this.equaIndex = 0;
                    this.numbersOn = false;
                    this.firstOp = true;
                }
                //check if last calculation is true;
                else if(this.lastCalc){
                    console.log("calcing using last calc: " , this.lastCalc);

                    this.curNum = process(this.lastCalc);
                    console.log(this.curNum);
                    this.lastCalc[0] = this.curNum;
                    this.equation = [];

                    this.equaIndex = 0;
                    this.numbersOn = false;
                    this.firstOp = true;
                    console.log("new last calc: " , this.lastCalc);
                    console.log("new equation " , this.equation);
                }

                break;
            case "-":
            case "+":
            case "/":
            case "x":
                if(this.firstOp) {
                    //lock Operands and unlock numbers and decimals
                    this.firstOp = false;
                    this.numbersOn = true;
                    this.noDecimal = true;
                    //push current number to the equation array and reset current number
                    this.equation[this.equaIndex] = this.curNum;
                    this.curNum = "";
                    //increase equation index and push operand to equation array and increase index again
                    this.equaIndex++;
                    this.equation[this.equaIndex] = val;
                    this.equaIndex++;
                }
                else{
                    //if operands locked update the last index in equation array to be the new operand selected and update display
                    this.equation[this.equaIndex - 1] = val;
                    this.lastDisplay = this.display(this.equation.join(" ") + this.curNum);
                }
                break;
            case "- / +":
                //toggle a plus or minus sign  to current Number
                //check if negative and numbers allowed then add a minus to current number
                if(this.numbersOn && !this.negative) {
                    this.curNum = "-" + this.curNum;
                    this.negative = true;
                }
                //other wise splice off minus sign
                else if(this.numbersOn && this.negative){
                    var newCur = this.curNum.slice(1);
                    this.negative = false;
                    this.curNum = newCur;
                }
                break;
            case ".":
                //check for decimal and number lock and concat to current number reset last Calc and disable decimals
                if(this.noDecimal && this.numbersOn){
                    this.curNum += val;
                    this.lastCalc = null;
                    this.noDecimal = false;
                }
                break;
            default:
                //check for number lock and reset lastCalc and concat number to current number and allow Operands
                if(this.numbersOn) {
                    this.lastCalc = null;
                    this.curNum += val;
                    this.firstOp = true;
                }
                break;
        }
       // update display to show current button pressed
       this.display(this.equation.join(" ") + " " + this.curNum);
    },
    //return input and update display
    display: function(show){
        $('#display').val(show);
        return show;
    }

}
//TODO: use an indexOf() instead of loop
//loop through equation and send to appropriate calculation
//only accepts equations with number operator number format ["2","+","1", "x", "5"]
function process(equation){
    var output, operand, a, b;
    //set a to starting number
    a = equation[0];
    //go through array using a double iteration;
    for(var i = 0; i < equation.length - 1; i+= 2){
        //the operand must come every other number
        operand = equation[i + 1];
        //set b to second number
        b = equation[i + 2];
        //set a to the value of calculation between a operand b
        a = checkOperand(operand, a, b);
    //    keep repeating using a to hold the calculations in the order or the array
    }
    // return result as a string;
    output = a.toString();
    return output;
}
function checkOperand(operand, a, b){
    switch (operand) {
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


