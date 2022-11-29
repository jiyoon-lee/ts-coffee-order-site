"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (element) {
    var listItems = element.parentElement.querySelectorAll('li');
    var currentIndex = Array.prototype.slice
        .call(listItems)
        .findIndex(function (listItem) { return listItem === element; }); //findIndex : 주어진 판별 함수를 만족하는 배열의 첫 번째 요소에 대한 인덱스를 반환
    return currentIndex;
});
