var express=require("express");
var router=express.Router();
var StudentInfoServices=require("../Services/StudentInfoServices.js");
var ClassInfoServices=require("../Services/ClassInfoServices");
var Biaogege=require("../util/Biaogege.js");
var session=require("express-session");
var cookie=require("cookie-parser");
var StudentInfo=require("../model/StudentInfo");

router.get("/login",(req,resp)=>{
    resp.render("StudentInfo/login");
});

router.post("/checkLogin",(req,resp)=>{
    var s_id=Biaogege.getBodyParams("s_id",req);
    var s_pwd=Biaogege.getBodyParams("s_pwd",req);
    StudentInfoServices.checkLogin(s_id,s_pwd,(flag,results)=>{
       if(flag){
            if(results.length==1){
                req.session.stuInfo=results[0];   //在session做了一个标识，把学生的信息放进去了
                resp.redirect("/Manager/index");
            }
            else{
                resp.redirect("login");
            }
       }
       else{
           console.log(results);
           resp.send("数据库执行失败");
       }
    });
});

router.get("/list",(req,resp)=>{
    //根据你的查询要求来决定你到底显示什么数据
    var obj={
        s_name:Biaogege.getQueryParams("s_name",req),
        s_sex:Biaogege.getQueryParams("s_sex",req),
        pageIndex:Biaogege.getQueryParams("pageIndex",req)
    };

    StudentInfoServices.getListByPage(obj,(flag,results)=>{
       if(flag){
           var sumCount=results[1][0].sumCount;
           var res={
               stuList:results[0],
               sumCount:sumCount,
               pageIndex:obj.pageIndex,
               pageCount:sumCount%5==0?sumCount/5:sumCount/5+1,
               query:obj
           }
           resp.render("StudentInfo/list",res);
       }
       else{
           resp.send("数据库执行失败");

       }
    });
});

router.get("/addStudent",(req,resp)=>{
    ClassInfoServices.getAllList((flag,results)=>{
       if(flag){
           resp.render("StudentInfo/addStudent",{classList:results});
       }
       else{
           resp.send("数据库执行失败");
       }
    });
});

router.post("/addStudent",(req,resp)=>{
    // var stu=new StudentInfo();
    // for(var i in req.body){
    //     for(var j in stu){
    //         if(i==j){
    //             stu[j]=req.body[i];
    //         }
    //     }
    // }
    var obj={
        s_id:Biaogege.getBodyParams("s_id",req),
        s_pwd:Biaogege.getBodyParams("s_pwd",req),
        s_name:Biaogege.getBodyParams("s_name",req),
        s_sex:Biaogege.getBodyParams("s_sex",req),
        s_birthday:Biaogege.getBodyParams("s_birthday",req),
        s_nation:Biaogege.getBodyParams("s_nation",req),
        c_id:Biaogege.getBodyParams("c_id",req),
        s_address:Biaogege.getBodyParams("s_address",req),
        isDel:false

    }

    StudentInfoServices.addStudent(obj,(flag,results)=>{
       if(flag){
           if(results.affectedRows>0){
               resp.redirect("/StudentInfo/list");
           }
           else{
               Biaogege.alertAndBack("保存失败",resp);
           }
       }
       else{
           Biaogege.alertAndBack("数据库执行失败，请重试或联系管理员",resp);
       }
    });




});
//删除学生信息
router.get("/delete",(req,resp)=>{
    var s_id=Biaogege.getQueryParams("s_id",req);
    StudentInfoServices.deleteStudent(s_id,(flag,results)=>{
        var res={
            status:"success",
            msg:"删除成功"
        };
        if(flag){
            if(results.affectedRows<=0){
                res.status="error";
                res.msg="删除失败";
        }

        }
        resp.send(JSON.stringify(res));
    });
});
//修改学生信息
router.get("/editStudent",(req,resp)=>{
    var s_id=Biaogege.getQueryParams("s_id",req);
    StudentInfoServices.editStudentClassList(s_id,(flag,results)=>{
        if(flag){
               resp.render("StudentInfo/editStudent",{data:results[0][0],classList:results[1]});
        }
        else{
            Biaogege.alertAndBack("数据库执行失败",resp);
        }
    })


});
router.post("/editStudent",(req,resp)=>{
   var obj={
       s_pwd:Biaogege.getBodyParams("s_pwd",req),
       s_name:Biaogege.getBodyParams("s_name",req),
       s_sex:Biaogege.getBodyParams("s_sex",req),
       s_birthday:Biaogege.getBodyParams("s_birthday",req),
       s_nation:Biaogege.getBodyParams("s_nation",req),
       c_id:Biaogege.getBodyParams("c_id",req),
       s_address:Biaogege.getBodyParams("s_address",req),
       s_id:Biaogege.getBodyParams("s_id",req)
   };
   StudentInfoServices.editStudent(obj,(flag,results)=>{
       if(flag){
           if(results.affectedRows>0){
               resp.redirect("/StudentInfo/list");
               console.log(1);
           }
           else{
               Biaogege.alertAndBack("修改失败",resp);
           }
       }
       else {
           Biaogege.alertAndBack("数据库执行失败",resp);
       }
   })

});
router.post("/deleteList",(req,resp)=>{
    var obj={
        s_ids:Biaogege.getBodyParams("s_ids",req)
    };
    StudentInfoServices.deleteList(obj,(flag,results)=>{
        var res={
            status:"success",
            msg:"删除成功"
        }
        if(flag){
            if(results.affectedRows<0){
                res.status="error";
                res.msg="删除失败"
            }
        }
        else{
            res.status="error";
            res.msg="数据库执行失败"
        }
        // resp.send(JSON.stringify(res);
        resp.json(res);//直接向像前台传输json数据
    })
});
router.get("/logOff",(req,resp)=>{
    //退出登录，清除session
    req.session.destroy();
    resp.send("<script>top.location.href='StudentInfo/login';</script>")
});

module.exports=router;