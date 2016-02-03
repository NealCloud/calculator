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
    noDecimal: true,

    //reset the current equation variables
    allClear: function(){
        this.output = "";
        this.equation = [];
        this.curNum  = "";
        this.equaIndex = 0;
        //display output to the display
        this.display(this.equation.join(" "));
    },
    clear: function(){
        this.curNum = "";
        this.noDecimal = true;
        this.display(this.equation.join(" "));
    },

    addItem: function(val){
        //set display output to button pressed
        this.output += val;
        //check which button is pressed
        switch(val){
            //add last current number to equation and send to be processed
            //reset the equation array and set current number to the result
            //
            case "=":
                this.equation[this.equaIndex] = this.curNum;
                console.log(this.equation);
                this.curNum = process(this.equation);
                this.equation = [];
                this.output  = this.curNum;
                this.equaIndex = 0;
                break;
            case "-":
            case "+":
            case "/":
            case "x":
                this.noDecimal = true;
                this.equation[this.equaIndex] = this.curNum;
                this.curNum = "";
                this.equaIndex++;
                this.equation[this.equaIndex] = val;
                this.equaIndex++;
                break;
            case ".":
                if(this.noDecimal){
                    this.curNum += val;
                    this.noDecimal = false;
                }
                break;
            default:
                this.curNum += val;
                this.display(this.equation.join(" ") + this.curNum);
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
        console.log(i);
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


