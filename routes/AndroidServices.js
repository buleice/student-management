var express=require("express");
var router=express.Router();
var Biaogege=require("../util/Biaogege.js");
var StudentInfoServices=require("../Services/StudentInfoServices.js");


router.use((req,resp,next)=>{
    next();
});

router.post("/checkLogin",(req,resp)=>{
   var s_id=Biaogege.getBodyParams("s_id",req);
   var s_pwd=Biaogege.getBodyParams("s_pwd",req);
   StudentInfoServices.checkLogin()
});

router.get("/studentList",(req,resp)=>{
    var obj={
        s_name:Biaogege.getQueryParams("s_name",req),
        s_sex:Biaogege.getQueryParams("s_sex",req),
        pageIndex:Biaogege.getQueryParams("pageIndex",req)
    };

    //添加如下代码以后，我们就可以让Ajax来跨域来访问
    resp.setHeader("Access-Control-Allow-Origin","*");

    StudentInfoServices.getListByPage(obj,(flag,results)=>{
        if(flag){
            var sumCount=results[1][0].sumCount;   //如果不懂，请参考之前的视频
            var res={
                status:"success",
                msg:"请求在成功",
                stuList:results[0],
                sumCount:sumCount,
                pageIndex:obj.pageIndex,
                pageCount:sumCount%5==0?sumCount/5:sumCount/5+1,
                query:obj
            }
            resp.json(res);

        }
        else{

            var res={
                status:"error",
                msg:"请求在成功"

            }
            resp.json(res);
        }
    });
});

module.exports=router;