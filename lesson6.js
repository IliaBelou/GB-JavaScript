//autor - Белоусов И.
/*Урок 6 - задание 2,3. 1. Продолжаем реализовывать модуль корзины:
Добавлять в объект корзины выбранные товары по клику на кнопке «Купить» без перезагрузки страницы;
Привязать к событию покупки товара пересчет корзины и обновление ее внешнего вида.
 */
/*2. * У товара может быть несколько изображений. Нужно:
Реализовать функционал показа полноразмерных картинок товара в модальном окне;
Реализовать функционал перехода между картинками внутри модального окна.*/
//////////////////////////////////////
"use strict";

class ProductItem {
    //private properties
    #nameStr = "defaultName"
    #priceValue = "defaultPrice"
    #image = "img/default.jpg"
    //Constructor
    constructor(name, price, image) {
        this.#nameStr = name;
        this.#priceValue = price;
        this.#image = "img/" + image
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
        this.#image = "img/" + image
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
    ProductItemNamesInBasket = []
    ProductItemNamesCountsInBasket = []
    ProductItemNamesTotalPrice = []
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
            let nameIndex = this.ProductItemNamesInBasket.indexOf(ProductItem.getName());
            if (nameIndex === -1) {
                let newLenght = this.ProductItemNamesInBasket.push(ProductItem.getName());
                this.ProductItemNamesCountsInBasket.push(1);
                this.ProductItemNamesTotalPrice.push(Number(ProductItem.getPrice()));
            } else {
                this.ProductItemNamesCountsInBasket[nameIndex]++;
                this.ProductItemNamesTotalPrice[nameIndex] = Number(this.ProductItemNamesTotalPrice[nameIndex]) + Number(ProductItem.getPrice());
            }
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
let ProductItemCatalog = [new ProductItem("Слон круглый", "100", "RoundElephant"), new ProductItem("Слон квадратный", "200", "SquareElephant")];
let productInModalWin =0;
/////////Функция генерации экземляра области товара //////////
function productAreaGen(catalogDiv, ProductItem, i) {
    let mainProductDiv = document.createElement("div"),
        imageZoneDiv = document.createElement("div"),
        nameZoneDiv = document.createElement("div"),
        priceZoneDiv = document.createElement("div"),
        toBasketButtonDiv = document.createElement("div");
    //Class style
    mainProductDiv.className = "productItemDiv";
    imageZoneDiv.className = "productItemImageZone";
    imageZoneDiv.id = "productItemImageZone_" + i;
    nameZoneDiv.className = "productItemNameZone";
    priceZoneDiv.className = "priceZoneDiv";
    toBasketButtonDiv.className = "productItemButtonZone";
    //Elements
    let link = document.createElement("img");
    link.src = ProductItem.getImage() + "_0_.jpg";
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
/////////Функция генерации всплывающего окна//////////////////
function genModalWindow(productItemImageZoneId) {
    //Видимость модального окна
    console.log(productItemImageZoneId);
    let modal = document.getElementById("myModal"),
        span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    //Кнопка закрыть
    span.addEventListener("click", function (e) {
        modal.style.display = "none";
        let imgTag = document.getElementById("ModalWindowImg");
    }, false);

    /*Определяем номер товара в каталоге -> Соотв.изображение*/
    let prdStrId = productItemImageZoneId.split("_");
    productInModalWin = Number(prdStrId[1]);
    
    let imgTag = document.getElementById("ModalWindowImg");
    imgTag.src = ProductItemCatalog[productInModalWin].getImage() + "_" + "1" + "_.jpg";
    

}
/////////Функция добавления товара в корзину//////////////////
function AddItemToBasket(ProductItemId) {
    let str = ProductItemId.split("_");
    busket1.addItemProduct(ProductItemCatalog[Number(str[1])]);
    //Генерация разметки и содержания корзины
    document.getElementById("basketFooterText").parentNode.innerHTML = "<p id=basketFooterText>Корзина пуста</p>"
    for (let index = 0; index < busket1.ProductItemNamesInBasket.length; index++) {
        let newProductdiv = document.createElement("div");
        newProductdiv.className = "newProductdiv";
        newProductdiv.innerHTML = "<table><tr><td>" + busket1.ProductItemNamesInBasket[index] + "</td><td>" + busket1.ProductItemNamesCountsInBasket[index] + "</td><td>" + busket1.ProductItemNamesTotalPrice[index] + "</td></tr></table>";
        document.getElementById("basketFooterText").parentNode.insertBefore(newProductdiv, document.getElementById("basketFooterText"));
    }
    //Футер
    document.getElementById("basketFooterText").innerHTML = "<p id=basketFooterText>В корзине: " + busket1.getNumberOfProductItemsInBasket() + " товаров на сумму " + busket1.estimateBasketPrice() + " рублей</p>";
}
/////////Функция генерации каталога///////////////////////////
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
            AddItemToBasket(e.target.id);
        }, false);
        document.getElementById("productItemImageZone_" + i).addEventListener("click", function (e) {
            genModalWindow(e.currentTarget.id);
        }, false);
    });
    let basketdiv = document.createElement("div");
    let basketdivFooter = document.createElement("div");
    basketdiv.className = "basketdiv";
    basketdivFooter.innerHTML = "<p id=basketFooterText>Корзина пуста</p>"
    baseDiv.appendChild(basketdiv);
    basketdiv.appendChild(basketdivFooter);
     /*При клике, меняем изображение*/
    let imgTag = document.getElementById("ModalWindowImg");
    imgTag.addEventListener("click", function (e) {
        let baseImgName = imgTag.src.split("_");
        let ImgNumber = Number(baseImgName[1]);
        if (ImgNumber >= 2) {
            imgTag.src = ProductItemCatalog[productInModalWin].getImage() + "_" + "1" + "_.jpg";
        } else {
            ImgNumber++;
            imgTag.src = ProductItemCatalog[productInModalWin].getImage() + "_" + ImgNumber + "_.jpg";
        }
    }, false);
}
//////////////////////////////////////
document.addEventListener("DOMContentLoaded", catalogGen);
