// // reusable
// // high cohesion
// function f(x) {
//   return Math.pow(x, 2) + 2 * x + 4;
// }

// function numberPropmt(msg) {
//   const value = Number(prompt(msg));
//   if (isNaN(value)) return -1;
//   if (!value) return -1;
//   return value;
// }

// // call, invoke
// console.log(numberPropmt("Enter something"));

// --------------- coffee machine ---------------

// 1. deposit (done)
// 2. buy (done)
// 3. in loop (done)
// 4. functional (done)

// constant -> immutable

// const coffeeList = "1.espresso 2$\n2.latte 4$\n3.cappuccino 6$";
// const commandMsg = "Enter your command (buy,deposit,exit)";

// let depositBalance = 0;

// function deposit() {
//   const price = Number(prompt("Price:") || 0);
//   if (isNaN(price)) return alert("Invalid price");
//   if (price <= 0) return alert("Invalid price");
//   depositBalance += price;
//   console.log("New balance is:", depositBalance);
// }

// function priceEstimation(itemNumber) {
//   if (itemNumber === 1) return 2;
//   if (itemNumber === 2) return 4;
//   if (itemNumber === 3) return 6;
//   return 0;
// }

// function buy() {
//   const price = priceEstimation(Number(prompt("Enter item number") || 0));
//   if (price === 0) return alert("Invalid item number");
//   if (price > depositBalance) return alert("Insufficient funds");
//   depositBalance -= price;
//   console.log("Enjoy it!");
//   console.log("New balance is:", depositBalance);
// }

// while (true) {
//   console.log(coffeeList);
//   console.log("Your balance is:", depositBalance);
//   const command = prompt(commandMsg);
//   if (command === "exit") break;
//   if (command === "deposit") deposit();
//   else if (command === "buy") buy();
// }

// --------------- function declaration, hoisting ---------------

// type 1
// hoisting
// function funcName(input) {
//     return output
// }

// type 2 (anonymous function)
// function (input) {
//   return output;
// }

// type 3 (arrow anonymous function)
// (input) => {
//   return output;
// }

// type 4
// let funcName2 = function (input) {
//   return output;
// };

// type 5
// let funcName3 = (input) => {
//   return output;
// };

// --- example:

// const greeting1 = (name) => {
//   console.log(`Hello ${name}`);
// };

// // hoisting
// greeting2("Ali");
// function greeting2(name) {
//   console.log(`Hello ${name}`);
// }

// ============= caser cipher =============

function encrypt(inputChar) {
  switch (inputChar.toLowerCase()) {
    case "a":
      return "c";
    case "b":
      return "f";
    case "c":
      return "a";
    case "d":
      return "e";
    case "e":
      return "b";
    case "f":
      return "d";
  }
}

function decrypt(inputChar) {
  switch (inputChar.toLowerCase()) {
    case "c":
      return "a";
    case "f":
      return "b";
    case "a":
      return "c";
    case "e":
      return "d";
    case "b":
      return "e";
    case "d":
      return "f";
  }
}

const inputArray = prompt("Enter your phrase").split("");
console.log(inputArray);

function characterExtraction(char) {
  if (char === "-") return "";
  if (char === "*") return " ";
  return encrypt(char);
}

// solution 1
// let cipher = "";
// for (const element of inputArray) {
//   cipher += characterExtraction(element);
// }
// console.log(cipher);

// solution 2
// let cipher = "";
// inputArray.forEach(function (value) {
//   cipher += characterExtraction(value);
// });
// console.log(cipher);

// solution 3
// method chaining
console.log(
  inputArray
    .map((char) => {
      if (char === "-") return "";
      if (char === "*") return " ";
      return encrypt(char);
    })
    .join("")
);
