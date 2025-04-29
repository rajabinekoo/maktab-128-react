// =========== Array ===========

// let fruits = ["orange", "cherry", "melon", "persian apple"];
// console.log("length:", fruits.length);
// fruits[4] = "apple";
// console.log(fruits);
// console.log(fruits[4]);
// fruits[4] = "pineapple";
// console.log(fruits);
// console.log(fruits[4]);
// console.log("length:", fruits.length);

// =========== example 1 ===========
// Karbar be barname mige ke chandta addad mikhad bede
// Addad haro mide va sepas ma bayad SUM begirim

// let n = Number(prompt("Enter n"));
// let numbers = [];

// // for (let i = 0; i < n; i++) {
// //   numbers[i] = Number(prompt(`Enter number ${i + 1}`));
// // }
// for (let i = 1; i <= n; i++) {
//   numbers.push(Number(prompt(`Enter number ${i}`)));
// }

// let sum = 0;
// for (let i = 0; i < n; i++) {
//   sum += numbers[i];
// }

// console.log(numbers.join(" + "), "=", sum);
// console.log("maktab-128".split("-"));

// =========== example 2 (search) ===========
// let numbers = [8, 2, 3, 4, 1, 5, 6, 7];
// let searchNum = Number(prompt("Enter your search number"));
// let index = -1;

// for (let i = 0; i < numbers.length; i++) {
//   if (numbers[i] === searchNum) {
//     index = i;
//     break;
//   }
// }

// =========== example 3 (trace) ===========
// let numbers = [8, 2, 3, 5, 4, 1, 6, 7];
// let evens = [];

// for (let i = 0; i < numbers.length; i++) {
//   if (numbers[i] % 2 === 0) {
//     evens.push(numbers[i]);
//   }
// }

// console.log(evens);

// =========== example 4 (reverse array) ===========
// let n = Number(prompt("Enter n"));
// let numbers = [];

// for (let i = 1; i <= n; i++) {
//   numbers.unshift(Number(prompt(`Enter number ${i}`)));
// }
// console.log(numbers);

// =========== array loops ===========
let numbers = [8, 2, 3, 5, 4, 1, 6, 7];
let evens = [];

for (let element of numbers) {
  if (element % 2 === 0) {
    evens.push(element);
  }
}
numbers.forEach(function (el) {
  console.log("forEach", el);
});
numbers.map(function (el) {
  console.log("map", el);
});

console.log(evens);
