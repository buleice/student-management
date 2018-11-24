var express=require("express");
var app=express();
var ejs=require("ejs");
var bodyParser=require("body-parser");

app.engine(".html",ejs.__express);
app.set("views","./views");
app.set("view engine","html");

app.use("/public",express.static("./public"));

app.use(bodyParser.urlencoded({extended:false}));
var cookie=require("cookie-parser");
var session=require("express-session");
app.use(cookie("stuInfo"));
app.use(session({
    secret:"stuInfo",
    resave:true,
    saveUninitialized:true
}));

//当前程序使用某个东西，这个东西叫中间件（中间模块）
//application
app.use((req,resp,next)=>{
    if(req.session.stuInfo==undefined){
        //说明没有登陆
        //如果你访问的是登陆页面，这个时候，我就要让你放行
        if(req.url=="/StudentInfo/login"||req.url=="/StudentInfo/checkLogin"){
            next();
        }
        else{
            //重新跳转到登陆页面
            resp.send("<script>top.location.href='/StudentInfo/login';</script>")
        }
    }
    else{
        //说明已经登陆过了
        next();
    }
});

//加载路由

var StudentInfoRouter=require("./routes/StudentInfoRouter.js");
app.use("/StudentInfo",StudentInfoRouter);
var ManagerRouter=require("./routes/ManagerRouter.js");
app.use("/Manager",ManagerRouter);
var AndroidServices=require("./routes/AndroidServices.js");
app.use("/AndroidServices",AndroidServices);









app.get("/",(req,resp)=>{
   resp.redirect("StudentInfo/login");
});

app.listen(8888,()=>{
   console.log("服务器启动成功");
});

module.exports=app;