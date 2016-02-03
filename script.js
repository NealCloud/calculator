/**
 * Created by Mad Martigan on 2/2/2016.
 */

$(document).ready(function(){

    $('button').on('click', function () {
        var val = $(this).text();
        console.log(val);
        switch (val) {
            case 'C':
                my_calculator.clear();
                break;
            case 'AC':
                my_calculator.allClear();
                break;
            default:
                my_calculator.addItem(val);
                break;
        }
    });
})




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


