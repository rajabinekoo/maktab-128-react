// OOP system

// ======== class ========
class Animal implements IAnimal, A {
  // 1. constructor
  // 2. properties
  // 3. methods
  // 4. access modifiers (public, private, protected)

  eyeColor: string;
  public color: string;
  chert: string = "pert";

  // ======== encapsulation ========
  protected sound: string;

  constructor(c: string, s: string, public foots: number) {
    this.color = c;
    this.sound = s;
  }

  speak() {
    console.log(this.makeSoundTemplate());
  }

  private makeSoundTemplate() {
    return `${this.sound}, ${this.sound}`;
  }
}
const fox = new Animal("red", "woof", 4);
console.log(fox);
fox.speak();

// old way
// function speak() {
//   console.log(this.sound, this.sound);
// }
// function Animal2(c: string, s: string, f: number) {
//   this.color = c;
//   this.sound = s;
//   this.foots = f;
// }
// const fox = new Animal2("red", "woof", 4);
// console.log(fox);
// speak.call(fox);

// ======== interface ========

interface A {
  chert: string;
}
interface IAnimal {
  foots: number;
  color: string;
  eyeColor: string;
  speak: () => void;
}
function showAnimalInfo(animal: IAnimal) {
  console.log(animal.color, animal.foots);
}
showAnimalInfo(fox);

// ======== inheritance ========

class Dog extends Animal {
  private speed: number;

  constructor(c: string, s: string, f: number, sp: number) {
    super(c, s, f);
    this.speed = sp;
  }

  bark() {
    console.log(this.sound, this.sound, this.sound, this.sound);
  }
}

class Cat extends Animal {
  public weight: number;

  constructor(c: string, s: string, f: number, w: number) {
    super(c, s, f);
    this.weight = w;
  }

  pet() {
    console.log("Pretty!");
  }
}

const dog1 = new Dog("black", "wooof", 4, 1234);
console.log(dog1);
dog1.bark();

const cat1 = new Cat("orange", "meow", 4, 7);
console.log(cat1);
cat1.pet();

// invalid
// class B {}
// class C {}
// class D extends B, C {}

interface B {
  a: (_: number) => string;
}
interface C {
  b: (_: string) => number;
}
interface D {
  c: () => void;
}
class BCD implements B, C, D {
  a(num: number) {
    return num.toString();
  }
  b(str: string) {
    return Number(str);
  }
  c() {}
}

// ======== composition ========

class MotherBoard {
  public name: string;
  constructor(n: string) {
    this.name = n;
  }
}
class RAM {
  public name: string;
  constructor(n: string) {
    this.name = n;
  }
}
class CPU {
  public name: string;
  constructor(n: string) {
    this.name = n;
  }
}
class GPU {
  public name: string;
  constructor(n: string) {
    this.name = n;
  }
}

class PC {
  cpu: CPU;
  ram: RAM;
  gpu = new GPU("NVIDIA");
  motherBoard: MotherBoard;

  //   constructor(cName: string, rName: string, motherBoard: MotherBoard) {
  //     this.cpu = new CPU(cName);
  //     this.ram = new RAM(rName);
  //     this.motherBoard = motherBoard;
  //   }

  constructor(c: CPU, r: RAM, m: MotherBoard) {
    this.cpu = c;
    this.ram = r;
    this.motherBoard = m;
  }

  //   constructor(
  //     public cpu: CPU,
  //     public ram: RAM,
  //     public motherBoard: MotherBoard
  //   ) {}

  public start() {
    console.log(this.motherBoard.name, "is running...");
    console.log(this.cpu.name, "is running...");
    console.log(this.ram.name, "is running...");
    console.log(this.gpu.name, "is running...");
  }

  public calc(num1: number, num2: number) {
    console.log("process is running by", this.cpu.name);
    console.log("calculation");
    console.log(num1 + num2);
  }
}

// const pc1 = new PC(
//   new CPU("INTEL"),
//   new RAM("MSI RAM"),
//   new MotherBoard("MSI Motherboard")
// );
// console.log(pc1);
// pc1.start();
// pc1.calc(1, 2);

// ======== polymorphism ========

// way1
// class Person {
//   name: string;
//   age: number;
//   eyeColor: string;

//   constructor(name: string, age: number, eyeColor: string) {
//     this.name = name;
//     this.age = age;
//     this.eyeColor = eyeColor;
//   }
// }

// class Student {
//   constructor(public name: string, public gpa: number, public stuNum: number) {}
// }

function greeting(p: Person | Student) {
  console.log("Greeting", p.name);
}

// way2
class Person {
  name: string;
  age: number;
  eyeColor: string;

  constructor(name: string, age: number, eyeColor: string) {
    this.name = name;
    this.age = age;
    this.eyeColor = eyeColor;
  }
}

class Student extends Person {
  constructor(
    name: string,
    age: number,
    eyeColor: string,
    public gpa: number,
    public stuNum: number
  ) {
    super(name, age, eyeColor);
  }
}

function greeting2(p: Person) {
  console.log("Greeting", p.name);
}

const p = new Person("Bob", 40, "black");
const s = new Student("Alice", 20, "brown", 9, 123123);

greeting2(s);

// ======== abstraction ========

abstract class Vehicle {
  abstract startMotor();
  steering() {
    console.log("steering");
  }
}

class AutoMobile extends Vehicle {
  startMotor() {
    console.log("han han hannnnnnnnnnnnnnnn");
  }
  override steering(): void {
    console.log("steering 2");
  }
}

// const autoMobile1 = new AutoMobile();
// autoMobile1.startMotor();
// autoMobile1.steering();

abstract class Comparable {
  protected abstract compare(item1: number, item2: number): number;
}

interface IComparable {
  compare(item1: number, item2: number): number;
}

class BubbleSort extends Comparable {
  constructor(public numList: number[]) {
    super();
  }

  private swap(index1: number, index2: number) {
    const temp = this.numList[index1];
    this.numList[index1] = this.numList[index2];
    this.numList[index2] = temp;
  }

  protected override compare(item1: number, item2: number) {
    return item1 > item2 ? 1 : 0;
  }

  public sort() {
    for (let i = 0; i < this.numList.length; i++) {
      for (let j = 0; j < this.numList.length - 1 - i; j++) {
        if (this.compare(this.numList[j], this.numList[j + 1])) {
          this.swap(j, j + 1);
        }
      }
    }
  }
}

class BubbleSort2 extends BubbleSort {
  protected compare(item1: number, item2: number) {
    return item1 < item2 ? 1 : 0;
  }
}

const b1 = new BubbleSort2([2, -4, 1, 9, 6, -10]);
b1.sort();
console.log(b1.numList);

// ======== generic ========


