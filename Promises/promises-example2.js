function sumNumbers(a, b) {
    return new Promise((resolve, reject) => {
        if (typeof a !== 'number' || typeof b !== 'number') {
            reject('Cả hai giá trị phải là số.');
        } else {
            const sum = a + b;
            resolve(sum);
        }
    });
}

console.log(sumNumbers(5, 10));