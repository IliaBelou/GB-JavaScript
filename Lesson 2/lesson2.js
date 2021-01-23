//autor - Белоусов И.
/*Урок2 - Задание 3 -  Объявить две целочисленные переменные a и b и задать им произвольные начальные значения. Затем написать скрипт, который работает по следующему принципу:
если a и b положительные, вывести их разность;
если а и b отрицательные, вывести их произведение;
если а и b разных знаков, вывести их сумму; ноль можно считать положительным числом.
*/
"use strict";

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
let a = Math.floor(getRandomArbitrary(-50, 50));
let b = Math.floor(getRandomArbitrary(-50, 50));
if (a >= 0 && b >= 0) 
    alert(a + "," + b + "," + (a - b));
 else if (a < 0 && b < 0) 
    alert(a + "," + b + "," + (a * b));
 else {
    alert(a + "," + b + "," + (a + b));
}
/*Урок2 - Задание 4 - Присвоить переменной а значение в промежутке [0..15]. С помощью оператора switch организовать вывод чисел от a до 15.
 */
a = Math.floor(getRandomArbitrary(0, 15));
let str = '';
switch (a) {
    case 0 : str += a++;
    case 1 : str += a++; 
    case 2 : str += a++; 
    case 3 : str += a++;
    case 4 : str += a++;
    case 5 : str += a++;
    case 6 : str += a++;
    case 7 : str += a++;
    case 8 : str += a++;
    case 9 : str += a++;
    case 10 : str += a++;
    case 11 : str += a++;
    case 12 : str += a++;
    case 13 : str += a++;
    case 14 : str += a++;
    case 15 : str += a++;          
}
alert (str);
/*Урок2 - Задание 5 - Реализовать основные 4 арифметические операции в виде функций с двумя параметрами. Обязательно использовать оператор return.
 */
function addition(x, y) {
    return (x + y);
}

function subtraction(x, y) {
    return (x - y);
}

function division(x, y) {
    return (x / y);
}

function multiplication(x, y) {
    return (x * y);
}
alert(division(5,2));
/* Урок2 - Задание 6 Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation), где arg1, arg2 – значения аргументов, 
operation – строка с названием операции. В зависимости от переданного значения операции выполнить одну из 
арифметических операций (использовать функции из пункта 3) и вернуть полученное значение (использовать switch).*/
function mathOperation(arg1, arg2, operation) {
    switch (operation) {
        case "add":
            return addition(arg1, arg2);
        case "sub":
            return subtraction(arg1, arg2);
        case "div":
            return division(arg1, arg2);
        case "mul":
            return multiplication(arg1, arg2)
    }
}
    alert(mathOperation(5,10,"sub"));
/* Урок2 - Задание 8 С помощью рекурсии организовать функцию возведения числа в степень. Формат: function power(val, pow), где val – заданное число, pow – степень. */
function power(val, pow) {
    if (pow > 1) 
        val*=power(val,pow-1);
    return val;
}
alert(power(2,3));