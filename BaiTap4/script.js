var arr = [];
function save() {
    var a = {
        customerName: document.getElementById("customerName").value,
        id: document.getElementById("customerID").value,
        productName: document.getElementById("productName").value,
        quantity: document.getElementById("quantity").value,
        price: document.getElementById("price").value
    }
    console.log(a);     
    arr.push(a);
}

function show() {
    var html= '';
    for (var i = 0; i < arr.length; i++) {
        html += '<tr>';
        html += '<td>' + arr[i].customerName + '</td>';
        html += '<td>' + arr[i].id + '</td>';
        html += '<td>' + arr[i].productName + '</td>';
        html += '<td>' + arr[i].quantity + '</td>';
        html += '<td>' + arr[i].price + '</td>';
        html += '<td>' + parseFloat(arr[i].quantity) * parseFloat(arr[i].price) + '</td>';
        html += '</tr>';
    }
    document.getElementById("tableBody").innerHTML = html;
}

function reset() {
    document.getElementById("customerName").value = '';
    document.getElementById("customerID").value = '';
    document.getElementById("productName").value = '';
    document.getElementById("quantity").value = '';
    document.getElementById("price").value = '';
}