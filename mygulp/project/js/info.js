;(function(){
    function Magnifier(){
//				1.选择元素
        this.sBox = document.querySelector(".s_box");
        this.bBox = document.querySelector(".b_box");
        console.log(this.bBox)
        this.bImg = this.bBox.children[0];
        console.log(this.bImg)
//				2.绑定事件
        this.addEvent()
    }
    Magnifier.prototype.addEvent = function(){
        var that = this;
//				进入事件
        this.sBox.onmouseenter = function(){
//					3-1.显示
            that.show()
        }
//				离开事件
        this.sBox.onmouseleave = function(){
//					3-2.消失
            that.hide()	
        }
//				移动事件
        this.sBox.onmousemove = function(eve){
            var e = eve || window.event
//					3-3.移动
            that.move(e);
        }
    }
    Magnifier.prototype.show = function(){
        this.bBox.style.display = "block";
        
//				提前判断,将来的实例身上是否有span属性,有就显示,没有就创建
        if(!this.span){
//				创建鼠标下方的蒙板
            this.span = document.createElement("span");
//							(06班留级的人数	/	06班总人数   = 06班留级比例)   *   05班的总人数
//						(右边图片显示的尺寸	/	右边图片的总尺寸  = 显示的图片的比例) * 左边能显示的图片的总尺寸
            var w = this.bBox.offsetWidth / this.bImg.offsetWidth * this.sBox.offsetWidth;
            var h = this.bBox.offsetHeight / this.bImg.offsetHeight * this.sBox.offsetHeight;
            
            this.span.style.cssText = `width:${w}px;height:${h}px;background:rgba(200,200,200,0.6);position:absolute;left:0;top:0;`;
            this.sBox.appendChild(this.span);
        }
        
//				有,就显示
        this.span.style.display = "block";
    }
    Magnifier.prototype.hide = function(){
//				消失
        this.span.style.display = "none";
        this.bBox.style.display = "none";
    }
    Magnifier.prototype.move = function(e){
//				计算移动的距离
        var l = e.pageX - this.sBox.offsetLeft - this.span.offsetWidth/2;
        var t = e.pageY - this.sBox.offsetTop - this.span.offsetHeight/2;
        
//				span的边界限定
        if(l < 0) l=0;
        if(t < 0) t=0;
        if(l > this.sBox.offsetWidth - this.span.offsetWidth){
            l = this.sBox.offsetWidth - this.span.offsetWidth
        }
        if(t > this.sBox.offsetHeight - this.span.offsetHeight){
            t = this.sBox.offsetHeight - this.span.offsetHeight
        }
//				设置span的位置
        this.span.style.left = l + "px";
        this.span.style.top = t + "px";
        
//				计算span移动的比例
        var x = l / (this.sBox.offsetWidth - this.span.offsetWidth);
        var y = t / (this.sBox.offsetHeight - this.span.offsetHeight);
        
//				根据比例,计算右边大图要移动的距离，注意方向
        this.bImg.style.left = -x * (this.bImg.offsetWidth - this.bBox.offsetWidth) + "px";
        this.bImg.style.top = -y * (this.bImg.offsetHeight - this.bBox.offsetHeight) + "px";
    }
    
    new Magnifier();
})();