function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
var products = ["Apple Watch", "iPad", "iPhone", "MacBook", "MacBook Pro", "MacBook Air", "iMac", "Mac Pro", "Mac Pro", "Mac mini", "Displays", "AirPort Extreme", "AirPort Time Capsule", "AirPort Express", "Apple TV"];
var stores = ["Amazon", "BestBuy", "B&H Photo Video", "Apple Store"];
var creditCardBrands = ["Visa", "MasterCard", "American Express", "Diners Club"];
var numberOfItems = Math.floor(Math.random() * products.length);
for (j = 0; j < 30000; j++) {
    var items = [];
    for (i = 0; i < numberOfItems; i++) {
        var item = {
            "product": products[i]
            , "quantity": randomIntFromInterval(1, 10)
            , "unityPrice": randomIntFromInterval(499, 999)
        };
        items.push(item);
    }
    var store = stores[Math.floor(Math.random() * stores.length)];
    var creditCardBrand = creditCardBrands[Math.floor(Math.random() * creditCardBrands.length)];
    var sale = {
        "items": items
        , "store": store
        , "creditCardBrand": creditCardBrand
    };
    db.sales.insert(sale);
}
