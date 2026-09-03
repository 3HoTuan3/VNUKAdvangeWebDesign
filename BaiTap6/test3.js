arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
var [First,,,,,,,last] = arr;
console.log(First, last);

var [hello, ...rest] = arr;
console.log(hello, rest);