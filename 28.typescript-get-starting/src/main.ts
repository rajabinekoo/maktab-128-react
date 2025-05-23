// import { pi2 } from "./ourMath";
// console.log(pi2);

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
const a: { b: number; c?: string } = { b: 1 };

type student = {
  name: string;
  gpa: number;
  stuNum: number;
  sayHi: () => string;
};
const sayHi = () => "Hi";
const student1: student = { gpa: 9, name: "Mojtaba", stuNum: 123456, sayHi };
const student2: student = { gpa: 9, name: "Zahra", stuNum: 654321, sayHi };
const student3: student = { gpa: 9, name: "Haniye", stuNum: 321321, sayHi };

// ------ record ------

// schema
type identicalPerson = { id: number };
type person = identicalPerson & { readonly username: string; email: string };

// interface
interface IPerson {
  readonly id: number;
  email: string;
  username: string;
}

const persons1: IPerson[] = [
  { id: 1, email: "1@gmail.com", username: "user1" },
  { id: 2, email: "2@gmail.com", username: "user2" },
  { id: 3, email: "3@gmail.com", username: "user3" },
  { id: 4, email: "4@gmail.com", username: "user4" },
  { id: 5, email: "5@gmail.com", username: "user5" },
  { id: 6, email: "6@gmail.com", username: "user6" },
];
const persons2: IPerson[] = [
  { id: 7, email: "7@gmail.com", username: "user7" },
  { id: 2, email: "2@gmail.com", username: "user2" },
  { id: 3, email: "3@gmail.com", username: "user3" },
  { id: 8, email: "8@gmail.com", username: "user8" },
  { id: 9, email: "9@gmail.com", username: "user9" },
];

// solution 1
// const conjunctions: IPerson[] = [];
// for (const p1 of persons1) {
//   for (const p2 of persons2) {
//     if (p1.id === p2.id) conjunctions.push(p1);
//   }
// }
// console.log(conjunctions);

// solution 2
// const conjunctions2: IPerson[] = [];
// const countingDict: Record<number, IPerson> = {};
// const countingDict2: { [key: number]: IPerson } = {};
// for (const p of persons2) countingDict[p.id] = p;
// for (const p of persons1) if (countingDict[p.id]) conjunctions2.push(p);
// console.log(conjunctions2);

// ============ Utility Types ============

type optionalPerson = Partial<person>;
type requiredPerson = Required<optionalPerson>;
type idLessPerson1 = Pick<IPerson, "email" | "username">;
type idLessPerson2 = Omit<IPerson, "id">;
type combinedUtilityTypes = Readonly<Pick<IPerson, "id">> &
  Required<Pick<IPerson, "username">> &
  Partial<Omit<IPerson, "username" | "id">>;

const readonlyPerson: Readonly<IPerson> = {
  id: 1,
  username: "ali",
  email: "ali@gmail.com",
};
const a2: combinedUtilityTypes = {
  id: 1,
  username: "ali",
};

async function main() {
  const t: Awaited<Promise<number>> = await timeout(1000);
  const t2 = await timeout(1000);
  console.log(t, t2);
}

// ============ AS ============

type testJsonType = { firstName: string };
const testJson = '{"firstName":"hamed"}';

const parsedValue: testJsonType = JSON.parse(testJson);
const parsedValue2 = JSON.parse(testJson) as testJsonType;
const parsedValue3 = <testJsonType>JSON.parse(testJson);
// console.log(parsedValue3.firstName);

// ============ namespace ============

namespace OurMath {
  export const pi = 3.14;
  export const circleArea = (r: number) => 2 * pi * r;
  export const circleS = (r: number) => (circleArea(r) / 2) * r;
}
// console.log(OurMath.circleArea(3), OurMath.circleS(3));

// ============ enum ============

// zamani ke chand meghdar darid va in maghadir be ham marboot hastand
// ya ba ham ertebat darand, mitunid az "enum" estefade konid
// enum hamzaman ham be soorate objecti az maghadir ghabele estefade ast
// ham khodesh besoorate type ghabele estefadeh ast (maghadir dakhelesh)
enum Color {
  black = "#000000",
  white = "#ffffff",
}

enum Gender {
  male,
  female,
}

// type colorsType = {
//   black: "#000000";
//   white: "#ffffff";
// };
// const colors = {
//   black: "#000000",
//   white: "#ffffff",
// };

function applyColorOnBackground(bgColor: Color) {
  const body = document.getElementById("body");
  if (!!body) body.style.backgroundColor = bgColor;
}

function checkGender(g: Gender) {
  return g === 1 ? "female" : "male";
}
