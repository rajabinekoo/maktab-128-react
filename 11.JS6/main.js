// primitive type
let a = 1;
let b = true;
let c = "salam";

// complex type
let array = [a, b, c];
let obj = {
  // property
  key: "value",
};

let person = {
  age: 30,
  name: "hassan",
  job: "developer",
  email: "hassan@gmail.com",
  // method
  greeting: function () {
    console.log(`salaaaammmmm ${this.name}`);
    console.log(this);
  },
  // arrow method (without this)
  //   greeting2: () => {
  //     console.log(this);
  //   },
  greeting3() {
    console.log(`salaaaammmmm ${this.name}`);
    console.log(this);
  },
};

// window.alert("chert");

let animal = {
  foot: 4,
  speed: 30,
  power: 20,
  name: "pirooz",
  echosystem: "mountain",
};

console.log(person);
person.name = "hossein";
console.log(person);

delete person.email;
person.eyeColor = "brown";
console.log(person);

console.log(animal.name);
console.log(animal["echosystem"]);

// method
person.greeting3();

console.log("a-b-c".split("-"));
console.log(Number(123.123123123).toFixed(1));

// let array2 = {
//   0: 5,
//   1: 10,
//   2: 15,
//   3: 20,
// };

// console.log(array2[0]);
// console.log(array2[1]);
