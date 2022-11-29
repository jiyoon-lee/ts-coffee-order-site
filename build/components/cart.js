"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_js_1 = require("../utils/index.js");
var Cart = /** @class */ (function () {
    function Cart() {
        this.totalPrice = 0;
        this.renderElement = Cart.createRenderElement();
        this.bindEvents();
        this.loadStorage();
    }
    Cart.createRenderElement = function () {
        var renderElement = document.createElement('div');
        renderElement.classList.add('CartPage');
        return renderElement;
    };
    Cart.prototype.loadStorage = function () {
        var _this = this;
        var data = localStorage.getItem('products_cart');
        try {
            this.cartItems = JSON.parse(data);
            if (Array.isArray(this.cartItems) && this.cartItems.length > 0) {
                this.cartItems.forEach(function (element) {
                    _this.totalPrice += element.totalPrice;
                });
            }
            else {
                alert('장바구니가 비어있습니다.');
                location.href = '/';
            }
        }
        catch (e) {
            console.error(e);
        }
    };
    Cart.prototype.bindEvents = function () {
        this.renderElement.addEventListener('click', function (e) {
            if (e.target.tagName === 'BUTTON') {
                alert('주문되었습니다');
                localStorage.removeItem('products_cart');
                location.href = '/';
            }
        });
    };
    Cart.prototype.render = function () {
        this.renderElement.innerHTML = "\n      <h1>\uC7A5\uBC14\uAD6C\uB2C8</h1>\n      <div class=\"Cart\">\n          <ul>\n            ".concat(this.cartItems
            .map(function (item) {
            return "\n                <li class=\"Cart__item\">\n                  <img src=\"".concat(item.imageUrl, "\">\n                  <div class=\"Cart__itemDesription\">\n                    <div>").concat(item.productName, " ").concat(item.optionName, " ").concat((0, index_js_1.numberWithCommas)(item.price), "\uC6D0 ").concat(item.quantity, "\uAC1C</div>\n                    <div>").concat((0, index_js_1.numberWithCommas)(item.totalPrice), "\uC6D0</div>\n                  </div>\n                </li>\n              ");
        })
            .join(''), "\n          </ul>\n          <div class=\"Cart__totalPrice\">\n              \uCD1D \uC0C1\uD488\uAC00\uACA9 ").concat((0, index_js_1.numberWithCommas)(this.totalPrice), "\uC6D0\n          </div>\n          <button class=\"OrderButton\">\uC8FC\uBB38\uD558\uAE30</button>\n      </div>\n    ");
        return this.renderElement;
    };
    return Cart;
}());
exports.default = Cart;
