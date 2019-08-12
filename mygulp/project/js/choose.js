define(function(){
    class Choose{
        addEvent(){
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
        }
    }
    return Choose;
})