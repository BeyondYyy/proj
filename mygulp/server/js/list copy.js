"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

;(function () {
    "use strict";

    define(function () {
        var List = function () {
            function List() {
                _classCallCheck(this, List);

                this.cont = document.querySelector("main");
                this.url = "http://localhost/mygulp/project/data/goods.json";
                this.em = document.querySelector("header .right em");
                this.load();
                // 1.绑定事件
                this.addEvent();
                this.n = JSON.parse(getCookie("goods")).length;
                this.em.innerHTML = JSON.parse(getCookie("goods")).length;
                this.cont2 = document.querySelector(".cont2");
                this.up = document.querySelector(".up");
                this.down = document.querySelector(".down");
                this.num = 15;
                this.index = 0;
                this.pageEvent();
            }

            _createClass(List, [{
                key: "addEvent",
                value: function addEvent() {
                    var that = this;
                    // 利用事件委托找到按钮
                    this.cont.addEventListener("click", function (eve) {
                        if (eve.target.className == "btn") {
                            that.id = eve.target.parentNode.getAttribute("qwe");
                            that.setCookie();
                        }
                        that.n++;
                        that.em.innerHTML = that.n;
                    });
                }
            }, {
                key: "setCookie",
                value: function (_setCookie) {
                    function setCookie() {
                        return _setCookie.apply(this, arguments);
                    }

                    setCookie.toString = function () {
                        return _setCookie.toString();
                    };

                    return setCookie;
                }(function () {
                    var _this = this;

                    this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
                    if (this.goods.length == 0) {
                        this.goods.push({
                            id: this.id,
                            num: 1
                        });
                    } else {
                        var i = 0;
                        var onoff = this.goods.some(function (val, index) {
                            i = index;
                            return val.id == _this.id;
                        });
                        if (onoff) {
                            this.goods[i].num++;
                        } else {
                            this.goods.push({
                                id: this.id,
                                num: 1
                            });
                        }
                    }
                    setCookie("goods", JSON.stringify(this.goods));
                })
            }, {
                key: "load",
                value: function load() {
                    var that = this;
                    ajaxGet(this.url, function (res) {
                        that.res = JSON.parse(res);
                        that.display();
                        //懒加载
                        that.aimg = document.querySelectorAll("img");
                        // console.log(that.aimg)
                        that.arr = Array.from(that.aimg);
                        that.t;
                        that.lazy();
                        var _that = that;
                        onload = onscroll = function onscroll() {
                            clearTimeout(_that.t);
                            var __that = _that;
                            that.t = setTimeout(function () {
                                __that.lazy();
                            }, 100);
                        };
                        that.creatPage();
                    });
                }
            }, {
                key: "display",
                value: function display() {
                    // console.log(this.res);
                    var str = "";

                    // this.res.forEach((val)=>{
                    //     str += `<div class="box" qwe="${val.goodsId}">
                    //                 <a href="info.html?${val.goodsId}"><img ljz="${val.url}" alt=""></a>
                    //                 <a href="info.html" class="aa">${val.tip}</a>
                    //                 <b>${val.price}</b>
                    //                 <span class="btn">加入购物车</span>
                    //             </div>`
                    // })
                    for (var i = this.index * this.num; i < (this.index + 1) * this.num; i++) {
                        if (i < this.res.length) {
                            // console.log(this.res);
                            str += "<div class=\"box\" qwe=\"" + this.res[i].goodsId + "\">\n                        <a href=\"info.html?" + this.res[i].goodsId + "\"><img ljz=\"" + this.res[i].url + "\" alt=\"\"></a>\n                        <a href=\"info.html\" class=\"aa\">" + this.res[i].tip + "</a>\n                        <b>" + this.res[i].price + "</b>\n                        <span class=\"btn\">\u52A0\u5165\u8D2D\u7269\u8F66</span>\n                    </div>";
                        }
                    }
                    // console.log(str)
                    this.cont.innerHTML = str;
                }
            }, {
                key: "creatPage",
                value: function creatPage() {
                    this.maxNum = Math.ceil(this.res.length / this.num);
                    var str = "";
                    for (var i = 0; i < this.maxNum; i++) {
                        str += "<li class=\"page-item\"><a class=\"page-link\" href=\"#\">" + (i + 1) + "</a></li>";
                    }
                    // console.log(str)
                    this.cont2.innerHTML = str;
                    // console.log(str)
                    this.setActive();
                }
            }, {
                key: "setActive",
                value: function setActive() {
                    // console.log(this.cont2.children.length)
                    for (var i = 0; i < this.cont2.children.length; i++) {
                        this.cont2.children[i].className = "";
                    }
                    // console.log(this.index)
                    this.cont2.children[this.index].className = "active";
                }
            }, {
                key: "pageEvent",
                value: function pageEvent() {
                    var that = this;
                    this.up.onclick = function () {
                        that.changeIndex(0);
                    };
                    this.down.onclick = function () {
                        that.changeIndex(1);
                    };
                }
            }, {
                key: "changeIndex",
                value: function changeIndex(type) {
                    if (type == 0) {
                        if (this.index == 0) {
                            this.index = this.maxNum - 1;
                        } else {
                            this.index--;
                        }
                    } else {
                        if (this.index == this.maxNum - 1) {
                            this.index = 0;
                        } else {
                            this.index++;
                        }
                    }
                    this.setActive();
                    this.display();
                    this.aimg = document.querySelectorAll("img");
                    // console.log(that.aimg)
                    this.arr = Array.from(this.aimg);
                    this.t;
                    this.lazy();
                    var that = this;
                    onload = onscroll = function onscroll() {
                        clearTimeout(that.t);
                        var _that = that;
                        that.t = setTimeout(function () {
                            _that.lazy();
                        }, 100);
                    };
                }
            }, {
                key: "lazy",
                value: function lazy() {
                    this.scrollT = document.documentElement.scrollTop;
                    this.clientH = document.documentElement.clientHeight;

                    for (var i = 0; i < this.arr.length; i++) {
                        // console.log(`i:${i}`);
                        if (this.arr[i].offsetTop - this.scrollT < this.clientH) {
                            this.arr[i].src = this.arr[i].getAttribute("ljz");
                            this.arr.splice(i, 1);
                        }
                    }
                }
            }]);

            return List;
        }();

        return {
            name: "list"
        };
    });
})();