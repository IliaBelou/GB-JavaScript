//autor - Белоусов И.
/*Урок4 - Задание 1 -  Написать функцию, преобразующую число в объект. Передавая на вход число от 0 до 999, мы должны получить на выходе объект, 
в котором в соответствующих свойствах описаны единицы, десятки и сотни. Например, для числа 245 мы должны получить следующий объект: {‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}. 
Если число превышает 999, необходимо выдать соответствующее сообщение с помощью console.log и вернуть пустой объект.
 */
"use strict";

console.log(numberDecomposition(prompt("Введите число", "654")));

function numberDecomposition(number) {
    if (number > 999) {
        console.log("incorrectArg");
        return null;
    }
    let nmDecompObj = {
        units: 0,
        dozens: 0,
        hundreds: 0,

        numDecomp(numberToDecomp) {
            let remainder = number;
            this.hundreds = (remainder / 100 < 1) ? (0) : ((remainder - remainder % 100) / 100);
            remainder = remainder % 100;
            this.dozens = (remainder / 10 < 1) ? (0) : ((remainder - remainder % 10) / 10);
            remainder = remainder % 10;
            this.units = (remainder / 1 < 1) ? (0) : ((remainder - remainder % 1) / 1);
        }
    }
    nmDecompObj.numDecomp(number);
    return nmDecompObj;
}

/*Урок4 - Задание 2 -  2. Продолжить работу с интернет-магазином:
a.В прошлом домашнем задании вы реализовали корзину на базе массивов. Какими объектами можно заменить их элементы?
b.Реализуйте такие объекты.
c.Перенести функционал подсчета корзины на объектно-ориентированную базу.
 */
class ProductItem {
    //private properties
    #nameStr = "defaultName"
    #priceValue = "defaultPrice"
    //Constructor
    constructor(name, price) {
        this.#nameStr = name;
        this.#priceValue = price;
    }
    //Getters,Setters
    getName() {
        return this.#nameStr
    }
    setName(name) {
        if (name === '') {
            console.log('Название товара не может быть пустым');
        } else {
            this.#nameStr = name
        }
    }
    getPrice() {
        return this.#priceValue
    }
    setPrice(price) {
        if (price <= 0) {
            console.log('Стоимость товара должна быть больше нуля');
        } else {
            this.#priceValue = price
        }
    }
}
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
            console.log('Название корзины не может быть пустым');
        } else {
            this.#nameStr = name
        }
    }
    //methods
    isBasketFull() {
        return this.getNumberOfProductItemsInBasket() >= this.getMaxProductItemsInBasket() ? true : false;
    }
    addItemProduct(ProductItem) {
        if (this.isBasketFull()) {
            console.log(this.getName() + " Заполнена");
        } else {
            this.#productItemsInBasketArr.push(ProductItem);
            this.#productItemsInBasket++;
        }
    }
    estimateBasketPrice() {
        let totalPrice = 0;
        this.#productItemsInBasketArr.forEach(function (ProductItem, i, productItemsInBasketArr) {
            totalPrice += ProductItem.getPrice();
        });
        return totalPrice;
    }
}

let busket1 = new Basket(100, "Корзина 1");

alert("Расчет стоимости товаров");
let yesOrNo = "Да";
while (yesOrNo === "Да") {
    let resultStrArr = prompt("Введите наименование товара и стоимость", ("Товар" + busket1.getNumberOfProductItemsInBasket()) + " 50").split(' ');
    if (resultStrArr.length >= 2) {
        busket1.addItemProduct(new ProductItem(resultStrArr[0], Number(resultStrArr[1])));
    } else {
        alert("Некорректный ввод");
    }
    yesOrNo = prompt("Продолжить ввод товаров? Да/Нет", "Да");
}
alert(busket1.estimateBasketPrice());
