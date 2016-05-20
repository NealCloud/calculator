# Calculator

- [Live Demo](http://nealcloud.github.io/calculator/) 

### Features
  - add subtract division multiply
  - clear current inputs
  - clear all inputs
  - unit testing for various inputs
  
### Lessons Learned
 - being able to check and respond to different calculation inputs
 
##### start of script to check which button was pressed
##### parameters: val  input value when a button is pressed
##### an equals finalizes the the equation and sends it to be processed
```javascript
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
```
### Live View
![ScreenShot](https://nealcloud.github.io/assets/img/c5.png)

### Version
1.1

### Tech
* [jQuery 2.2]
* [Jasmine 2.4]

### Todos
 - [ ] add OOP

### Bugs
 - none found
 
License
----
MIT

