define(function(){
    "user strict"
    class Floor{
        addEvent(){
            $("#Btns").find("li").click(function(){
                var index = $(this).index();
                var iNowFloor = $(".floor").eq(index);
                var t = iNowFloor.offset().top;
                $("html").stop().animate({
                    scrollTop:t
                })
            })
        }
    }
    return Floor;
})