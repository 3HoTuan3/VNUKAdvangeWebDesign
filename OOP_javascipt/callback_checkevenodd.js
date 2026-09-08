function checkChanLe(number, callback) {
    if (number % 2 === 0) {
        callback("Số chẵn");
    } else {
        callback("Số lẻ");
    }
}

function displayResult(result) {
    console.log(result);
}

const number = 7;
checkChanLe(number, displayResult);