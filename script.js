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
    problem: [],
    probIndex: 0,
    curNum: "",

    allClear: function(){
        this.output = "";
        this.problem = [];
        this.curNum  = "";
        this.probIndex = 0;
    },

    

    addItem: function(val){
        this.output += val;
        if(val == "="){
            this.problem[this.probIndex] = this.curNum;
            this.curNum = "";
            var a = null;
            var b = null;
            var curValue;
            for(var i = 0; i < this.problem.length; i++){
                  switch(this.problem[i]){
                      case undefined:
                          break;
                      case "+":
                          b = this.problem[i + 1];
                          curValue = addIt(a,b);
                          break;
                      default :
                          a = this.problem[i];
                  }



            }
            var stringValue = curValue.toString();
            this.problem = [];
            this.problem[0] = stringValue;
            this.output = curValue;
        }
        else if(val == "+"){
            this.problem[this.probIndex] = this.curNum;
            this.curNum = "";
            this.probIndex++;
            this.problem[this.probIndex] = "+";
            this.output = "";
            this.probIndex++;
        }
        else{
            this.curNum += val;
        }
       this.display(this.output);
    },

    display: function(){
        $('#display').val(this.output);
        console.log(this.problem);
    }

}


function addIt(a,b){
    return parseInt(a) + parseInt(b);
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


