const gulp=require("gulp");
//编译sass
const sass=require("gulp-sass");
//关联
const sourcemaps=require("gulp-sourcemaps");
//web搭建本地服务  实时加载，实时自动刷新
const connect=require("gulp-connect");
//合并文件
const concat=require("gulp-concat");
//压缩js文件
const uglify=require("gulp-uglify");
//保留压缩前后两个文件
const rename=require("gulp-rename");
//压缩css
const cleanCss=require("gulp-clean-css");
//es6转es5
const babel =require("gulp-babel");


//拷贝首页
gulp.task("copy-index",function(){
	gulp.src("index.html").pipe(gulp.dest("dist")).pipe(connect.reload());
})

// 拷贝其他页面
gulp.task("copy-html",function(){
	gulp.src("html/*.html").pipe(gulp.dest("dist/html")).pipe(connect.reload());
});

// 拷贝json
gulp.task("copy-json",function(){
	gulp.src("json/**").pipe(gulp.dest("dist/json")).pipe(connect.reload());
})

// 拷贝img
gulp.task("copy-img",function(){
	gulp.src("img/**").pipe(gulp.dest("dist/img"));
})
//拷贝font
gulp.task("copy-font",function(){
	gulp.src("font/*").pipe(gulp.dest("dist/font"));
})

// scss文件转化成css文件
gulp.task("sass",function(){
	gulp.src("sass/*.scss")
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})

// 拷贝js
gulp.task("copy-js",function(){
	gulp.src("js/**").pipe(gulp.dest("dist/js")).pipe(connect.reload());
})


// 建立监听
gulp.task("watch",function(){
	gulp.watch("index.html",["copy-index"]);
	gulp.watch("html/*.html",["copy-html"]);
	gulp.watch("json/**",["copy-json"]);
	gulp.watch("sass/*.scss",["sass"]);
	gulp.watch("img/**",["copy-img"]);
	gulp.watch("js/**",["copy-js"]);
});

// 建立服务器
gulp.task("server",function(){
	connect.server({
		root:"dist",
		livereload:true
	});
})

// 建立默认任务
gulp.task("default",["server","watch"]);





// =====================================================
// 合并
gulp.task("concat",function(){
	gulp.src(["js/a.js","js/b.js"])
	.pipe(concat("c.js"))
	.pipe(gulp.dest("dist/js"));
});

//压缩jQuery 
gulp.task("minJq",function(){
	gulp.src("jquery.js")
	.pipe(uglify())
	.pipe(gulp.dest("dist/js"));
});

//一份合并 一份合并压缩 
gulp.task("ship",function(){
	gulp.src(["js/a.js","js/b.js"])
	.pipe(concat("c.js"))
	.pipe(gulp.dest("dist/js"))
	.pipe(uglify())
	.pipe(rename("js.min.js"))
	.pipe(gulp.dest("dist/js"));
});

//压缩css
gulp.task("press",function(){
	gulp.src("css/**")
	.pipe(concat("c.css"))
	
	.pipe(cleancss())
	.pipe(gulp.dest("dist/css"));
})

// ES6转ES5
gulp.task("change",function(){
	gulp.src("js/aa.js")
	.pipe(babel({"presets":["es2015"]}))
	.pipe(gulp.dest("dist/js"));
});
