function calculateRectanglePerimeter(length, width, callback) {
    const perimeter = 2 * (length + width);
    callback(perimeter);
}

function displayPerimeter(perimeter) {
    document.querySelector('#perimeterResult').textContent = perimeter;
}

function calculateRectangleArea(length, width, callback) {
    const area = length * width;
    callback(area);
}

function displayArea(area) {
    document.querySelector('#areaResult').textContent = area;
}

const rectangleForm = document.querySelector('#rectangleForm');
const errorMessage = document.querySelector('#errorMessage');

rectangleForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const length = Number(document.querySelector('#length').value);
    const width = Number(document.querySelector('#width').value);

    if (!Number.isFinite(length) || !Number.isFinite(width) || length <= 0 || width <= 0) {
        errorMessage.textContent = 'Vui lòng nhập hai số lớn hơn 0.';
        return;
    }

    errorMessage.textContent = '';
    calculateRectanglePerimeter(length, width, displayPerimeter);
    calculateRectangleArea(length, width, displayArea);
});