"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

;(function () {
    "use strict";

    var Login = function () {
        function Login() {
            _classCallCheck(this, Login);

            this.url = "http://api.icodeilife.cn:81/user";
            this.user = $("#user");
            this.pass = $("#pass");
            this.tel = $("#tel");
            this.email = $("#email");
            this.btn = $("#sub");
            this.state = $(".p7 span");
            this.addEvent();
        }

        _createClass(Login, [{
            key: "addEvent",
            value: function addEvent() {
                var that = this;
                this.btn.click(function () {
                    that.load();
                });
            }
        }, {
            key: "load",
            value: function load() {
                var _this = this;

                $.ajax({
                    url: this.url,
                    data: {
                        type: "register",
                        user: this.user.val(),
                        pass: this.pass.val(),
                        tel: this.tel.val(),
                        email: this.email.val()
                    },
                    success: function success(res) {
                        res = JSON.parse(res);
                        console.log(res);
                        console.log(res.code);
                        if (res.code == 0) {

                            _this.state.html("注册失败，请重新注册");
                        } else if (res.code == 1) {

                            _this.state.html("注册成功，5秒后跳转到<a href='login.html'>登录</a>");
                            setTimeout(function () {
                                location.href = "login.html";
                            }, 5000);
                        }
                    }
                });
            }
        }]);

        return Login;
    }();

    new Login();
})();