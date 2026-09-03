var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var sumArr = (numbers) => {
    let sum = 0;
    let sumChan = 0;
    let sumLe = 0;

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] % 2 === 0) {
            sumChan += numbers[i];
        } else {
            sumLe += numbers[i];
        }
        sum += numbers[i];
    }

    return {
        Tong: sum,
        TongChan: sumChan,
        TongLe: sumLe
    };
};

const sumArray = () => {
    let sum = 0;
    let sumChan = 0;
    let sumLe = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 === 0) {
            sumChan += arr[i];
        } else {
            sumLe += arr[i];
        }
        sum += arr[i];
    }

    console.log("Tổng:", sum);
    console.log("Tổng chẵn:", sumChan);
    console.log("Tổng lẻ:", sumLe);
};

console.log(sumArr(arr));
sumArray();