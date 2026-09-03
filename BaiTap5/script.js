var man = [
    {
        id: 1,
        name: "Áo sơ mi nam",
        productCode: "MS001",
        price: "200.000",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbsgfnyEwJwBv1cUn9A48NCiJcYRjDg5mnr4fajklaiw&s=10"
    },
    {
        id: 2,
        name: "Quần jeans nam",
        productCode: "MS002",
        price: "300.000",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQgydy__amdgg9Jc2LwCpx4N-VJrkPsRL0tclOoq_4VQ&s=10"
    },
    {
        id: 3,
        name: "Áo thun nam",
        productCode: "MS003",
        price: "150.000",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh5npq2v7uf-8xM6Z93G5utKRq87VuZ4g-ivCe3R6Big&s=10"
    },
    {
        id: 4,
        name: "Áo khoác nam",
        productCode: "MS004",
        price: "400.000",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-BZJ69p85UiFfLGqhCJhtbrydmFzh2evRYxYQLm-mHw&s=10"
    }
];
var woman = [
    {
        id: 1,
        name: "Váy nữ",
        productCode: "MS005",
        price: "250.000",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3AmrMPQJyChaE5hlIMe3dE0pfhBBp66koZhtZ0KPWKQ&s=10"
    },
    {
        id: 2,
        name: "Áo sơ mi nữ",
        productCode: "MS006",
        price: "200.000",
        image: "https://product.hstatic.net/1000402464/product/fwws25ss02c__1__b1dc794c26584bf99864bfe4aee50bf3_master.jpg"
    },
    {
        id: 3,
        name: "Quần jeans nữ",
        productCode: "MS007",
        price: "300.000",
        image: "https://file.hstatic.net/1000284478/file/chon-size-jean-nu-1_573e8c5040364876aa14e7200366256c_grande.jpg"
    },
    {
        id: 4,
        name: "Áo thun nữ",
        productCode: "MS008",
        price: "150.000",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBGqY_rX2xfvevJXsLQWGlmbr0mLBP1jAmMx93YwTepQ&s=10"
    }
]

function listProducts() {
    for (var i = 0; i < man.length; i++) {
        var list1 = '<div class="col-3">'
        list1 += '<div class="card" style="width: 18rem;">'
        list1 += '<img src="' + man[i].image + '" class="card-img-top" style="height: 200px">'
        list1 += '<div class="card-body">'
        list1 += '<h5 class="card-title">' + man[i].name + ' - ' + man[i].productCode + '</h5>'
        list1 += '<p class="card-text">' + man[i].price + ' VND</p>'
        list1 += '<a href="#" class="btn btn-primary" onclick="order(' + man[i].id + ')"> Mua ngay</a>'
        list1 += '</div>'
        list1 += '</div>'
        list1 += '</div>'
        console.log(list1);
        document.getElementById("man").innerHTML += list1;
    }

    for (var i = 0; i < woman.length; i++) {
        var list2 = '<div class="col-3">'
        list2 += '<div class="card" style="width: 18rem;">'
        list2 += '<img src="' + woman[i].image + '" class="card-img-top" style="height: 200px">'
        list2 += '<div class="card-body">'
        list2 += '<h5 class="card-title">' + woman[i].name + ' - ' + woman[i].productCode + '</h5>'
        list2 += '<p class="card-text">' + woman[i].price + ' VND</p>'
        list2 += '<a href="#" class="btn btn-primary" onclick="order(' + woman[i].id + ')"> Mua ngay</a>'
        list2 += '</div>'
        list2 += '</div>'
        list2 += '</div>'
        console.log(list2);
        document.getElementById("woman").innerHTML += list2;
    }
}

function order() {
    var message = document.getElementById("message");

    message.textContent = "Cảm ơn bạn đã đặt hàng!";
    message.style.display = "block";

    setTimeout(function () {
        message.style.display = "none";}, 1000);
}