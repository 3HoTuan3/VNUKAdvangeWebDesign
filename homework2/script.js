// 1. Constants
const PI = 3.14159;
console.log(PI);

// 2. Block Scope
if (true) {
    let x = 10;
    console.log(x);
}

// 3. Arrow Functions
const add = (a, b) => a + b;
console.log(add(5, 3));

// 4. Rest & Spread
function sum(...numbers) {
    return numbers.reduce((acc, num) => acc + num, 0);
}
console.log(sum(1, 2, 3, 4));
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];
console.log(arr2);

// 5. Template Literals
const name = "Alice";
const greeting = `Hello, ${name}!`;
console.log(greeting);

// 6. Extended Literals
console.log(0b1010);
console.log(0o52);
console.log(0x2a);

// 7. Enhanced Object Properties
const personName = "John";
const age = 25;
const person = { personName, age };
console.log(person);

// 8. Destructuring Assignment
const user = {
    name: "Alice",
    age: 30
};

const { name: userName, age: userAge } = user;
console.log(userName);
console.log(userAge);

// 9. Modules

// module.js
// export const greet = (name) => `Hello, ${name}!`;

// main.js
// import { greet } from "./module.js";
// console.log(greet("Alice"));

// 10. Classes
class Person {
    constructor(name) {
        this.name = name;
    }

    greet() {
        return `Hello, my name is ${this.name}`;
    }
}

const personObject = new Person("Bob");
console.log(personObject.greet());

// 11. Iterators
const numbers = [1, 2, 3];
const iterator = numbers[Symbol.iterator]();

console.log(iterator.next().value);
console.log(iterator.next().value);
console.log(iterator.next().value);

// 12. Generators
function* generateNumbers() {
    yield 1;
    yield 2;
    yield 3;
}

const generator = generateNumbers();

console.log(generator.next().value);
console.log(generator.next().value);
console.log(generator.next().value);

// 13. Collections: Map & Set

// Map
const map = new Map();
map.set("name", "Alice");
console.log(map.get("name"));

// Set
const set = new Set([1, 2, 2, 3]);
console.log(set);

// 14. New Built-in Methods
console.log([1, 2, 3].includes(2));
console.log("Hello".startsWith("He"));
console.log("Hello".endsWith("lo"));

// 15. Promises
const fetchData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data received");
        }, 2000);
    });
};

fetchData().then(console.log);