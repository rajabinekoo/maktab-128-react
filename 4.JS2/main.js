// ============================ functions =================================
// console.log("ok");

// let isHappy = false;

// let a = console.log(typeof isHappy);
// console.log(a, a === undefined);

// console.log(console.log(typeof isHappy));

// let sign = prompt("What's your sign?", "123");
// console.log(typeof sign);

// ============================ not and boolean tricks =================================

// empty string === false | non-empty string === true
// 0 number === false | another numbers === true
// null or undefined === false

// console.log(Boolean(""), Boolean(" "), Boolean("123123123"));
// console.log(Boolean(0), Boolean(-1), Boolean(200));

// console.log(!!"", !!" ", !!"123123123");
// console.log(!!Boolean(""), !!Boolean(" "), !!Boolean("123123123"));

// let age = prompt("Enter your age");
// console.log((!Number(age) || Number(age) < 0) && "Invalid age");
// && returns: string or number > boolean

// =============================================================
// conditional branch (if - else)

// hospital visit
// < 9 -> otaghe bazi
// >= 9 and < 16 -> yek saat boro dakhel
// >= 16 -> befarmaid

// let age = Number(prompt("Enter your age"));

// if (condition -> logical operators or comparison operators === boolean) { if scope }

// if (age < 9) {
//   console.log("Befarma otaghe bazi");
// } else {
//   console.log("Bezar check konam cart melli shoma ra ...");
//   if (age >= 9 && age <= 16) {
//     console.log("Shoma yek saat boro dakhel");
//   } else {
//     console.log("Khosh amadid");
//   }
// }

// if (isNaN(age)) {
//   console.log("Invalid age");
// } else if (age < 9) {
//   console.log("Befarma otaghe bazi");
// } else if (age >= 9 && age <= 16) {
//   console.log("Shoma yek saat boro dakhel");
// } else {
//   console.log("Khosh amadid");
// }

// if (!isNaN(age)) {
//   console.log("Kheyr maghdam");
// }

// =============================================================
// conditional branch (switch case)

// // calculator
// let num1 = Number(prompt("Enter first number"));
// let num2 = Number(prompt("Enter second number"));
// let operator = prompt("Enter operator");
// // "+" or "-" or "/" or "*"

// if (!num1 || isNaN(num1)) {
//   num1 = 1;
// }

// if (!num2 || isNaN(num2)) {
//   num2 = 1;
// }

// if (operator === "+") {
//   // template string
//   console.log(`${num1} + ${num2} = ${num1 + num2}`);
// } else if (operator === "-") {
//   console.log(`${num1} - ${num2} = ${num1 - num2}`);
// } else if (operator === "*") {
//   console.log(`${num1} * ${num2} = ${num1 * num2}`);
// } else if (operator === "/") {
//   console.log(`${num1} / ${num2} = ${num1 / num2}`);
// } else {
//   console.log("Invalid operator");
// }

// switch (operator) {
//   case "+": {
//     console.log(`${num1} + ${num2} = ${num1 + num2}`);
//     break;
//   }
//   case "-": {
//     console.log(`${num1} - ${num2} = ${num1 - num2}`);
//     break;
//   }
//   case "*": {
//     console.log(`${num1} * ${num2} = ${num1 * num2}`);
//     break;
//   }
//   case "/": {
//     console.log(`${num1} / ${num2} = ${num1 / num2}`);
//     break;
//   }
//   default: {
//     console.log("Invalid operator");
//   }
// }
