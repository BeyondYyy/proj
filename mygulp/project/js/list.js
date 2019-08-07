;(function(){
    "use strict"
    class List{
        constructor(){
            this.cont = document.querySelector("main");
            this.url = "http://localhost/mygulp/project/data/goods.json";
            this.em = document.querySelector("header .right em")
            this.load();
            // 1.绑定事件
            this.addEvent();
            this.n = JSON.parse(getCookie("goods")).length;
            this.em.innerHTML=JSON.parse(getCookie("goods")).length;

        }
        addEvent(){
            var that = this;
            // 利用事件委托找到按钮
            this.cont.addEventListener("click",function(eve){
                if(eve.target.className == "btn"){
                    // 存cookie，存什么？2.唯一的信息，商品的货号
                    that.id = eve.target.parentNode.getAttribute("qwe");
                    // 3.存cookie了
                    that.setCookie();
                }
                that.n++;
                that.em.innerHTML = that.n;
            })
        }
        setCookie(){
            this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
            if(this.goods.length == 0){
                // 第一次:直接写数组,数组中放一个对象
                this.goods.push({
                    id:this.id,
                    num:1
                })
            }else{
                // 之后存:新商品和老商品
                // 先遍历,比较
                var i = 0;
                var onoff = this.goods.some((val,index)=>{
                    i = index;
                    return val.id == this.id;
                })
                if(onoff){
                    // 老商品:
                    // 修改对应对象的num属性
                    this.goods[i].num++
                }else{
                    // 新商品:
                    // 增加对象
                    this.goods.push({
                        id:this.id,
                        num:1
                    })
                }
            }
            // 再设置
            setCookie("goods",JSON.stringify(this.goods));
        }
        load(){
            var that = this;
            ajaxGet(this.url,function(res){
                that.res = JSON.parse(res);
                that.display();
                //懒加载
                that.aimg = document.querySelectorAll("img");
                that.arr = Array.from(that.aimg);
                that.t;
                that.lazy();
                var _that = that;
                onload = onscroll = function(){
                    clearTimeout(_that.t);
                    var __that = _that
                    that.t = setTimeout(function(){
                        __that.lazy();
                    },100)
                }
            })
        }
        display(){
            // console.log(this.res);
            var str = "";
            this.res.forEach((val)=>{
                str += `<div class="box" qwe="${val.goodsId}">
                            <a href="info.html"><img ljz="${val.url}" alt=""></a>
                            <a href="info.html" class="aa">${val.tip}</a>
                            <b>${val.price}</b>
                            <span class="btn">加入购物车</span>
                        </div>`
            })
            this.cont.innerHTML = str;
        }
        lazy(){
            this.scrollT = document.documentElement.scrollTop;
            this.clientH = document.documentElement.clientHeight;
            
            for(var i=0;i<this.arr.length;i++){
                // console.log(`i:${i}`);
                if(this.arr[i].offsetTop - this.scrollT < this.clientH){
                    this.arr[i].src = this.arr[i].getAttribute("ljz");
                    // 小心使用：在循环中修改了循环次数
                    this.arr.splice(i,1)
                }
            }
        }

    }
    new List;

})();