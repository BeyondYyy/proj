require.config({
    baseUrl:"module",
    paths:{
        list:"list copy",
        car:"car copy",
        index:"register copy",
        jq:"../libs/jquery.1.12.4"
    }
})

require(["jq","Car copy","List copy","Register copy"],function(_,c,l,r){
    // console.log(l)
    // console.log($)
    // console.log(c)
    // console.log(r)
    new l({})
    new c({})
    new r({})
})