;(function(){
    "use strict"
    // top
    var em = document.querySelector("header .right em")
    // var n = JSON.parse(getCookie("goods")).length;
    // console.log(em,n)
    em.innerHTML = 5;
    var msg = localStorage.getItem("loginUser");
        console.log(msg)
        if(msg){
        $("#top").find(".p1").hide();
        $("#top").find(".p2").show();
        $("#top").find(".p2").find("b").html(JSON.parse(msg).user);
    }else{
        $("#top").find(".p1").show();
        $("#top").find(".p2").hide();
        $("header").find(".right").find("a")
        .on("click",function(){
            alert("请登录")
        }).attr({
            href:"###"
        })
    }

    // 点击退出时,修改登录状态
    $("#top").find(".p2").find("a").click(function(){
        localStorage.removeItem("loginUser");
        $("#top").find(".p1").show();
        $("#top").find(".p2").hide();
    })
    // header
    $("dl.left").find("dt").hover(function(){
        $(this).css({
            background:"#fff",
        }).siblings().css({
            display:"block",
            borderTop:0,
            zIndex:999                       
        }).siblings()
        .css({
            border:"#efefef 1px solid"
        })
        .find(".my").css({
            backgroundPosition:"-121px -60px",
        })
    },function(){
        $(this).css("background","#f7f7f7").siblings().css({
            display:"none",
            border:"#efefef 1px solid",
        }).siblings()
        .css({
            border:"#efefef 1px solid"
        })
        .find(".my").css({
            backgroundPosition:"-121px -30px"
        })
    })
    $("dl.right").find("dt").hover(function(){
        $(this).css({
            borderBottom:0,
            background:"#fff"
        }).siblings().css({
            display:"block",
            boderTop:0,
            zIndex:999
        }).siblings()
        .css({
            border:"#efefef 1px solid"
        })
        .find(".che").css({
            backgroundPosition:"-121px -120px"
        })
    },function(){
        $(this).css("background","#f7f7f7").siblings().css({
            border:"#efefef 1px solid",
            display:"none"
        }).siblings()
        .find(".che").css({
            backgroundPosition:"-121px -90px"
        })
    })

    // nav
    $("nav").find("dd").hover(function(){
        $(this).css({
            background:"#fff",
            boxShadow:"0 0 10px #999"
        }).find(".box").css({
            display:"block"
        })
    },function(){
        $(this).css({
            boxShadow:"none"
        }).find(".box").css({
            display:"none"
        })
    })

    // main(选项卡)
    $(".js").hover(function(){
        if(!($(this).is("js"))){
            $(this).find("dt").css({
                color:"#556ecc",
                borderBottom:"#556ecc 2px solid"
            }).siblings("dd").css("display","block");
            $(this).siblings().find("dd").css({
                display:"none"
            })
            $(this).siblings("dl").find("dt").css({
                color:"#666",
                borderBottom:"#aaa 2px solid"
            })
        }
    },function(){
        $(this).siblings().find("dd").css("display","none")
    })
    // 三楼
    $(".jin").find("img").hover(function(){
        $(this).stop().animate({
            left:"-10px",
            zIndex:999,
            
        })
        $(this).parents(".jin").css({
            flexDirection:"row"
        })
    },function(){
        $(this).stop().animate({
            left:0
        })
    })

    // 楼层
    $("#Btns").find("li").click(function(){
        var index = $(this).index();
        var iNowFloor = $(".floor").eq(index);
        var t = iNowFloor.offset().top;
        $("html").stop().animate({
            scrollTop:t
        })
    })
})();