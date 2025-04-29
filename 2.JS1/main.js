console.log("salammmmmm golaye too khune");
// procedural running
// ============= variable declaring and datatypes =============
// variable schema: let varName = value; (= -> assignment operator)
// left hand side (variable) = right hand side (value)
// keywords: let (recommended), var
// premitive type
let age = 30; // datatype: number
let firstName = "Bob"; // datatype: string -> sequence of characters (' or " or `)
let isLoggedIn = true; // datatype: boolean
let postalCode = 123456n; // datatype: bigint
let salary; // datatype: undefined
// declaration and initialization
let emptyVar = null; // datatype: null
console.log(age, firstName);
console.log(salary);
// value definition
salary = 1000 * 2 ** 2;
// ============= arithmatic operators =============
console.log(salary);
salary = salary + 1000;
console.log(salary);
salary = salary - 1000;
console.log(salary);
// shorthand + =
salary += 1000;
console.log(salary);
// salary = salary / 2.3;
salary /= 2.3;
console.log(salary);
let salary2 = salary;
console.log(salary2);
// ============= comparison operators =============
let a = 1;
let b = "1";
let c = a === b;
console.log(c !== false);
console.log("ali" === "ali");
let d = 2;
let e = 2;
console.log(d > a);
console.log(d >= e);
console.log(d <= e);
console.log(d < a);
// ============= logical operators =============
// and => &&
// or => ||
// not => !
console.log(!(firstName === "Bob" && age === 30));
console.log(!(firstName === "Ali" || age !== 30));
