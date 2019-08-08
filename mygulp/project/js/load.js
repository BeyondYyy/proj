;(function(){
    "use strict"
    let aimg = document.querySelectorAll("img");
    // console.log(aimg)
    let arr = Array.from(aimg);
    let t;

    onload = onscroll = function(){
        clearTimeout(t);
        t = setTimeout(function(){
            fn();
        },100)
    }

    function fn(){
        let scrollT = document.documentElement.scrollTop;
        let clientH = document.documentElement.clientHeight;
        
        for(var i=0;i<arr.length;i++){
            // console.log(`i:${i}`);
            if(arr[i].offsetTop - scrollT < clientH){
                arr[i].src = arr[i].getAttribute("ljz");
                arr.splice(i,1)
            }
        }
    }

})();