/**
    Map Reduce Example
*/
var collectionName = "creditCardBrandSalesReport";
var mapFunction = function () {
    var key = {
        "creditCardBrand": this.creditCardBrand
    };
    emit(key, this.items);
};
var reduceFunction = function (key, values) {
    var quantity = 0;
    var money = 0;
    for (idx = 0; idx < values.length; idx++) {
        var items = values[idx];
        for (idItem = 0; idItem < items.length; idItem++) {
            money += items[idItem].quantity * items[idItem].unityPrice;
            quantity += items[idItem].quantity;
        }
    }
    var reducedValues = {
        "quantity": quantity
        , "money": money
    }
    return reducedValues;
};
var finalizeFunction = function (key, reducedVal) {
    reducedVal.avg = reducedVal.money / reducedVal.quantity;
    return reducedVal;
};
db.sales.mapReduce(mapFunction, reduceFunction, {
    out: {
        merge: collectionName
    }
    , query: {}
    , finalize: finalizeFunction
});
// show results sorted by total sales
db.getCollection(collectionName).find({}).sort({ "value.money": -1 });
