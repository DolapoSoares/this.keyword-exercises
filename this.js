// PART 1
// 1. What is the value of the keyword this in the following example
var data = this;
//console.log(data);// it refers to the default binding to the window

//2. What does this function output? Why?
function logThis(){
    return this;
}

//console.log(logThis()); 
//the function outputs Window. It is not set to any value.

//3. What does this function output? Why?
var instructor = {
    firstName: 'Tim',
    sayHi: function(){
        console.log("Hello! " + this.firstName);
    }
}

//console.log(instructor.sayHi());// it outputs "Hello! Tim". It has been binded implicitely to the parent  value "instructor"

//4. What does this function output? Why?
 var instructor = {
    firstName: 'Tim',
    info: {
        catOwner: true,
        boatOwner: true
    },
    displayInfo: function(){
        console.log("Cat owner? " + this.catOwner);
    }
}

//console.log(instructor.displayInfo());
/*it outputs "Catowner? undefined". It returned undefined because the this refers to the parent 
"intructor" and not "info".*/

//5. What does this function output? Why?
var instructor = {
    firstName: 'Tim',
    info: {
        catOwner: true,
        boatOwner: true,
        displayLocation: function(){
            return this.data.location;
        },
        data: {
            location: "Oakland"
        }
    },
}

//console.log(instructor.info.displayLocation());
// It  outputs "Oakland". The this refers to the parent "info".

//6. What does this function output? Why?
var instructor = {
    firstName: 'Tim',
    info: {
        catOwner: true,
        boatOwner: true,
        displayLocation: function(){
            return this.location;
        },
        data: {
            location: "Oakland",
            logLocation: this.displayLocation
        }
    },
}
//console.log(instructor.info.data.logLocation());

//it outputs "error". logLocation is not a function.

//PART 2

//1 . Fix the following code:
var obj = {
    fullName: "Harry Potter",
    person: {
        sayHi: function(){
            return "This person's name is " + this.fullName;
        }
    }
}
//console.log(obj.person.sayHi.call(obj));

/*Examples of Array-like objects
i)  DOM method document.getElementsByClassName() 
ii) const myArrayLike = {
   length: 3,
   0: "first",
   1: "second",
   2: "last!"
}. Also an array like object.
 
const myArrayLike = {
   length: 3,
   0: "first",
   1: "second",
   2: "last!"
}
*/


// 2.Write a function called sumEvenArguments which takes all of the arguments passed to a function and returns the sum of the even ones.

function sumEvenArguments(){
    var total = [].slice.call(arguments);
    return total.reduce(function(accumulator, nextVal) {
        if(nextVal % 2 === 0) return accumulator + nextVal;
        return accumulator;
    }, 0);
}

console.log(sumEvenArguments(1,2,3,4));
console.log(sumEvenArguments(1,2,6));
console.log(sumEvenArguments(1,2));

//3 . Write a function called arrayFrom which converts an array-like-object into an array.

function arrayFrom(arrayLikeObject){
    return [].slice.call(arrayLikeObject);
}

//4 . Write a function called invokeMax which accepts a function and a maximum amount. invokeMax should return a function that when called increments a counter. If the counter is greater than the maximum amount, the inner function should return "Maxed Out!"
function add(a,b){
    return a+b
}

function invokeMax(fn, num){
    var max = 0;
    return function(){
        if(max >= num)
         return "Maxed Out!";
        max++;
        return fn.apply(this,arguments);
    }
}
let addOnlyThreeTimes = invokeMax(add,3);
console.log(addOnlyThreeTimes(1,2));
console.log(addOnlyThreeTimes(2,2)) 
console.log(addOnlyThreeTimes(1,2));
console.log(addOnlyThreeTimes(1,2));

/*5. Write a function called guessingGame which takes in one parameter amount. The function should return another function that takes in a parameter called guess. In the outer function, you should create a variable called answer which is the result of a random number between 0 and 10 as well as a variable called guesses which should be set to 0.

In the inner function, if the guess passed in is the same as the random number (defined in the outer function) - you should return the string "You got it!". If the guess is too high return "You're too high!" and if it is too low, return "You're too low!". You should stop the user from guessing if the amount of guesses they have made is greater than the initial amount passed to the outer function.*/

function guessingGame(amount){
	var guesses=0;
	var answer=Math.floor(Math.random()*11)+guesses;
	
	return function(guess) {
		
		
		var completed=false;
		if (!completed) {
			if (guess === answer) {
		  	completed=true;  
				return "You got it!";
			}
			else {
				guesses++;
				if (guesses > amount) {
						completed=true;
				}
				else if (guess > answer) 
					return "You're too high!";
				else if (guess < answer) 
					return "You're too low!";
			}
		} else {	
			return "All done playing";
		}	
	};
}
var game = guessingGame(5)
console.log(game(1));
console.log(game(8))
console.log(game(5))
console.log(game(7)) 
console.log(game(1))  

var game2 = guessingGame(3)
console.log(game2(5)); 
console.log(game2(3));
console.log(game2(1));
console.log(game2(1));