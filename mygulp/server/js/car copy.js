"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

;(function () {
    "use strict";

    define(function () {
        var Car = function () {
            function Car() {
                _classCallCheck(this, Car);

                this.tbody = document.querySelector("tbody");
                // console.log(this.tbody)
                this.url = "http://localhost/mygulp/project/data/goods.json";
                console.log(this.url);
                this.load();
                this.addEvent();
                //购物车数量
                this.em = document.querySelector("header .right em");
                this.n = JSON.parse(getCookie("goods")).length;
                this.em.innerHTML = this.n;
            }

            _createClass(Car, [{
                key: "addEvent",
                value: function addEvent() {
                    var that = this;
                    this.tbody.addEventListener("click", function (eve) {
                        if (eve.target.className == "del") {
                            that.id = eve.target.parentNode.getAttribute("index");
                            eve.target.parentNode.remove();
                            that.changeCookie(function (i) {
                                that.goods.splice(i, 1);
                            });
                            this.n--;
                            history.go(0);
                        }
                    });
                    this.tbody.addEventListener("input", function (eve) {
                        if (eve.target.className == "num") {
                            that.id = eve.target.parentNode.parentNode.getAttribute("index");
                            that.changeCookie(function (i) {
                                that.goods[i].num = eve.target.value;
                            });
                        }
                    });
                }
            }, {
                key: "changeCookie",
                value: function changeCookie(callback) {
                    var _this = this;

                    var i = 0;
                    this.goods.some(function (val, index) {
                        i = index;
                        return val.id == _this.id;
                    });
                    callback(i);
                    setCookie("goods", JSON.stringify(this.goods));
                }
            }, {
                key: "load",
                value: function load() {
                    var that = this;
                    ajaxGet(this.url, function (res) {
                        that.res = JSON.parse(res);
                        that.getCookie();
                    });
                }
            }, {
                key: "getCookie",
                value: function (_getCookie) {
                    function getCookie() {
                        return _getCookie.apply(this, arguments);
                    }

                    getCookie.toString = function () {
                        return _getCookie.toString();
                    };

                    return getCookie;
                }(function () {
                    this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
                    this.display();
                })
            }, {
                key: "display",
                value: function display() {
                    var _this2 = this;

                    var str = "";
                    this.res.forEach(function (resVal) {
                        _this2.goods.forEach(function (goodsVal) {
                            if (resVal.goodsId == goodsVal.id) {
                                var p = resVal.price.split("").splice(1).join("");
                                var p1 = p.replace(",", "");
                                var n = goodsVal.num;
                                var sum = p1 * n;
                                if (sum.toString().length == 4) {
                                    var sum = sum.toString().split("");
                                    sum.splice(1, 0, ",");
                                    sum = sum.join("");
                                } else if (sum.toString().length == 5) {
                                    var sum = sum.toString().split("");
                                    sum.splice(2, 0, ",");
                                    sum = sum.join("");
                                } else {
                                    sum = sum;
                                }
                                str += "<tr index=\"" + resVal.goodsId + "\">\n                                        <td class=\"t1\">\n                                            <a href=\"##\" class=\"img\"><img src=\"" + resVal.url + "\"></a>\n                                            <b>" + resVal.tip + "</b>\n                                        </td>\n                                        <td class=\"t2\">" + resVal.price + "</td>\n                                        <td><input class=\"num\" type=\"number\" value=\"" + goodsVal.num + "\" min=1></td>\n                                        <td class=\"count\">\uFFE5" + sum + ".00</td>\n                                        <td class=\"del\">\u5220\u9664</td>\n                                    </tr>";
                            }
                        });
                    });
                    this.tbody.innerHTML = str;
                }
            }]);

            return Car;
        }();

        return {
            name: "Car"
        };
    });
})();