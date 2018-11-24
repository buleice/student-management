//所有涉及到请求的操作，我们就会部放到router里面
var express=require("express");
var router=express.Router();


router.use((req,resp,next)=>{
   next();
});

router.get("/index",(req,resp)=>{
    console.log(req.session.stuInfo);
   resp.render("Manager/index",{stuInfo:req.session.stuInfo});
});


module.exports=router;