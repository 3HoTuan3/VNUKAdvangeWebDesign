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

const animalList = document.querySelector('#animalList');
const result = document.querySelector('#result');
const soundButton = document.querySelector('#soundButton');
let selectedAnimal = null;

animals.forEach((animal, index) => {
    const button = document.createElement('button');
    button.className = 'animal-card';
    button.type = 'button';
    button.dataset.index = index;
    button.innerHTML = `
        <span class="animal-icon">${['🐶', '🐱', '🐦'][index]}</span>
        <span>
            <strong>${animal.name}</strong>
            <small>${animal.constructor.name}</small>
        </span>
    `;

    button.addEventListener('click', () => {
        document.querySelectorAll('.animal-card').forEach((card) => card.classList.remove('selected'));
        button.classList.add('selected');
        selectedAnimal = animal;
        soundButton.disabled = false;
        result.innerHTML = `
            <span class="result-label">Đối tượng đã chọn</span>
            <strong>${animal.getDescription()}</strong>
        `;
    });

    animalList.appendChild(button);
});

soundButton.addEventListener('click', () => {
    if (!selectedAnimal) {
        return;
    }

    result.innerHTML = `
        <span class="result-label">Kết quả của ${selectedAnimal.constructor.name}.makeSound()</span>
        <strong>${selectedAnimal.makeSound()}</strong>
    `;
});
