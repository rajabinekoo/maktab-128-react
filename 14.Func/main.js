// constructor and factory function
// 1. Schema definition
// 2. Type checking
// 3. One time methods definition

// --- factory function
function CarFactory(color, rpm, engine_size, mileage, price) {
  return {
    rpm,
    price,
    color,
    mileage,
    engineSize: engine_size,
    startEngine() {
      console.log(`I'm gonna start the engine with size ${this.engineSize}`);
    },
  };
}

// --- constructor function
function CarFactory2(color, rpm, engine_size, mileage, price) {
  this.color = color;
  this.rpm = rpm;
  this.engineSize = engine_size;
  this.mileage = mileage;
  this.price = price;
  this.startEngine = function () {
    console.log(`I'm gonna start the engine with size ${this.engineSize}`);
  };
}

const car1 = CarFactory("Black", 4.3, 1200, 3000, 24000);
car1.startEngine();
const car2 = new CarFactory2("Red", 5.1, 1300, 5000, 30000);

// --- Example - Auction

// function Bid(bidder, price) {
//   this.price = Number(price);
//   this.bidder = bidder;
// }

// const n = Number(prompt("Num of people"));

// let bids = [];

// for (let i = 0; i < n; i++) {
//   const bidder = prompt("Bidder name");
//   const price = prompt("Bid price");
//   bids.push(new Bid(bidder, price));
// }

// bids.sort(function (a, b) {
//   return a.price - b.price;
// });

// // deconstruction
// const { bidder } = bids.pop();
// const { price } = bids.pop();
// console.log(`Winner: ${bidder}, Price: ${price}`);

// ========================= callback =============================
// map

function map(array, callbackFunc) {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    newArray[i] = callbackFunc(element, i);
  }
  return newArray;
}

// const array1 = [1, 2, 3, 4, 5, 6];

// const array2 = map(array1, function (element, index) {
//   if (index >= 2 && index < 4) {
//     return element * 10;
//   }
//   return element * 2;
// });

// --- example2

let idCounter = 1;
function Person(username, email) {
  this.id = idCounter;
  this.email = email;
  this.username = username;
  idCounter++;
}

let users = [];

function addPerson(username, email) {
  users.push(new Person(username, email));
}

function updatePersonById(id, username, email) {
  //   users = map(users, (user) => {
  //     if (user.id === id) {
  //       return { id: user.id, email, username };
  //     }
  //     return user;
  //   });
  users = users.map((user) => {
    if (user.id === id) {
      return { id: user.id, email, username };
    }
    return user;
  });
}

// --- example3

function bblSort(arr, compareCallback) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i; j++) {
      const compare = compareCallback(arr[j], arr[j + 1]);
      if (compare > 0) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

const arr = [234, 43, 55, 63, 5, 6, 235, 547];

// bblSort(arr, (a, b) => {
//   return b - a;
// });
console.log(bblSort(arr, (a, b) => a - b));

// -- example3 - ABI (application binary interface)

setTimeout(() => {
  console.log("bye");
}, 2000);
