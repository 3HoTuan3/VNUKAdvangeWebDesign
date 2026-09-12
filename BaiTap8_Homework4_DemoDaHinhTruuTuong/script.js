class Animal {
    constructor(name) {
        if (new.target === Animal) {
            throw new Error('Animal là lớp trừu tượng và không thể tạo trực tiếp.');
        }

        this.name = name;
    }

    makeSound() {
        throw new Error('Lớp con phải cài đặt phương thức makeSound().');
    }

    getDescription() {
        return `${this.name} là một đối tượng thuộc lớp ${this.constructor.name}.`;
    }
}

class Dog extends Animal {
    makeSound() {
        return 'Gâu gâu! Chó đang sủa.';
    }
}

class Cat extends Animal {
    makeSound() {
        return 'Meo meo! Mèo đang kêu.';
    }
}

class Bird extends Animal {
    makeSound() {
        return 'Chíp chíp! Chim đang hót.';
    }
}

const animals = [
    new Dog('Buddy'),
    new Cat('Mimi'),
    new Bird('Rio')
];

const readline = require('node:readline/promises');
const { stdin, stdout } = require('node:process');

const terminal = readline.createInterface({ input: stdin, output: stdout });

function printAnimalList() {
    console.log('\n=== Demo đa hình và trừu tượng ===');
    console.log('Chọn một con vật để gọi makeSound():');

    animals.forEach((animal, index) => {
        console.log(`${index + 1}. ${animal.name} (${animal.constructor.name})`);
    });

    console.log('0. Thoát');
}

async function runDemo() {
    console.log('Animal là lớp trừu tượng: không thể tạo đối tượng trực tiếp.');

    while (true) {
        printAnimalList();
        const choice = await terminal.question('Nhập lựa chọn: ');

        if (choice.trim() === '0') {
            console.log('Đã thoát chương trình.');
            break;
        }

        const animal = animals[Number(choice) - 1];

        if (!animal) {
            console.log('Lựa chọn không hợp lệ. Vui lòng nhập 0, 1, 2 hoặc 3.');
            continue;
        }

        console.log(`\nĐối tượng đã chọn: ${animal.getDescription()}`);
        console.log(`Kết quả của ${animal.constructor.name}.makeSound(): ${animal.makeSound()}`);
    }

    terminal.close();
}

runDemo();
