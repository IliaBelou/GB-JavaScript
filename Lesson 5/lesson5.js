//autor - Белоусов И.
/*Урок 5 - задание 1. Создать функцию, генерирующую шахматную доску. Можно использовать любые html-теги. Доска должна быть верно разлинована на черные и белые ячейки. 
Строки должны нумероваться числами от 1 до 8, столбцы — латинскими буквами A, B, C, D, E, F, G, H.
 */
"use strict";

//////////////////////////////////////
function createElement(horizontalRow, chessBdElementType, position) {
    let headerVerticalNamesList = ["8", "7", "6", "5", "4", "3", "2", "1"],
        headerHorizontalNamesList = ["A", "B", "C", "D", "E", "F", "G", "H"];
    let elemType = document.createElement("div");
    switch (chessBdElementType) {
        case "corner":
            elemType.className = "corner";
            break;
        case "blackCell":
            elemType.className = "blackCell";
            break;
        case "whiteCell":
            elemType.className = "whiteCell";
            break;
        case "horizontalHeader":
            elemType.className = "horizontalHeader";
            elemType.innerHTML = "<h1>" + headerHorizontalNamesList[position - 1] + "</h1>";
            break;
        case "verticalHeader":
            elemType.className = "verticalHeader";
            elemType.innerHTML = "<h1>" + headerVerticalNamesList[position - 1] + "</h1>";
            break;
        default:
            console.log("wrongElementType");
    }
    horizontalRow.appendChild(elemType);
}

//////////////////////////////////////
function chessBoardMarkup() {
    let baseDiv = document.querySelector('.task1_div');
    let rowsNum = 10,
        columnNum = 10;
    let whiteCellFlag = true;
    if (baseDiv !== null) {
        for (let rows = 0; rows < rowsNum; rows++) {
            //create row
            let horizontalRow = document.createElement("div");
            horizontalRow.className = "horizontalRow";
            baseDiv.appendChild(horizontalRow);
            if (rows > 0) whiteCellFlag = !whiteCellFlag;

            //create row elements
            for (let columns = 0; columns < columnNum; columns++) {
                //Horizontal header and corners
                if (rows === 0 || (rows === rowsNum - 1)) {
                    //corners
                    if (columns === 0 || (columns === columnNum - 1)) {
                        createElement(horizontalRow, "corner");
                    } else {
                        //first row or last row
                        createElement(horizontalRow, "horizontalHeader", columns);
                    }
                    //Vertical headers
                } else if (columns === 0 || (columns === columnNum - 1)) {
                    createElement(horizontalRow, "verticalHeader", rows);
                    //Cells
                } else {
                    if (whiteCellFlag === true) {
                        createElement(horizontalRow, "whiteCell", columns);
                    } else {
                        createElement(horizontalRow, "blackCell", columns);
                    }
                    whiteCellFlag = !whiteCellFlag;
                }

            }
        }
    }
}

//autor - Белоусов И.
/*Урок 5 - задание 2,3. Сделать генерацию корзины динамической: верстка корзины не должна находиться в HTML-структуре. 
Там должен быть только div, в который будет вставляться корзина, сгенерированная на базе JS:
Пустая корзина должна выводить строку «Корзина пуста»;
Наполненная должна выводить «В корзине: n товаров на сумму m рублей».
* Сделать так, чтобы товары в каталоге выводились при помощи JS:
Создать массив товаров (сущность Product);
При загрузке страницы на базе данного массива генерировать вывод из него. HTML-код должен содержать только div id=”catalog” без вложенного кода. Весь вид каталога генерируется JS.
 */

//////////////////////////////////////
class ProductItem {
    //private properties
    #nameStr = "defaultName"
    #priceValue = "defaultPrice"
    #image = "img/default.jpg"
    //Constructor
    constructor(name, price, image) {
        this.#nameStr = name;
        this.#priceValue = price;
        this.#image = "img/" + image + ".jpg"
    }
    //Getters,Setters
    getName() {
        return this.#nameStr
    }
    setName(name) {
        if (name === '') {
            console.log('РќР°Р·РІР°РЅРёРµ С‚РѕРІР°СЂР° РЅРµ РјРѕР¶РµС‚ Р±С‹С‚СЊ РїСѓСЃС‚С‹Рј');
        } else {
            this.#nameStr = name
        }
    }
    setImage(image) {
        this.#image = "img/" + image + ".jpg"
    }
    getImage() {
        return this.#image;
    }
    getPrice() {
        return this.#priceValue
    }
    setPrice(price) {
        if (price <= 0) {
            console.log('РЎС‚РѕРёРјРѕСЃС‚СЊ С‚РѕРІР°СЂР° РґРѕР»Р¶РЅР° Р±С‹С‚СЊ Р±РѕР»СЊС€Рµ РЅСѓР»СЏ');
        } else {
            this.#priceValue = price
        }
    }
}

//////////////////////////////////////
class Basket {
    //private properties
    #nameStr
    #productItemsInBasket = 0
    #productItemsInBasketArr = []
    #maxProductItemsInBasket = 100
    //Constructor
    constructor(maxProductItemsInBasket, name) {
        this.#maxProductItemsInBasket = maxProductItemsInBasket;
        this.#nameStr = name;
    }
    //Getters,Setters
    getMaxProductItemsInBasket() {
        return this.#maxProductItemsInBasket
    }
    getNumberOfProductItemsInBasket() {
        return this.#productItemsInBasket
    }
    getName() {
        return this.#nameStr
    }
    setName(name) {
        if (name === '') {
            console.log('РќР°Р·РІР°РЅРёРµ РєРѕСЂР·РёРЅС‹ РЅРµ РјРѕР¶РµС‚ Р±С‹С‚СЊ РїСѓСЃС‚С‹Рј');
        } else {
            this.#nameStr = name
        }
    }
    getProductItemFromIndex(index) {
        return this.#productItemsInBasketArr[index];
    }
    //methods
    isBasketFull() {
        return this.getNumberOfProductItemsInBasket() >= this.getMaxProductItemsInBasket() ? true : false;
    }
    addItemProduct(ProductItem) {
        if (this.isBasketFull()) {
            console.log(this.getName() + " Р—Р°РїРѕР»РЅРµРЅР°");
        } else {
            this.#productItemsInBasketArr.push(ProductItem);
            this.#productItemsInBasket++;
        }
    }
    estimateBasketPrice() {
        let totalPrice = 0;
        this.#productItemsInBasketArr.forEach(function (ProductItem, i, productItemsInBasketArr) {
            totalPrice += Number(ProductItem.getPrice());
        });
        return totalPrice;
    }
}

//////////////////////////////////////
let busket1 = new Basket(100, "РљРѕСЂР·РёРЅР° 1");
//busket1.addItemProduct(product1);
//busket1.addItemProduct(product2);
let ProductItemCatalog = [new ProductItem("Слон круглый", "100", "RoundElephant"), new ProductItem("Слон квадратный", "200", "SquareElephant")];
//////////////////////////////////////
function productAreaGen(catalogDiv, ProductItem, i) {
    let mainProductDiv = document.createElement("div"),
        imageZoneDiv = document.createElement("div"),
        nameZoneDiv = document.createElement("div"),
        priceZoneDiv = document.createElement("div"),
        toBasketButtonDiv = document.createElement("div");
    //Class style
    mainProductDiv.className = "productItemDiv";
    imageZoneDiv.className = "productItemImageZone";
    nameZoneDiv.className = "productItemNameZone";
    priceZoneDiv.className = "priceZoneDiv";
    toBasketButtonDiv.className = "productItemButtonZone";
    //Elements
    let link = document.createElement("img");
    link.src = ProductItem.getImage();
    imageZoneDiv.appendChild(link);
    nameZoneDiv.innerHTML = "<h1>" + ProductItem.getName() + "</h1>"
    priceZoneDiv.innerHTML = "<h1>" + ProductItem.getPrice() + "</h1>"
    toBasketButtonDiv.innerHTML = "<p><button id=ProductItem_" + i + ">Купить слона</button>"
    //NodeStruct 
    mainProductDiv.appendChild(imageZoneDiv);
    mainProductDiv.appendChild(nameZoneDiv);
    mainProductDiv.appendChild(priceZoneDiv);
    mainProductDiv.appendChild(toBasketButtonDiv);
    catalogDiv.append(mainProductDiv);

}
//////////////////////////////////////
function AddItemToBasket(ProductItemId) {
   let str = ProductItemId.split("_");
    busket1.addItemProduct(ProductItemCatalog[Number(str[1])]);
    document.getElementById("basketText").innerHTML = "<p id=basketText>В корзине: "+busket1.getNumberOfProductItemsInBasket()+" товаров на сумму "+busket1.estimateBasketPrice()+" рублей</p>";
}
//////////////////////////////////////
function catalogGen() {
    let baseDiv = document.querySelector('.task2_3_div');
    let catalog = document.createElement("div");
    catalog.className = "catalog";
    baseDiv.appendChild(catalog);
    //Catalog gen
    ProductItemCatalog.forEach(function (item, i, ProductItemCatalog) {
        productAreaGen(catalog, item, i);
        //EventL
        let button = document.getElementById("ProductItem_" + i).addEventListener("click", function (e) {
            AddItemToBasket(e.target.id)
        }, false);
    });
    let basketdiv = document.createElement("div");
    basketdiv.innerHTML = "<p id=basketText>Корзина пуста</p>"
    baseDiv.appendChild(basketdiv);  
}

//////////////////////////////////////
document.addEventListener("DOMContentLoaded", chessBoardMarkup);
document.addEventListener("DOMContentLoaded", catalogGen);
