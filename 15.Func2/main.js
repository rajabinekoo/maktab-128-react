// ======= callback func =======
// calculator

// function sum(num1, num2) {
//   return num1 + num2;
// }

// function minus(num1, num2) {
//   return num1 - num2;
// }

// function product(num1, num2) {
//   let result = 0;
//   for (let i = 1; i <= num2; i++) {
//     result += num1;
//   }
//   return result;
// }

// function division(num1, num2) {
//   return num1 / num2;
// }

// function printResult(num1, op, num2, cb) {
//   if (!cb) return console.log("invalid operator");
//   const n1 = Number(num1);
//   const n2 = Number(num2);
//   if (!n1 || n1 <= 0) return console.log("invalid num1");
//   if (!n2 || n2 <= 0) return console.log("invalid num2");
//   console.log(`${num1} ${op} ${num2} = ${cb(n1, n2)}`);
// }

// const operations = {
//   "+": sum,
//   "-": minus,
//   "*": product,
//   "/": division,
// };

// const op = prompt("Enter operator");
// const num1 = prompt("Enter num1");
// const num2 = prompt("Enter num2");

// printResult(num1, op, num2, operations[op]);

// ======= self-invoking func =======

// assignment
// const a = () => {
//   console.log("a");
// };
// a();

// ((msg) => console.log(msg))("a");

// ======= func apply, call, binding =======

function greeting(firstName, lastName) {
  console.log(`Welcome ${firstName}${this.seperator || " "}${lastName}`);
  console.log(this);
}

// greeting.apply({}, ["Ali", "Rajabi"]);
// greeting.call({ seperator: "-" }, "Ali", "Rajabi");

const obj2 = {
  seperator: "=",
};

// obj1.greeting("Ali", "Rajabi");
// greeting.call(obj2, "Ali", "Rajabi");

// function a() {}
// function b() {}
// function c() {}

function aGenerator() {
  return { name1: "test1", name2: "test2", a() {}, b() {}, c() {} };
  // return { name1: "test1", name2: "test2", a, b, c };
}

const a1 = aGenerator();
// const a2 = aGenerator();
// const a3 = aGenerator();

// a.apply(a1, ...)
// b.apply(a3, ...)
// c.apply(a2, ...)

let f1 = greeting.bind({ seperator: "-" }, "Ali", "Rajabi");
let f2 = greeting.bind({ seperator: "-" }, "Mojtaba", "Ghorbanpour");
// f1();
// f2();

// ========= default parameters =========

function greeting2(firstName, lastName, seperator = " ") {
  console.log(`Welcome ${firstName}${seperator}${lastName}`);
}
// greeting2("Ali", "Rajabi");
// greeting2("Ali", "Rajabi", "-");

// ========= rest operator =========

// console.log(Math.max(1, 2, 3, 4, 5, 6, 10, 11));

// function sum(...numArray) {
//   let result = 0;
//   for (const num of numArray) {
//     result += num;
//   }
//   return result;
// }

// function sum2() {
//   let result = 0;
//   for (const num of arguments) {
//     result += num;
//   }
//   return result;
// }

// function sum3(message, initState = 0, ...nums) {
//   let result = initState;
//   for (const num of nums) {
//     result += num;
//   }
//   console.log(message, result);
// }

// console.log(sum2(4, 2, 3, 1));
// sum3("Reducing nums", 10, 1, 2, 3, 4);

// ========= closure func =========
// outerFunc
// innerFunc
// innerFunc enclosed by outerFunc
// Dynamic inner func by outer func parameters

// memoization
function operationGenerator(op = "sum") {
  return function operation(num1, num2) {
    switch (op) {
      case "sum":
        return num1 + num2;
      case "minus":
        return num1 - num2;
    }
  };
}

const sum = operationGenerator("sum");
// console.log(sum(1, 2));
const minus = operationGenerator("minus");
// console.log(minus(5, 1));

// function iterationGenerator(init = 0) {
//   return {
//     value: init,
//     increase() {
//       this.value++;
//     },
//     decrease() {
//       this.value--;
//     },
//   };
// }

function iterationGenerator(init = 0, step = 1) {
  return function iterator() {
    const tmp = init;
    init += step;
    return tmp;
  };
}

const a = [1, 2, 3, 4];

const counter = iterationGenerator(0, 2);
let i = counter();
while (i < a.length) {
  console.log(i, a[i]);
  i = counter();
}
