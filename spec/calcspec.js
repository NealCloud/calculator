
function testLooper(arr){
        arr.forEach(function(elem){
            nCalc.addItem(elem);
        });    
    }

describe('Basic Operations Suite', function(){
    beforeEach(function(){
        nCalc.allClear();
    });
        
    it('Addition 1 + 2', () => {
        let calc = ['1','+','2', '='];
        testLooper(calc);       
        expect(nCalc.curNum).toBe('3');
    });
    
    it('Multiplication 1 * 2', () => {
        var calc = ['1','x','2', '='];
        testLooper(calc);
        expect(nCalc.curNum).toBe('2');
    });
    
    it('Division 1 / 2', () => {
       var calc = ['1','/','2', '='];
        testLooper(calc);
        expect(nCalc.curNum).toBe('0.5');
    });
    
     it('Subtraction 1 - 2', () =>{
        var calc = ['1','-','2', '='];
        testLooper(calc);
        expect(nCalc.curNum).toBe('-1');
    });
  
})

describe('Comprehensive Operations', function(){
     beforeEach(function(){
        nCalc.allClear();
    });
     
    it('Successive operations', function(){
        var calc = ['1','+','1','+','2', '='];
        testLooper(calc);        
        expect(nCalc.curNum).toBe('4');
    });
    
    it('Decimals', function(){
         var calc = ['1','.','1','+','1','.','1','='];
        testLooper(calc);        
        expect(nCalc.curNum).toBe('2.2');
    });
    
    it('multiple decimals', function(){
         var calc = ['1','.','.','.','1','+','1','.','.','.','1','='];
        testLooper(calc);        
        expect(nCalc.curNum).toBe('2.2');
    });
    
    it('multiple operation keys', function(){
        var calc = ['1','+','+','+','+','+','2','='];
        testLooper(calc);        
        expect(nCalc.curNum).toBe('3');
    });
    
    it('changing operation keys', function(){
         var calc = ['1','+','-','x','2','='];
        testLooper(calc);        
        expect(nCalc.curNum).toBe('2');
    });
    
    it('operation repeat', function(){
         var calc = ['1','+','1','=','=','='];
        testLooper(calc);        
        expect(nCalc.curNum).toBe('4');
    });
    
    it('operation rollover', function(){
         var calc = ['1','+','1','+','=','+','='];
        testLooper(calc);        
        expect(nCalc.curNum).toBe('8');
    });
    
    it('successive multi operation', function(){
         var calc = ['1','+','3','/','4','+','10','x','2','='];
        testLooper(calc);        
        expect(nCalc.curNum).toBe('22');
    });
    
    it('division by zero', function(){
         var calc = ['1','/','0','='];
        testLooper(calc);        
        expect(nCalc.curNum).toBe('Error');
    });
   
})

describe('Advanced Operations', function(){
    beforeEach(function(){
        nCalc.allClear();
    });
    
    it('premature operation', function(){
        var calc = ['+','+','+','+','1','x','3','='];
        testLooper(calc);
        expect(nCalc.curNum).toBe('3');
    });
    
    it('partial operand', function(){
        var calc = ['3','x','='];
        testLooper(calc);
        expect(nCalc.curNum).toBe('9');
    });
    it('missing operation', function(){
        var calc = ['3','='];
        testLooper(calc);
        expect(nCalc.curNum).toBe('3');
    });
    it('missing operands', function(){
        var calc = ['=','=','='];
        testLooper(calc);
        expect(nCalc.curNum).toBe('Ready');
    })
})