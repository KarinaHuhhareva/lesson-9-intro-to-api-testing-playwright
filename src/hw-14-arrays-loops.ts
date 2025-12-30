// ARRAYS

// #1 Create an array of numbers and log the array and the length of the array
const arrayNumbers: number[] = [1, 2, 3, 4, 5];
console.log(`Array numbers: ${arrayNumbers}`);
console.log(`Array numbers length: ${arrayNumbers.length}`);

// #2 Create an array of strings and log the array and the length of the array
const arrayStrings: string[] = ['apple', 'banana'];
arrayStrings.push('cherry');
console.log(`Array strings: ${arrayStrings}`);
console.log(`Array strings length: ${arrayStrings.length}`);

// #3 Remove the last element of the array and log the array and the length of the array
const arrayStrings2: string[] = ['apple', 'banana', 'cherry'];
arrayStrings2.pop();
console.log(`Array strings2: ${arrayStrings2}`);
console.log(`Array strings2 length: ${arrayStrings2.length}`);

// #4 Add 2 numbers to the array and log the array and the length of the array
const arrayNumbers2: number[] = [];
arrayNumbers2.push(1);
console.log(`Array numbers2 length after push 1: ${arrayNumbers2.length}`);
arrayNumbers2.push(2);
console.log(`Array numbers2 length after push 2: ${arrayNumbers2.length}`);


// WHILE LOOPS

// #1 Create a while loop that logs the numbers 1 to 5
const arrayNumbersForLoop: number[] = [1, 2, 3, 4, 5];
for (const number of arrayNumbersForLoop) {
    console.log(`Number for loop arrayNumbersForLoop: ${number}`);
}

// #2 Create a while loop that logs the numbers 1 to 5 and sums the numbers
let sum = 0;
let arrayNumbersForLoopSum: number[] = [6, 7, 8, 9, 10];
for (const number of arrayNumbersForLoopSum) {
    sum += number;
}
console.log(`Sum of arrayNumbersForLoopSum: ${sum}`);

// #3 Create a while loop that logs the numbers 1 to 5
let newDoubledNumbers: number[] = [];
let arrayNumbersForLoopSumToDouble: number[] = [6, 7, 8, 9, 10];
for (const number of arrayNumbersForLoopSumToDouble) {
    newDoubledNumbers.push(number * 2);
}
console.log(`New doubled numbers: ${newDoubledNumbers}`);

// #4 Create a while loop that logs the numbers 1 to 3 and reverse order of the numbers
let arrayNumbersForLoopToReverse: number[] = [11, 12, 13];
for (let i = arrayNumbersForLoopToReverse.length - 1; i >= 0; i--) {
    console.log(`Number in reverse order: ${arrayNumbersForLoopToReverse[i]}`);
}


// TASKS

// #1 Maximum number in the array
let arrayNumbersForLoopToFindMax: number[] = [14, 15, 16, 10, 12];
let maxNumber = arrayNumbersForLoopToFindMax[0];
for (const number of arrayNumbersForLoopToFindMax) {
    if (number > maxNumber) {
        maxNumber = number;
    }
}
console.log(`Maximum number in the array: ${maxNumber}`);

// #2 Minimum number in the array
let arrayNumbersForLoopToFindMin: number[] = [17, 18, 19, 1, -7];
let minNumber = arrayNumbersForLoopToFindMin[0];
for (const number of arrayNumbersForLoopToFindMin) {
    if (number < minNumber) {
        minNumber = number;
    }
}
console.log(`Minimum number in the array: ${minNumber}`);

// #3 Count even numbers in the array
let arrayNumbersForLoopToCountEvenNumbers: number[] = [20, 21, 22];
let countEvenNumbers = 0;
for (const number of arrayNumbersForLoopToCountEvenNumbers) {
    if (number % 2 === 0) {
        countEvenNumbers++;
    }
}
console.log(`Count of even numbers in the array: ${countEvenNumbers}`);

// #4 Array of positive numbers from the array
let arrayNumbersForLoopToCountPositiveNumbers: number[] = [23, -24, 25, -14, 0];
let arrayOfPositiveNumbers: number[] = [];
for (const number of arrayNumbersForLoopToCountPositiveNumbers) {
    if (number > 0) {
        arrayOfPositiveNumbers.push(number);
    }
}
console.log(`Array of positive numbers: ${arrayOfPositiveNumbers}`);