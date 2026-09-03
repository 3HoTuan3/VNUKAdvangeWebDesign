var globalVar = "Global var";
let globalLet = "Global let";
const globalConst = "Global const";

function testScope() {
    var functionVar = "Function var";
    let functionLet = "Function let";
    const functionConst = "Function const";

    if (true) {
        var blockVar = "Block var";
        let blockLet = "Block let";
        const blockConst = "Block const";

        console.log("---");
        console.log(globalVar, globalLet, globalConst);
        console.log(functionVar, functionLet, functionConst);
        console.log(blockVar, blockLet, blockConst);
    }

    console.log("---");
    console.log(globalVar, globalLet, globalConst);
    console.log(functionVar, functionLet, functionConst);
    console.log(blockVar);
}

testScope();

console.log("---");
console.log(globalVar, globalLet, globalConst);
