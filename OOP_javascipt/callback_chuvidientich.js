function calculateRectanglePerimeter(length, width, callback) {
    const perimeter = 2 * (length + width);
    callback(perimeter);
}

function displayPerimeter(perimeter) {
    console.log(`The perimeter of the rectangle is: ${perimeter}`);
}

function calculateRectangleArea(length, width, callback) {
    const area = length * width;
    callback(area);
}

function displayArea(area) {
    console.log(`The area of the rectangle is: ${area}`);
}

const length = 5;
const width = 3;

calculateRectanglePerimeter(length, width, displayPerimeter);
calculateRectangleArea(length, width, displayArea);