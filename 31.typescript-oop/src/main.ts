// OOP system

// 1.class
class Animal implements IAnimal, A {
  // 1. constructor
  // 2. properties
  // 3. methods
  // 4. access modifiers (public, private, protected)

  eyeColor: string;
  public color: string;
  chert: string = "pert";

  // encapsulation
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

// 2. interface

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

// inheritance

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

// composition

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

const pc1 = new PC(
  new CPU("INTEL"),
  new RAM("MSI RAM"),
  new MotherBoard("MSI Motherboard")
);
console.log(pc1);
pc1.start();
pc1.calc(1, 2);
