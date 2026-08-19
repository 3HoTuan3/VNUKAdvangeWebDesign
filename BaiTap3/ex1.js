function myFunction1() {
    var a = parseFloat(document.getElementById('text_1').value);
    var b = parseFloat(document.getElementById('text_2').value);
    var c = document.getElementById('select');
    var value = parseInt(c.options[c.selectedIndex].value);
    var k;

    if (isNaN(a) || isNaN(b)) {
        alert("Vui lòng nhập số điểm hợp lệ!");
        return;
    }

    switch (value) {
        case 1: 
            k = (a + (b * 2)) / 3;
            break;
        case 2: 
            k = ((a * 2) + (b * 3)) / 5;
            break;
        case 3: 
            k = ((a * 3) + (b * 4)) / 7;
            break;
    }

    k = parseFloat(k.toFixed(2));
    document.getElementById('result').value = k;
    var displayElement = document.getElementById('display');
    
    if (k >= 9) {
        displayElement.innerHTML = "Hoc sinh gioi";
        displayElement.style.color = "red";
    } else if (k >= 7 && k < 9) {
        displayElement.innerHTML = "Hoc sinh kha";
        displayElement.style.color = "blue";
    } else if (k >= 5 && k < 7) {
        displayElement.innerHTML = "Hoc sinh trung binh";
        displayElement.style.color = "yellow";
    } else {
        displayElement.innerHTML = "Hoc sinh yeu";
        displayElement.style.color = "white"; 
    }
}

function myFunction2() {
    document.getElementById('text_1').value = "";
    document.getElementById('text_2').value = "";
    document.getElementById('result').value = "";
    document.getElementById('display').innerHTML = "";
}