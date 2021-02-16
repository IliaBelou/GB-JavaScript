//autor - Белоусов И.
/*Урок 7 - задание 1,2. 1. Реализовать страницу корзины:
Добавить возможность не только смотреть состав корзины, но и редактировать его, обновляя общую стоимость или выводя сообщение «Корзина пуста».

2. На странице корзины:
a) Сделать отдельные блоки «Состав корзины», «Адрес доставки», «Комментарий»;
b) Сделать эти поля сворачиваемыми;
c) Заполнять поля по очереди, то есть давать посмотреть состав корзины, внизу которого есть кнопка «Далее». Если нажать ее, сворачивается «Состав корзины» и открывается «Адрес доставки» и так далее..*/
//////////////////////////////////////
"use strict";

class ProductItem {
    //private properties
    nameStr = "defaultName"
    priceValue = "defaultPrice"
    image = "img/default.jpg"
    //Constructor
    constructor(name, price, image) {
        this.nameStr = name;
        this.priceValue = price;
        this.image = "img/" + image
    }
    //Getters,Setters
    getName() {
        return this.nameStr
    }
    setName(name) {
        if (name === '') {
            console.log('РќР°Р·РІР°РЅРёРµ С‚РѕРІР°СЂР° РЅРµ РјРѕР¶РµС‚ Р±С‹С‚СЊ РїСѓСЃС‚С‹Рј');
        } else {
            this.nameStr = name
        }
    }
    setImage(image) {
        this.image = "img/" + image
    }
    getImage() {
        return this.image;
    }
    getPrice() {
        return this.priceValue
    }
    setPrice(price) {
        if (price <= 0) {
            console.log('РЎС‚РѕРёРјРѕСЃС‚СЊ С‚РѕРІР°СЂР° РґРѕР»Р¶РЅР° Р±С‹С‚СЊ Р±РѕР»СЊС€Рµ РЅСѓР»СЏ');
        } else {
            this.priceValue = price
        }
    }
}

//////////////////////////////////////
class Basket {
    //private properties
    nameStr
    productItemsInBasket = 0
    maxProductItemsInBasket = 100
    productItemNamesInBasket = []
    productItemNamesCountsInBasket = []
    productItemNamesPricesInBasket = []
    productItemNamesTotalPrice = []
    //Constructor
    constructor(maxProductItemsInBasket, name) {
        this.maxProductItemsInBasket = maxProductItemsInBasket;
        this.nameStr = name;
    }
    //Getters,Setters
    getMaxProductItemsInBasket() {
        return this.maxProductItemsInBasket
    }
    getNumberOfProductItemsInBasket() {
        return this.productItemsInBasket
    }
    getName() {
        return this.nameStr
    }
    setName(name) {
        if (name === '') {
            console.log('РќР°Р·РІР°РЅРёРµ РєРѕСЂР·РёРЅС‹ РЅРµ РјРѕР¶РµС‚ Р±С‹С‚СЊ РїСѓСЃС‚С‹Рј');
        } else {
            this.nameStr = name
        }
    }

    //methods
    decrementProductItemCountsByNamesInBasket(index) {
        if (this.productItemNamesCountsInBasket[index] > 0) {
            this.productItemNamesTotalPrice[index] -= Number(this.productItemNamesPricesInBasket[index]);
            this.productItemNamesCountsInBasket[index]--;
            this.productItemsInBasket--;
        } else {
            console.log("none of this product left in basket")
        }
    }
    incrementProductItemCountsByNamesInBasket(index) {
        if (this.productItemNamesCountsInBasket[index] < 100) {
            this.productItemNamesTotalPrice[index] += Number(this.productItemNamesPricesInBasket[index]);
            this.productItemNamesCountsInBasket[index]++;
            this.productItemsInBasket++;
        } else {
            console.log("more than 100 of this product in basket")
        }
    }
    isBasketFull() {
        return this.getNumberOfProductItemsInBasket() >= this.getMaxProductItemsInBasket() ? true : false;
    }
    isBasketEmpty() {
        return this.getNumberOfProductItemsInBasket() === 0 ? true : false;
    }
    addItemProduct(ProductItem) {
        if (this.isBasketFull()) {
            console.log(this.getName() + " Р—Р°РїРѕР»РЅРµРЅР°");
            return -1;
        } else {
            this.productItemsInBasket++;
            let nameIndex = this.productItemNamesInBasket.indexOf(ProductItem.getName());
            if (nameIndex === -1) {
                let newLenght = this.productItemNamesInBasket.push(ProductItem.getName());
                this.productItemNamesPricesInBasket.push(ProductItem.getPrice());
                this.productItemNamesCountsInBasket.push(1);
                this.productItemNamesTotalPrice.push(Number(ProductItem.getPrice()));
                return newLenght;
            } else {
                this.productItemNamesCountsInBasket[nameIndex]++;
                this.productItemNamesTotalPrice[nameIndex] = Number(this.productItemNamesTotalPrice[nameIndex]) + Number(ProductItem.getPrice());
                return -1;
            }
        }
    }
    estimateBasketPrice() {
        let totalPrice = 0;
        this.productItemNamesTotalPrice.forEach(function (price, i, productItemNamesTotalPrice) {
            totalPrice += Number(price);
        });
        return totalPrice;
    }
}

//////////Экземляры классов////////////
let busket1 = new Basket(100, "РљРѕСЂР·РёРЅР° 1");
let productItemCatalog = [new ProductItem("Слон круглый", "100", "RoundElephant"), new ProductItem("Слон квадратный", "200", "SquareElephant")];
let productInModalWin = 0; //Индекс продукта в модальном окне
/////////Функция генерации экземляра области товара //////////
function constructProductArea(catalogDiv, ProductItem, i) {
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
function constructModalWindow(productItemImageZoneId) {
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
    imgTag.src = productItemCatalog[productInModalWin].getImage() + "_" + "1" + "_.jpg";


}
/////////Функция добавления товара в корзину//////////////////
function AddItemToBasket(ProductItemId) {
    let str = ProductItemId.split("_");
    busket1.addItemProduct(productItemCatalog[Number(str[1])]);
    reconstructBasketZone();
}
//////////////Генерация разметки и содержания корзины/////////////
function reconstructBasketZone() {
    //Генерация разметки и содержания корзины
    let divWorkZone = document.querySelector(".Commentdiv");
    if (divWorkZone != null) {
        divWorkZone.className = "basketdiv";
    }
    document.getElementById("basketFooterText").parentNode.innerHTML = "<p id=basketFooterText>Корзина пуста</p>"
    for (let index = 0; index < busket1.productItemNamesInBasket.length; index++) {
        let newProductdiv = document.createElement("div");
        newProductdiv.className = "newProductdiv";
        let button_dec = `<button class=btn_ProductCountDec id=btn_ProductCountDec_${ index } >-</button>`;
        let button_inc = `<button class=btn_ProductCountInc  id=btn_ProductCountInc_${ index } >+</button>`;
        newProductdiv.innerHTML = `<table><tr><td>${ busket1.productItemNamesInBasket[index] } </td><td> ${ button_dec } ${ busket1.productItemNamesCountsInBasket[index] }  ${ button_inc } </td><td> ${ busket1.productItemNamesTotalPrice[index] }</td></tr></table>`;
        document.getElementById("basketFooterText").parentNode.insertBefore(newProductdiv, document.getElementById("basketFooterText"));
        createIncDecButtonEvents(index);
    }
    //Футер
    if (busket1.isBasketEmpty()) {
        document.getElementById("basketFooterText").innerHTML = "<p id=basketFooterText>Корзина пуста</p>"
    } else {
        document.getElementById("basketFooterText").innerHTML = `<p id=basketFooterText>В корзине: ${busket1.getNumberOfProductItemsInBasket()} товаров на сумму ${busket1.estimateBasketPrice()} рублей</p>`;
    }
}
//////////////Генерации зоны адрес доставки/////////////
function constructAddressZone() {
    let divWorkZone = document.querySelector(".basketdiv");
    divWorkZone.className = "Adressdiv";
    document.getElementById("basketFooterText").parentNode.innerHTML = "<p id=basketFooterText><input value=Адрес доставки  ></p>";
}
//////////////Генерации зоны комментария/////////////
function construcCommentsZone() {
    let divWorkZone = document.querySelector(".Adressdiv");
    divWorkZone.className = "Commentdiv";
    document.getElementById("basketFooterText").parentNode.innerHTML = "<p id=basketFooterText><input value=Комментарий ></p>";
}
/////////Кнопки инкремента/декремента товара//////////////////
function createIncDecButtonEvents(index) {
    let btn_ProductCountDec = document.querySelector("#btn_ProductCountDec_" + index);
    btn_ProductCountDec.addEventListener("click", function (e) {
        let idParse = (e.currentTarget.id).split("_");
        busket1.decrementProductItemCountsByNamesInBasket(Number(idParse[2]));
        reconstructBasketZone();
    }, false);
    let btn_ProductCountInc = document.querySelector("#btn_ProductCountInc_" + index);
    btn_ProductCountInc.addEventListener("click", function (e) {
        let idParse = (e.currentTarget.id).split("_");
        busket1.incrementProductItemCountsByNamesInBasket(Number(idParse[2]));
        reconstructBasketZone();
    }, false);
}
/////////Функция генерации каталога///////////////////////////
function constructCatalogZone() {
    let baseDiv = document.querySelector('.task2_3_div');
    let catalog = document.createElement("div");
    catalog.className = "catalog";
    baseDiv.appendChild(catalog);
    //Events
    productItemCatalog.forEach(function (item, i, productItemCatalog) {
        constructProductArea(catalog, item, i);
        //EventL
        let button = document.getElementById("ProductItem_" + i).addEventListener("click", function (e) {
            AddItemToBasket(e.target.id);
        }, false);
        document.getElementById("productItemImageZone_" + i).addEventListener("click", function (e) {
            constructModalWindow(e.currentTarget.id);
        }, false);
    });
    //Разметка
    let basketdiv = document.createElement("div"),
        basketdivFooter = document.createElement("div"),
        btnNextZone = document.createElement("div");
    basketdiv.className = "basketdiv";
    baseDiv.className = "baseDiv";
    basketdivFooter.innerHTML = "<p id=basketFooterText>Корзина пуста</p>"
    btnNextZone.innerHTML = "<button id=btnNext >Далее</button>"
    baseDiv.appendChild(basketdiv);
    basketdiv.appendChild(basketdivFooter);
    basketdiv.appendChild(btnNextZone);
    //Переключение div
    document.querySelector("#btnNext").addEventListener("click", function (e) {
        if (document.querySelector("div.baseDiv div.basketdiv") != null) {
            constructAddressZone();
            return;
        }
        if (document.querySelector("div.baseDiv div.Adressdiv") != null) {
            construcCommentsZone();
            return;
        }
        if (document.querySelector("div.baseDiv div.Commentdiv") != null) {
            reconstructBasketZone();
            return;
        }
    });
    /*При клике, меняем изображение*/
    let imgTag = document.getElementById("ModalWindowImg");
    imgTag.addEventListener("click", function (e) {
        let baseImgName = imgTag.src.split("_");
        let ImgNumber = Number(baseImgName[1]);
        if (ImgNumber >= 2) {
            imgTag.src = productItemCatalog[productInModalWin].getImage() + "_" + "1" + "_.jpg";
        } else {
            ImgNumber++;
            imgTag.src = productItemCatalog[productInModalWin].getImage() + "_" + ImgNumber + "_.jpg";
        }
    }, false);

}

//////////////////////////////////////
document.addEventListener("DOMContentLoaded", constructCatalogZone);
