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
            this.cont2 = document.querySelector(".cont2");
            this.up = document.querySelector(".up");
            this.down = document.querySelector(".down")
            this.num = 15;
            this.index = 0;
            this.pageEvent();
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
                //分页
                //懒加载
                that.aimg = document.querySelectorAll("img");
                // console.log(that.aimg)
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
                that.creatPage();
                
            })
        }

        display(){
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
            for(var i = this.index*this.num;i<(this.index+1)*this.num;i++){
                if(i < this.res.length){
                    // console.log(this.res);
                str += `<div class="box" qwe="${this.res[i].goodsId}">
                        <a href="info.html?${this.res[i].goodsId}"><img ljz="${this.res[i].url}" alt=""></a>
                        <a href="info.html" class="aa">${this.res[i].tip}</a>
                        <b>${this.res[i].price}</b>
                        <span class="btn">加入购物车</span>
                    </div>`
                    }
                }
                // console.log(str)
                this.cont.innerHTML = str;
        }
        creatPage(){
            this.maxNum = Math.ceil(this.res.length / this.num);
            var str = "";
            for(var i = 0;i < this.maxNum;i++){
                str += `<li class="page-item"><a class="page-link" href="#">${i+1}</a></li>`
            }
            // console.log(str)
            this.cont2.innerHTML = str;
            console.log(str)
            this.setActive();
        }
        setActive(){
            console.log(this.cont2.children.length)
            for(var i = 0;i < this.cont2.children.length;i++){
                this.cont2.children[i].className = "";
            }
            console.log(this.index)
            this.cont2.children[this.index].className = "active";
        }
        pageEvent(){
            var that = this;
            this.up.onclick = function(){
                that.changeIndex(0);
            }
            this.down.onclick = function(){
                that.changeIndex(1);
            }
        }
        changeIndex(type){
            if(type == 0){
                if(this.index == 0){
                    this.index = this.maxNum-1;
                }else{
                    this.index--;
                }
            }else{
                if(this.index == this.maxNum-1){
                    this.index = 0
                }else{
                    this.index++;
                }
            }
            this.setActive();
            this.display();
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