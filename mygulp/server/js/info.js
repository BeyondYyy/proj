"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

;(function () {
    "use strict";

    var Magnifier = function () {
        function Magnifier() {
            _classCallCheck(this, Magnifier);

            this.photo = document.querySelector(".BBox");
            // this.bImg = this.bBox.children[0];
            console.log(this.photo);
            // console.log(this.bImg)
            this.url = "http://localhost/mygulp/project/data/goods.json";
            // console.log(this.url)
            // this.addEvent();
            this.search = location.search.substr(1, 2);
            // console.log(this.search)
            this.load();
        }

        _createClass(Magnifier, [{
            key: "load",
            value: function load() {
                var that = this;
                ajaxGet(this.url, function (res) {
                    // console.log(that.res)
                    that.res = JSON.parse(res);
                    that.display();
                    that.change = document.querySelector(".change");
                    that.change2 = document.querySelector(".change2");
                    that.a = document.querySelectorAll(".middle a")[1];
                    console.log(that.a);
                    // console.log(that.change)
                    var _that = that;

                    if (that.a.className.includes("change")) {
                        that.change.onfocus = function () {
                            _that.changeDisplay();
                        };
                    } else {
                        that.change2.onfocus = function () {
                            _that.display();
                        };
                    }
                });
            }
        }, {
            key: "display",
            value: function display() {
                var str = "";
                // this.res.forEach(resval => {
                //     if(resval.goodsId == this.search){
                //         str += `
                //             <div class="s_box" qwe="${resval.goodsId}">
                //                 <img src="${resval.url}">
                //             </div>
                //             <div class="b_box" qwe="${resval.goodsId}">
                //                 <img src="${resval.url}">
                //             </div>
                //             <div class="middle" qwe="${resval.goodsId}">
                //             <a href=""><img src="${resval.url}" alt=""></a>
                //             <a href=""><img src="${resval.url}" alt=""></a>
                //         </div>
                //         `
                //     }
                // });
                for (var i = 0; i < this.res.length; i++) {
                    if (this.res[i].goodsId == this.search) {
                        str += "\n                        <div class=\"s_box\" qwe=\"" + this.res[i].goodsId + "\">\n                            <img src=\"" + this.res[i].url + "\">\n                        </div>\n                        <div class=\"b_box\" qwe=\"" + this.res[i].goodsId + "\">\n                            <img src=\"" + this.res[i].url + "\">\n                        </div>\n                        <div class=\"middle\" qwe=\"" + this.res[i].goodsId + "\">\n                        <a href=\"\" class=\"change2\"><img src=\"" + this.res[i].url + "\" alt=\"\"></a>\n                        <a href=\"\" class=\"change\"><img src=\"" + this.res[i + 1].url + "\" alt=\"\"></a>\n                    </div>\n                    ";
                    }
                }
                this.photo.innerHTML = str;
                // console.log(str)
                this.sBox = document.querySelector(".s_box");
                this.bBox = document.querySelector(".b_box");
                this.bImg = this.bBox.children[0];
                this.addEvent();
            }
        }, {
            key: "changeDisplay",
            value: function changeDisplay() {
                var str = "";
                for (var i = 0; i < this.res.length; i++) {
                    if (this.res[i].goodsId == this.search) {
                        str += "\n                        <div class=\"s_box\" qwe=\"" + this.res[i + 1].goodsId + "\">\n                            <img src=\"" + this.res[i + 1].url + "\">\n                        </div>\n                        <div class=\"b_box\" qwe=\"" + this.res[i + 1].goodsId + "\">\n                            <img src=\"" + this.res[i + 1].url + "\">\n                        </div>\n                        <div class=\"middle\" qwe=\"" + this.res[i].goodsId + "\">\n                        <a href=\"##\"><img src=\"" + this.res[i].url + "\" alt=\"\"></a>\n                        <a href=\"##\" class=\"change\"><img src=\"" + this.res[i + 1].url + "\" alt=\"\"></a>\n                    </div>\n                    ";
                    }
                }
                this.photo.innerHTML = str;
                // console.log(str)
                this.sBox = document.querySelector(".s_box");
                this.bBox = document.querySelector(".b_box");
                this.bImg = this.bBox.children[0];
                this.addEvent();
            }
        }, {
            key: "addEvent",
            value: function addEvent() {
                var that = this;
                this.sBox.onmouseenter = function () {
                    that.show();
                };
                this.sBox.onmouseleave = function () {
                    that.hide();
                };
                this.sBox.onmousemove = function (eve) {
                    var e = eve || window.event;
                    that.move(e);
                };
            }
        }, {
            key: "show",
            value: function show() {
                this.bBox.style.display = "block";
                if (!this.span) {
                    this.span = document.createElement("span");
                    var w = this.bBox.offsetWidth / this.bImg.offsetWidth * this.sBox.offsetWidth;
                    var h = this.bBox.offsetHeight / this.bImg.offsetHeight * this.sBox.offsetHeight;

                    this.span.style.cssText = "width:" + w + "px;height:" + h + "px;background:rgba(200,200,200,0.6);position:absolute;left:0;top:0;";
                    this.sBox.appendChild(this.span);
                }

                this.span.style.display = "block";
            }
        }, {
            key: "hide",
            value: function hide() {
                this.span.style.display = "none";
                this.bBox.style.display = "none";
            }
        }, {
            key: "move",
            value: function move(e) {
                var l = e.pageX - this.sBox.offsetLeft - this.span.offsetWidth / 2;
                var t = e.pageY - this.sBox.offsetTop - this.span.offsetHeight / 2;

                if (l < 0) l = 0;
                if (t < 0) t = 0;
                if (l > this.sBox.offsetWidth - this.span.offsetWidth) {
                    l = this.sBox.offsetWidth - this.span.offsetWidth;
                }
                if (t > this.sBox.offsetHeight - this.span.offsetHeight) {
                    t = this.sBox.offsetHeight - this.span.offsetHeight;
                }
                this.span.style.left = l + "px";
                this.span.style.top = t + "px";

                var x = l / (this.sBox.offsetWidth - this.span.offsetWidth);
                var y = t / (this.sBox.offsetHeight - this.span.offsetHeight);

                this.bImg.style.left = -x * (this.bImg.offsetWidth - this.bBox.offsetWidth) + "px";
                this.bImg.style.top = -y * (this.bImg.offsetHeight - this.bBox.offsetHeight) + "px";
            }
        }]);

        return Magnifier;
    }();

    new Magnifier();
})();