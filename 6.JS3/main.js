// =================== scopes in use (even or odd) ===================
// global scope vs local scope
// 1. Az scope haye bala dast be paiyn dast, variable share mishavad
// 2. Az scope paiyn dast be scope baladast, variable share nemishavad
// 3. Har variable dakhele scope faghat dakhel hamun scope
// (va scope haye paiyn dastesh) dar dastres ast
// 4. Dar payane ejraye har scope, variable haye oon scope, pooch mishavand

// let inp = prompt("Enter your number") || 1;
// let num = Number(inp) || 1;
// let isEven;

// let msg = "goodbye";
// if (num % 2 === 0) {
//   isEven = true;
//   // console.log(msg); // error
//   let msg = "hi";
//   if (true) {
//     let msg = "salam";
//   }
//   console.log(msg); // hi
//   // var a = 1;
// } else {
//   let msg = "ok";
//   isEven = false;
//   console.log(msg); // correct
// }

// // ternary (?:) -> condition ? truness value : falseness value
// console.log(isEven ? "Even" : "Odd");
// // console.log(msg); // wrong
// // console.log("a", a);

// =================== for in use (sum of numbers) ===================
// iteration

// input: 5
// generate: 1, 2, 3, 4, 5

// input: 10
// generate: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10

// for(start;stop;step) {code}

// let n = Number(prompt("Enter n"));

// for (let i = 1; i <= 10; i += 1) {
//   console.log("ok tom to jerry ro aziyat kardi!", i);
// }
// console.log("oh tom to jahanami shodi ke pesar :')");

// let sum = 0;
// for (let i = 1; i <= n; i += 1) {
//   sum += i;
// }
// console.log(sum);

// bad idea
// let sum2 = 0;
// let i2 = 1;
// for (; i2 <= n; ) {
//   sum2 += i2;
//   i2 += 1;
// }
// console.log(sum2);

// let sum3 = 0;
// let i3 = 1;
// while (i3 <= n) {
//   sum3 += i3;
//   i3 += 1;
// }
// console.log(sum3);

// example 2 of for loop

// let n = Math.abs(Number(prompt("Chanta adad mikhay jam bezani?")));
// let sum = 0;

// for (let i = 0; i < n; i++) {
//   let num = Number(prompt("Adad bede"));
//   sum += num;
// }

// console.log(sum);

// =================== while in use (sum of numbers) ===================
// dynamic break condition

// // farz mikonim ke faghat "q" ya adad mide
// let input = prompt("Adad bede");
// let sum = Number(input || 0);

// while (input !== "q") {
//   input = prompt("Adad bede");
//   if (input !== "q") {
//     sum += Number(input || 0);
//   }
// }

// console.log(sum);

// ------- refactor -------

// farz mikonim ke faghat "q" ya adad mide
let input = prompt("Adad bede");
let sum = 0;

while (input !== "q") {
  sum += Number(input || 0);
  input = prompt("Adad bede");
}

console.log(sum);

// ------- refactor -------

// let sum = 0;

// while (true) {
//   let input = prompt("Adad bede");
//   if (input === "q") {
//     break;
//   }
//   sum += Number(input);
// }

// console.log(sum);
