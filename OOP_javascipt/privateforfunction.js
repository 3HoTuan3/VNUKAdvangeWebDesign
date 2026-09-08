class MyClass {
    #x = 0;

    increaseX(value = 1) {
        this.#x += value;
    }

    setX(value) {
        this.#x = value;
    }

    getX() {
        return this.#x;
    }
}

const m = new MyClass();

m.setX(10);
console.log(m.getX());

m.increaseX(5);
console.log(m.getX());