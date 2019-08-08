;(function(){
    "use strict"
    class Login{
        constructor(){
            this.url = "http://api.icodeilife.cn:81/user";
            this.user = $("#user");
            this.pass = $("#pass");
            this.btn = $("#btn");
            this.state = $("p span");
            this.addEvent();
        }
        addEvent(){
            var that = this;
            this.btn.click(function(){
                that.load()
            })
        }
        load(){
            $.ajax({
                url:this.url,
                data:{
                    type:"login",
                    user:this.user.val(),
                    pass:this.pass.val(),
                },
                success:(res)=>{
                    this.res = JSON.parse(res);
                    // console.log(res);
                    if(this.res.code == 2){
                        this.state.html("帐号密码不符，请<a href='login.html'>重新登录</a>")
                    }else if(this.res.code == 1){
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
            console.log(this.res.msg)
            localStorage.setItem("loginUser",JSON.stringify(this.res.msg));
        }
    }
    
    new Login();
})();