;(function(){
    class Login{
        constructor(){
            // 登录的接口
            this.url = "http://api.icodeilife.cn:81/user";
            // 获取元素
            this.user = $("#user");
            this.pass = $("#pass");
            this.btn = $("#btn");
            this.state = $("p span");
            // 绑定点击事件
            this.addEvent();
        }
        addEvent(){
            var that = this;
            this.btn.click(function(){
                // 开启ajax
                that.load()
            })
        }
        load(){
            // 请求登录接口
            $.ajax({
                url:this.url,
                data:{
                    type:"login",
                    user:this.user.val(),
                    pass:this.pass.val(),
                },
                success:(res)=>{
                    // 请求成功之后，解析数据，根据数据的返回信息，决定不同的状态
                    this.res = JSON.parse(res);
                    // console.log(res);
                    if(this.res.code == 2){
                        this.state.html("帐号密码不符，请<a href='login.html'>重新登录</a>")
                    }else if(this.res.code == 1){
                        // 登录成功之后，存储状态
                        this.setState()
                        this.state.html("登录成功,5秒后跳转到<a href='index.html'>首页</a>");
                        setTimeout(() => {
                            location.href="index.html";
                        }, 5000);
                        console.log(res)
                    }else if(this.res.code == 0){
                        this.state.html("不存在该用户信息，请<a href='register.html'>注册</a>")
                    }
                }
            })
        }
        setState(){
            // 将当前登录成功后返回的用户信息作为登录成功的状态
            console.log(this.res.msg)
            localStorage.setItem("loginUser",JSON.stringify(this.res.msg));
        }
    }
    
    new Login();
})();