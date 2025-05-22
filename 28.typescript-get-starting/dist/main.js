"use strict";
// ============ Basic Types ============
// JS -> Weakly type | TS -> Strongly type
// syntax -> let variableName: type = value;
let pi = 3.14;
let message = "This is a secret message :D";
let isHappy = true;
let address1 = "0x123123123123123123123";
let phone1 = "123-555-123";
let email1 = "ali.rajabinekoo@yahoo.com";
// very very bad idea
// let a: any = 1;
// a = "salam";
// a = true;
const numbers = [1, 2, 3, 4, 5, 6];
const names = ["Hamed", "Ali", "Ashkan", "Pooria", "Kaveh"];
function greeting(firstName, lastName) {
    return `Welcome ${firstName} ${lastName || ""}`;
}
const greeting2 = (name) => `Welcome ${name}`;
const greeting3 = function (name) {
    return `Welcome ${name}`;
};
function timeout(t) {
    return new Promise((resolve, _) => {
        setTimeout(() => resolve(t), t);
    });
}
// ------ object types ------
const a = { b: 1 };
const student1 = { gpa: 9, name: "Mojtaba", stuNum: 123456 };
const student2 = { gpa: 9, name: "Zahra", stuNum: 654321 };
const student3 = { gpa: 9, name: "Haniye", stuNum: 321321 };
