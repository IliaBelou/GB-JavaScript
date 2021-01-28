//autor - Белоусов И.
/*Урок3 - Задание 1 -  С помощью цикла while вывести все простые числа в промежутке от 0 до 100.
 */
"use strict";

let i = 0;
while (i < 101) {
    console.log(i++);
}
/*Урок3 - Задание 2 
Предположим, есть сущность корзины. Нужно реализовать функционал подсчета стоимости корзины в зависимости от находящихся в ней товаров. Товары в корзине хранятся в массиве. Задачи:
a) Организовать такой массив для хранения товаров в корзине;
b) Организовать функцию countBasketPrice, которая будет считать стоимость корзины.
*/

let productItem = {
    name: "defaultItemName",
    price: "defaultItemPrice"
}
let basket = [],
    basketSize = 100,
    itemsInBasket = 0,
    basketTotalPrice = 0;
let yesOrNo = "Да";

function addProductItemToBasket(productItem) {
    if (itemsInBasket < basketSize) {
        basket.push(productItem);
    }
}

function countBasketPrice() {
    let price = 0;
    basket.forEach(function (productItem, i, basket) {
        price += productItem.price;
    });
    return price;
}

alert("Расчет стоимости товаров");
while (yesOrNo === "Да") {
    let resultStrArr = prompt("Введите наименование товара и стоимость", ("Товар" + itemsInBasket++)+" 50").split(' ');
    if (resultStrArr.length >= 2) {
        productItem.name = resultStrArr[0];
        productItem.price = Number(resultStrArr[1]);
        addProductItemToBasket(productItem); }
    else {
        alert("Некорректный ввод");
    }
    yesOrNo = prompt("Продолжить ввод товаров? Да/Нет", "Да");
}
alert(basketTotalPrice = countBasketPrice());

/*Урок3 - Задание 3 
 *Вывести с помощью цикла for числа от 0 до 9, не используя тело цикла.
 */
for (i = 0; i < 10; console.log(i++)) {}

/*Урок3 - Задание 4 
*Нарисовать пирамиду с помощью console.log, как показано на рисунке, только у вашей пирамиды должно быть 20 рядов, а не 5:
x
xx
xxx
xxxx
xxxxx
*/
let logMsg = "";
for (i = 0; i < 20; i++) {
    logMsg += "x";
    console.log(logMsg);
    
}
