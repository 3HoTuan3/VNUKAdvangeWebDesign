const a = 5
const b = 10
sumNumbers(a, b)
        .then(result => {
            console.log(`Tổng của ${a} và ${b} là: ${result}`);
        })
        .catch(error => {
            console.error('Error:', error);
        });