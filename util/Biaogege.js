var Biaogege={
    //获取get请求的参数
    getQueryParams:function (paramsName,req) {
        return req.query[paramsName]==undefined?"":req.query[paramsName];
    },
    //获取post请求的参数
    getBodyParams:function (paramsName,req) {
        return req.body[paramsName]==undefined?"":req.body[paramsName];
    },
    alertAndBack:function (msg,resp) {
        resp.send("<script>alert('"+msg+"');history.back();</script>")
    },
    alertAndBackReload:function (msg,resp) {
        resp.send("<script>alert('"+msg+"');history.back();location.reload();</script>")
    },
    alertAndRedirect:function (msg,url,resp) {
        resp.send("<script>alert('"+msg+"');window.location.href='"+url+"';</script>");
    },
    Arrayquote:function (arr) {
        for(var i=0;i<arr.length;i++){
            arr[i]="'"+arr[i]+"'";
        }
    }
};


module.exports=Biaogege;

//关于对像方法的扩展
// IncomingMessage.prototype.getQueryParams=function (paramsName) {
//
// };
//
