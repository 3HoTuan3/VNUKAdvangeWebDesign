var a = 7
var oddEven = (num) => { 
    return num % 2 == 0 ? console.log("Even") : console.log("Odd")
};
oddEven(a);

function isEven() {
    if (a % 2 == 0) {
        console.log("Even");
    } else {
        console.log("Odd");
    }
}
isEven();