;(function(){
    var aimg = document.querySelectorAll("img");
    console.log(aimg)
    var arr = Array.from(aimg);
    var t;

    onload = onscroll = function(){
        clearTimeout(t);
        t = setTimeout(function(){
            fn();
        },100)
    }

    function fn(){
        var scrollT = document.documentElement.scrollTop;
        var clientH = document.documentElement.clientHeight;
        
        for(var i=0;i<arr.length;i++){
            console.log(`i:${i}`);
            if(arr[i].offsetTop - scrollT < clientH){
                arr[i].src = arr[i].getAttribute("ljz");
                arr.splice(i,1)
            }
        }
    }


})();