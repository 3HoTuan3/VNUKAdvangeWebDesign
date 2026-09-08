function callbackSum(a, b, callback) {
    const sum = a + b;
    callback(sum);
}

function displayResult(result) {
    console.log(`The sum is: ${result}`);
}

callbackSum(5, 10, displayResult);