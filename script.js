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
        this.output = "";
        this.equation = [];
        this.curNum  = "";
        this.equaIndex = 0;
        this.lastCalc = null;
        this.firstOp = false;
        this.numbersOn = true;
        this.noDecimal = true;
        //display output to the display
        this.display(this.equation.join(" "));
    },
    //reset only the current number
    clear: function(){
        this.curNum = "";
        this.firstOp = false;
        this.numbersOn = true;
        this.noDecimal = true;
        this.display(this.equation.join(" "));
    },

    addItem: function(val){
        if(this.curNum == "Error"){
            console.log("Error Reset");
        }
        //set display output to button pressed
        this.output += val;
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
                    this.output = this.curNum;

                    this.equaIndex = 0;
                    this.numbersOn = false;
                    this.firstOp = true;
                }
                else if(this.lastCalc){
                    console.log(this.lastCalc);

                    this.curNum = process(this.lastCalc);
                    console.log(this.curNum);
                    this.lastCalc[0] = this.curNum;
                    this.equation = [];
                    this.output = this.curNum;

                    this.equaIndex = 0;
                    this.numbersOn = false;
                    this.firstOp = true;
                    console.log(this.lastCalc);
                }
                break;
            case "-":
            case "+":
            case "/":
            case "x":
                if(this.firstOp) {
                    this.noDecimal = true;
                    this.equation[this.equaIndex] = this.curNum;
                    this.curNum = "";
                    this.equaIndex++;
                    this.equation[this.equaIndex] = val;
                    this.equaIndex++;
                    this.firstOp = false;
                    this.numbersOn = true;
                }
                else{
                    this.equation[this.equaIndex - 1] = val;
                    this.display(this.equation.join(" ") + this.curNum);
                }
                break;
            case "- / +":
                if(this.numbersOn && !this.negative) {
                    this.curNum = "-" + this.curNum;
                    this.negative = true;
                }
                else if(this.numbersOn && this.negative){
                    var newCur = "";
                    this.negative = false;
                    for(var i = 1; i < this.curNum.length; i++){
                        newCur += this.curNum[i]
                    }
                    this.curNum = newCur;
                }
                break;
            case ".":
                if(this.noDecimal && this.numbersOn){
                    this.curNum += val;
                    this.lastCalc = null;
                    this.noDecimal = false;
                }
                break;
            default:
                if(this.numbersOn) {
                    this.lastCalc = null;
                    this.curNum += val;
                    this.firstOp = true;
                }
                break;
        }

       this.display(this.equation.join(" ") + this.curNum);
    },

    display: function(show){
        $('#display').val(show);
    }

}

function process(equation){
    var output, operand, a, b;
    a = equation[0];
    for(var i = 0; i < equation.length - 1; i++){
        operand = equation[i + 1];
        b = equation[i + 2];
        a = checkOperand(operand, a, b);
        i += 1;
    }
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


