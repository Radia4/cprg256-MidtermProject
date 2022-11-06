var cakeSelection;
var sheetCakeLength;
var sheetCakeWidth;
var i = 0;
var cakeLayers=1;                                                     
var roundCakeRadius;
var nameOfCake;
var itemName;
var itemPrice;
var basePrice= 0;
var additionalSizePrice = 0;
var extraLayersPrice= 0;
var additionalChoicesPrice = 0;
var grandTotal = 0;
var cakeOrdered={itemName,itemPrice};
var creamCheeseObject={itemName,itemPrice};
var almondsObject={itemName,itemPrice};
var jamObject={itemName,itemPrice};
var orderedItemsArray = [];
var validRange = "true";

function makeSelectionActive() {
   cakeSelection = document.querySelector('input[name=cakeType]:checked').id;
    if(cakeSelection === "sheetCake") {
        document.getElementById("sheetCakeSection").disabled=false;
        document.getElementById("roundCakeSection").disabled=true;
        document.getElementById("cakeRadius").value="";
        document.getElementById("roundCakeLayer").value=0;
        orderedItemsArray = [];
        grandTotal = 0;

    } else if(cakeSelection === "roundCake") {
        document.getElementById("sheetCakeSection").disabled=true;
        document.getElementById("roundCakeSection").disabled=false;
        document.getElementById("cakeLength").value="";
        document.getElementById("cakeWidth").value="";
        document.getElementById("sheetCakeLayer").value=0;
        orderedItemsArray = [];
        grandTotal = 0;
      
    }
}
function calculateInvoice() {

    if(cakeSelection === "sheetCake") {
        basePrice = document.getElementById("sheetCake").value;
        basePrice = parseFloat(basePrice);
        sheetCakeLength = document.getElementById("cakeLength").value;
        sheetCakeLength = parseFloat(sheetCakeLength);
        sheetCakeWidth = document.getElementById("cakeWidth").value;
        sheetCakeWidth = parseFloat(sheetCakeWidth);

        if((sheetCakeLength <30 || sheetCakeLength > 60) || (sheetCakeWidth <30 || sheetCakeWidth > 60)) {
            alert("Cake size is out of range. Min size = 30 cm, Max size = 60cm");
        }

        if((sheetCakeLength*sheetCakeWidth) >900) {
            additionalSizePrice = ((sheetCakeLength*sheetCakeWidth)-900) *0.02;
            additionalSizePrice = parseFloat(additionalSizePrice);
            basePrice +=additionalSizePrice;
        }
        layers = document.getElementById('sheetCakeLayer');
        cakeLayers = layers.options[layers.selectedIndex].value;

        if(cakeLayers == 2) {
            extraLayersPrice = (basePrice) * 0.50;
            extraLayersPrice = parseFloat(extraLayersPrice);
            basePrice +=extraLayersPrice;
            cakeLayers=2;                                                                    
        }
        else if(cakeLayers ==3){
            extraLayersPrice = ((basePrice) *0.50) *2;
            extraLayersPrice = parseFloat(extraLayersPrice);
            basePrice +=extraLayersPrice;
            cakeLayers=3;                                                                    
        }
        nameOfCake = ("Sheet Cake " + sheetCakeLength + "cm by " + sheetCakeWidth + "cm with " + cakeLayers + " layers: ");
        cakeOrdered.itemName = nameOfCake;
        cakeOrdered.itemPrice = parseFloat(basePrice).toFixed(2);
        orderedItemsArray.push(cakeOrdered);
    }

   
    if(cakeSelection === "roundCake"){
        basePrice = document.getElementById("roundCake").value;
        basePrice = parseFloat(basePrice);
        roundCakeRadius = document.getElementById("cakeRadius").value;
        roundCakeRadius = parseFloat(roundCakeRadius);

        if(roundCakeRadius <15 || roundCakeRadius > 30){
            alert("Cake radius is out of range. Min size = 15 cm, Max size = 30cm");
        }

        if((Math.pow(roundCakeRadius, 2) * 3.14) > 706.50){
            additionalSizePrice = ((Math.pow(roundCakeRadius, 2) * 3.14) -706.50) *0.02;
            additionalSizePrice = parseFloat(additionalSizePrice);
            basePrice += additionalSizePrice;
        }

        layers = document.getElementById('roundCakeLayer');
        cakeLayers = layers.options[layers.selectedIndex].value;
        
        if(cakeLayers == 2){
            extraLayersPrice = (basePrice) * 0.50;
            extraLayersPrice = parseFloat(extraLayersPrice);
            basePrice +=extraLayersPrice;
            cakeLayers=2;
        }
        else if(cakeLayers ==3) {
            extraLayersPrice = ((basePrice) *0.50) *2;
            extraLayersPrice = parseFloat(extraLayersPrice);
            basePrice +=extraLayersPrice;
            cakeLayers=3;
        }

        var nameOfCake = ("Round Cake" + roundCakeRadius + "cm with " + cakeLayers + " layers: ");
        cakeOrdered.itemName = nameOfCake;
        cakeOrdered.itemPrice = parseFloat(basePrice).toFixed(2);
        orderedItemsArray.push(cakeOrdered);
    }

    if(document.querySelector('input[id=creamCheese]:checked')) {
        creamCheeseObject.itemName = "Cream Cheese Icing";
        creamCheeseObject.itemPrice = parseFloat(document.querySelector('input[id=creamCheese]:checked').value).toFixed(2);
        orderedItemsArray.push(creamCheeseObject);
    }
    
    if(document.querySelector('input[id=fruitAlmonds]:checked')) {
        almondsObject.itemName = "Fruit & Almond Topping";
        almondsObject.itemPrice = parseFloat(document.querySelector('input[id=fruitAlmonds]:checked').value).toFixed(2);
        orderedItemsArray.push(almondsObject);
    }

    if(document.querySelector('input[id=fruitJam]:checked')) {
        jamObject.itemName = "Fruit Jam Filling";
        jamObject.itemPrice = parseFloat(document.querySelector('input[id=fruitJam]:checked').value).toFixed(2);
        orderedItemsArray.push(jamObject);
    }
}

function showInvoice(){
    calculateInvoice();
    document.getElementById("title").innerHTML = "Cart";
    document.getElementById("customerName").innerHTML = (document.getElementById('FirstName').value + " " +  
                                                            document.getElementById("LastName").value);
    document.getElementById("customerAddress").innerHTML = document.getElementById("Address").value;
    document.getElementById("postalCode").innerHTML = document.getElementById("PostalCode").value;
    document.getElementById("customerPhone").innerHTML = document.getElementById("Phone").value;
    document.getElementById("customerAddress").innerHTML = document.getElementById("Address").value;
    document.getElementById("customerEmail").innerHTML = document.getElementById("Email").value;
    document.getElementById("item").innerHTML = "Item";
    document.getElementById("price").innerHTML = "Price";

    var itemNameToDisplay = "";
    var itemPriceToDisplay = "";

    for(i = 0; i < orderedItemsArray.length; i++){ 
        itemNameToDisplay += orderedItemsArray[i].itemName + "<br>";
        itemPriceToDisplay += "$" + orderedItemsArray[i].itemPrice + "<br>";
    }

    document.getElementById("itemN").innerHTML = itemNameToDisplay;
    document.getElementById("itemP").innerHTML = itemPriceToDisplay;

    for(var i = 0; i<orderedItemsArray.length; i++) {
        var item = orderedItemsArray[i].itemPrice;
        grandTotal = parseFloat(item);
    }

    document.getElementById("total").innerHTML = "Total";
    document.getElementById("totalCalculation").innerHTML = "$" +  grandTotal.toFixed(2);
}