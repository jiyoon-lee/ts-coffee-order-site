"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_js_1 = require("../utils/index.js");
var ProductDetail = /** @class */ (function () {
    function ProductDetail(productId) {
        if (!productId) {
            alert('Can not initialize productId, need productId!');
            return;
        }
        this.productId = productId;
        this.selectedOptions = [];
        this.renderElement = ProductDetail.createRenderElement();
        this.bindEvents();
    }
    ProductDetail.createRenderElement = function () {
        var renderElement = document.createElement('div');
        renderElement.classList.add('ProductDetailPage');
        return renderElement;
    };
    ProductDetail.prototype.saveStorage = function () {
        var _this = this;
        try {
            var products_cart = this.selectedOptions.map(function (item) { return ({
                imageUrl: _this.product.imageUrl,
                productName: _this.product.name,
                price: _this.product.price + item.price,
                totalPrice: (_this.product.price + item.price) * item.quantity,
                optionName: item.name,
                quantity: item.quantity,
            }); });
            localStorage.setItem('products_cart', JSON.stringify(products_cart));
        }
        catch (e) {
            console.error(e);
        }
    };
    ProductDetail.prototype.bindEvents = function () {
        var _this = this;
        this.renderElement.addEventListener('click', function (e) {
            if (e.currentTarget.tagName === 'BUTTON') {
                _this.saveStorage();
                location.href = '/cart';
            }
        });
        this.renderElement.addEventListener('input', function (e) {
            if (e.target.tagName === 'SELECT') {
                var productOptions = _this.product.productOptions;
                // 이미 선택된 상품인지 아닌지 확인한다.
                var isPossibleSelect = _this.selectedOptions.find(function (item) { return item.id === Number(e.target.value); });
                if (!isPossibleSelect) {
                    var targetOption = productOptions.find(function (item) { return item.id === Number(e.target.value); });
                    targetOption.quantity = 1;
                    _this.selectedOptions.push(targetOption);
                    var $selectedList = document.querySelector('ul');
                    var $listItem = document.createElement('li');
                    $selectedList.appendChild($listItem);
                    var optionsText = "".concat(_this.product.name, " ").concat(targetOption.name);
                    optionsText +=
                        targetOption.price > 0
                            ? "".concat((0, index_js_1.numberWithCommas)(_this.product.price + targetOption.price), "\uC6D0")
                            : "".concat((0, index_js_1.numberWithCommas)(_this.product.price), "\uC6D0");
                    $listItem.textContent = optionsText;
                    $selectedList.appendChild($listItem);
                    var $inputWrapper = document.createElement('div');
                    var $inputElement = document.createElement('input');
                    $inputWrapper.appendChild($inputElement);
                    $listItem.appendChild($inputWrapper);
                    $inputElement.setAttribute('type', 'number');
                    $inputElement.setAttribute('min', '1');
                    $inputElement.setAttribute('max', targetOption.stock.toString());
                    $inputElement.setAttribute('value', '1');
                }
            }
            if (e.target.tagName === 'INPUT') {
                if (Number(e.target.value) > 0) {
                    var element = (0, index_js_1.getClosestElement)(e.target, 'li');
                    var index = (0, index_js_1.findIndexListElement)(element);
                    var productList = _this.renderElement.querySelectorAll('li');
                    var replaceElement = document.createElement('div');
                    var targetOption = _this.selectedOptions[index];
                    _this.selectedOptions[index].quantity = Number(e.target.value);
                    replaceElement.textContent = "".concat(_this.product.name, " ").concat(targetOption.name, " ").concat((0, index_js_1.numberWithCommas)((targetOption.price + _this.product.price) *
                        Number(e.target.value)), "\uC6D0");
                    productList[index].replaceChild(replaceElement, productList[index].childNodes[0]);
                }
            }
            _this.calcTotalPrice();
        });
    };
    ProductDetail.prototype.calcTotalPrice = function () {
        var _this = this;
        var $totalPrice = document.querySelector('.ProductDetail__totalPrice');
        var total = 0;
        this.selectedOptions.forEach(function (item) {
            total += (_this.product.price + item.price) * (item.quantity || 1);
        });
        $totalPrice.textContent = "".concat((0, index_js_1.numberWithCommas)(total), "\uC6D0");
    };
    ProductDetail.prototype.optionToString = function (productName, productOption) {
        var result = "";
        result +=
            productOption.stock === 0
                ? "<option value=".concat(productOption.id, " disabled> (\uD488\uC808) ").concat(productName, " ").concat(productOption.name)
                : "<option value=".concat(productOption.id, ">").concat(productName, " ").concat(productOption.name);
        result +=
            productOption.price > 0
                ? " (+".concat((0, index_js_1.numberWithCommas)(productOption.price), ")")
                : '';
        result += "</option>";
        return result;
    };
    ProductDetail.prototype.render = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, imageUrl, name, price, productOptions, $title, $detail;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, (0, index_js_1.Request)("/src/assets/products/item".concat(this.productId, ".json"))];
                    case 1:
                        _a.product = _c.sent();
                        _b = this.product, imageUrl = _b.imageUrl, name = _b.name, price = _b.price, productOptions = _b.productOptions;
                        $title = document.createElement('h1');
                        $title.textContent = "".concat(name, " \uC0C1\uD488 \uC815\uBCF4");
                        $detail = document.createElement('div');
                        $detail.classList.add('ProductDetail');
                        this.renderElement.append($title, $detail);
                        $detail.innerHTML = "\n      <img src=\"".concat(imageUrl, "\">\n      <div class=\"ProductDetail__info\">\n        <h2>").concat(name, "</h2>\n        <div class=\"ProductDetail__price\">").concat((0, index_js_1.numberWithCommas)(price), "\uC6D0</div>\n        <select>\n          <option>\uC120\uD0DD\uD558\uC138\uC694.</option>\n          ").concat(productOptions.map(function (productOption) {
                            return "".concat(_this.optionToString(name, productOption));
                        }), "\n        </select>\n        <div class=\"ProductDetail__selectedOptions\">\n          <h3>\uC120\uD0DD\uB41C \uC0C1\uD488</h3>\n          <ul></ul>\n          <div class=\"ProductDetail__totalPrice\">0\uC6D0</div>\n          <button class=\"OrderButton\">\uC8FC\uBB38\uD558\uAE30</button>\n        </div>\n      </div>\n    ");
                        return [2 /*return*/, this.renderElement];
                }
            });
        });
    };
    return ProductDetail;
}());
exports.default = ProductDetail;
