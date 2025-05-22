// ============ Basic Types ============
// JS -> Weakly type | TS -> Strongly type

// syntax -> let variableName: type = value;
let pi: number = 3.14;
let message: string = "This is a secret message :D";
let isHappy: boolean = true;

let address1: `0x${number}` = "0x123123123123123123123";
let phone1: `${number}-${number}-${number}` = "123-555-123";
let email1: email = "ali.rajabinekoo@yahoo.com";

// very very bad idea
// let a: any = 1;
// a = "salam";
// a = true;

const numbers: Array<number> = [1, 2, 3, 4, 5, 6];
const names: string[] = ["Hamed", "Ali", "Ashkan", "Pooria", "Kaveh"];

// ============ Custom Types ============
type gmail = `${string}@gmail.com`; // Alias
type yahoo = `${string}@yahoo.com`;
type email = gmail | yahoo; // Union

function greeting(firstName: string, lastName?: string): string {
  return `Welcome ${firstName} ${lastName || ""}`;
}

type greeting2Type = (_: string) => string;
const greeting2: greeting2Type = (name) => `Welcome ${name}`;
const greeting3: greeting2Type = function (name) {
  return `Welcome ${name}`;
};

function timeout(t: number): Promise<number> {
  return new Promise((resolve, _) => {
    setTimeout(() => resolve(t), t);
  });
}

// ------ object types ------
const a: { b: number } = { b: 1 };

type student = { name: string; gpa: number; stuNum: number };
const student1: student = { gpa: 9, name: "Mojtaba", stuNum: 123456 };
const student2: student = { gpa: 9, name: "Zahra", stuNum: 654321 };
const student3: student = { gpa: 9, name: "Haniye", stuNum: 321321 };
