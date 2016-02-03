/**
 * Created by Mad Martigan on 2/2/2016.
 */

$(document).ready(function(){

    $('button').on('click', function () {
        var val = $(this).text();
        console.log(val);
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
    output: "",
    equation: [],
    equaIndex: 0,
    curNum: "",

    allClear: function(){
        this.output = "";
        this.equation = [];
        this.curNum  = "";
        this.equaIndex = 0;
        this.display(this.output);
    },

    addItem: function(val){

        this.output += val;

        switch(val){
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
                this.equation[this.equaIndex] = this.curNum;
                this.curNum = "";
                this.equaIndex++;
                this.equation[this.equaIndex] = val;
                this.equaIndex++;
                break;

            default:
                this.curNum += val;
                break;
        }


       this.display(this.output);
    },

    display: function(show){
        $('#display').val(show);

    }

}

function process(equation){
    var output, operand, a, b;
    a = equation[0];
    for(var i = 0; i < equation.length; i++){
        operand = equation[i + 1];
        b = equation[i + 2];
        switch (operand) {
            case '+':
                a = addIt(a,b);
                break;
            case '-':
                a = subtractIt(a,b);
                break;
            default:
               break;
        }
        i += 2;
    }
    output = a.toString();
    return output;
}

function addIt(a,b){
    return parseInt(a) + parseInt(b);
}
function subtractIt(a,b){
    return parseInt(a) - parseInt(b);
}
function subtractIt(a,b){
    return parseInt(a) - parseInt(b);
}
function subtractIt(a,b){
    return parseInt(a) - parseInt(b);
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


