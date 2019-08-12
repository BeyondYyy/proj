;(function(){
    "use strict"
    class Car{
        constructor(){
            this.tbody = document.querySelector("tbody");
            // console.log(this.tbody)
            this.url = "http://localhost/mygulp2/project/data/goods.json";
            console.log(this.url)
            this.load();
            this.addEvent()
            //购物车数量
            this.em = document.querySelector("header .right em")
            this.n = JSON.parse(getCookie("goods")).length;
            this.em.innerHTML = this.n;
        }
        addEvent(){
            var that = this;
            this.tbody.addEventListener("click",function(eve){
                if(eve.target.className == "del"){
                    that.id = eve.target.parentNode.getAttribute("index");
                    eve.target.parentNode.remove();
                    that.changeCookie(function(i){
                        that.goods.splice(i,1)
                    });
                    this.n--;
                    history.go(0);
                }
            })
            this.tbody.addEventListener("input",function(eve){
                if(eve.target.className == "num"){
                    that.id = eve.target.parentNode.parentNode.getAttribute("index");
                    that.changeCookie(function(i){
                        that.goods[i].num = eve.target.value;
                    });
                }
            })
        }
        changeCookie(callback){
            var i = 0;
            this.goods.some((val,index)=>{
                i = index;
                return val.id == this.id;
            })
            callback(i);
            setCookie("goods",JSON.stringify(this.goods));
        }
        load(){
            var that = this;
            ajaxGet(this.url,function(res){
                that.res = JSON.parse(res);
                that.getCookie()
            })
        }
        getCookie(){
            this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
            this.display();
        }
        display(){
            var str = "";
            this.res.forEach((resVal)=>{
                this.goods.forEach((goodsVal)=>{
                    if(resVal.goodsId == goodsVal.id){
                        var p = resVal.price.split("").splice(1).join("")
                        var p1 = p.replace(",","")
                        var n = goodsVal.num
                        var sum = p1 * n;
                        if(sum.toString().length == 4){
                            var sum = sum.toString().split("")
                            sum.splice(1,0,",")
                            sum = sum.join("")
                        }else if(sum.toString().length == 5){
                            var sum = sum.toString().split("")
                            sum.splice(2,0,",")
                            sum = sum.join("")
                        }
                        else{
                            sum = sum;
                        }
                        str += `<tr index="${resVal.goodsId}">
                                    <td class="t1">
                                        <a href="##" class="img"><img src="${resVal.url}"></a>
                                        <b>${resVal.tip}</b>
                                    </td>
                                    <td class="t2">${resVal.price}</td>
                                    <td><input class="num" type="number" value="${goodsVal.num}" min=1></td>
                                    <td class="count">￥${sum}.00</td>
                                    <td class="del">删除</td>
                                </tr>`;
                    }
                })
            })
            this.tbody.innerHTML = str;
        }
    }

    new Car();
})();