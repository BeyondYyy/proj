let gulp = require("gulp");

//gulp服务器插件
let connect = require("gulp-connect");

// gulp的connect的服务器代理插件
let proxy = require("http-proxy-middleware");

// 合并js
let concat = require("gulp-concat");

// 压缩js
let uglify = require("gulp-uglify");

// 改名js
let rename = require("gulp-rename");

// ES6转ES5的模块
let babel = require("gulp-babel");

let sass = require("gulp-sass");
//1.定义指令
    // gulp.task
//2.查找文件
    // gulp.src()
//3.连缀方法
    // .pipe()
//4.转存方法（实现文件的转存）
    // gulp.dest()
        //参数：上线的文件
//5.监听方法
    // gulp.watch()
        //第一个参数：要监听的文件的路径
        //第二个参数：当监听的文件发生变化时，执行的指令（要转存的文件）


gulp.task("sayHi",()=>{
    console.log("hello gulp");
});


//实现文件的自动转存：将开发环境下的代码，转存到上线环境中

//转存

gulp.task("index",()=>{
    gulp.src(["./src/**/*","!./src/*.txt","!./scr/{sass,sass/**,}"])
    .pipe(gulp.dest("./project/html"))
    .pipe(connect.reload());//connect自动刷新
    })
// **/*选取所有的文件(文件的文件。。)
//监听：
gulp.task("watch",()=>{
    gulp.watch(["./src/**/*.html","./src/sass/*.scss"],["index","sassTcss"])
})

//默认指令
gulp.task("default",()=>{
    console.log("这是gulp默认的指令")
})


gulp.task("server",()=>{
    connect.server({
        root:"server",
        port:666,
        livereload:true, //connect自动刷新开关
        middleware: function(connect, opt) {
            return [
                proxy('/api',  {
                    target: 'https://api.asilu.com/',    //代理的目标地址
                    changeOrigin:true,
                    pathRewrite:{    //路径重写规则
                        '^/api':''
                    }
                })
            ]
        }
    })
})

//批量执行指令
gulp.task("all",["watch","server","sassTcss","index"])

// js文件的合并压缩改名
gulp.task("hyg",()=>{
    // 找文件
    gulp.src("./src/js/*.js")
    // 合并文件
    .pipe(concat("main.js"))
    // 转存
    .pipe(gulp.dest("server/js"))
    // 压缩
    .pipe(uglify())
    // 改名
    .pipe(rename("main.min.js"))
    // 转存
    .pipe(gulp.dest("server/js"))
})



// ES6转ES5
gulp.task("sTf",()=>{
    gulp.src("./src/js/**/*")
    .pipe(babel())
    .pipe(gulp.dest("server/js"))
})


//ssaa转css指令
// gulp.task("sassTcss",()=>{
//     gulp.src("./src/sass/*.scss")
//     .pipe(sass().on("error",sass.logError))
//     .pipe(gulp.dest("server/css"))
//     .pipe(connect.reload())
// })
gulp.task("sassTcss",()=>{
    gulp.src("./src/sass/*.scss")
    .pipe(sass().on("error",sass.logError))
    .pipe(gulp.dest("project/css"))
    .pipe(connect.reload())
})

