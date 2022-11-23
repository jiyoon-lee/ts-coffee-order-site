"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_js_1 = require("./components/index.js");
var index_js_2 = require("./utils/index.js");
var App = /** @class */ (function () {
    function App(props) {
        var el = props.el;
        this.rootElementId = el;
    }
    App.prototype.setup = function () {
        var routes = {
            '/': index_js_1.ProductList,
            '/:id': index_js_1.ProductDetail,
            '/cart': index_js_1.Cart,
        };
        var router = new index_js_2.Router(routes);
        router.init(this.rootElementId);
    };
    return App;
}());
exports.default = App;
