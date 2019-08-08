"use strict";

require.config({
    baseUrl: "module",
    paths: {
        list: "list copy",
        car: "car copy",
        index: "index",
        jq: "../libs/jquery.1.12.4"
    }
});

require(["jq", "car copy", "list"], function (_, c, l) {
    console.log(l);
    console.log(c);
    console.log($);
});