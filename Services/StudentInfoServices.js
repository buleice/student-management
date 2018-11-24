//所有涉及到数据库的操作，全部放在这个地方
var DBUtil=require("../util/DBUitl.js");
var Student=require("../model/StudentInfo.js");
var Biaogege=require("../util/Biaogege.js")
var StudentServices={
    checkLogin:function (s_id,s_pwd,callBack) {
        var connection=DBUtil.getConnection();
        connection.connect();
        connection.query("select * from studentinfo where s_id=? and s_pwd=?",[s_id,s_pwd],(err,results)=>{
           if(err){
               callBack(false,err);
           }
           else{
                callBack(true,results);
           }
        });
        connection.end();
    },
    getAllList:function(callBack){
        var connection=DBUtil.getConnection();
        connection.query("select * from studentinfoview where isDel=false",[],(err,results)=>{
           if(err){
               callBack(false,err);
           }
           else{
               callBack(true,results);
           }
        });
        connection.end();
    },
    getListByPage:function (obj,callBack) {
       var strSql="select * from studentinfoview where isDel=false ";
       var countSql="select count(*) 'sumCount' from studentinfoview where isDel=false ";
       var strWhere="";
       if(obj.s_name!=""){
           strWhere+=" and s_name like '%"+obj.s_name+"%'";
       }
       if(obj.s_sex!=""){
           strWhere+=" and s_sex='"+obj.s_sex+"'";
       }
       if(obj.pageIndex==""){
           obj.pageIndex=1;
       }
       strSql+=strWhere+" limit ?,?";
       countSql+=strWhere;
       var connection=DBUtil.getConnection();
       connection.connect();
       connection.query(strSql+";"+countSql,[(obj.pageIndex-1)*5,5],(err,results)=>{
          if(err){
              console.log(err);
              callBack(false,err);
          }
          else{
              callBack(true,results);
          }
       });
       connection.end();
    },
    addStudent:function (obj,callBack) {
        var connection=DBUtil.getConnection();
        connection.connect();
        var strSql="insert into studentinfo (s_id,s_pwd,s_name,s_sex,s_birthday,s_nation,c_id,s_address,isDel) values (?,?,?,?,?,?,?,?,?)";
        var arr=new Array();
        for(var i in obj){
            arr.push(obj[i]);
        }
        connection.query(strSql,arr,(err,results)=>{
           if(err){
               console.log(err);
               callBack(false,err);
           }
           else{
               callBack(true,results);
           }
        });
        connection.end();
    },
    deleteStudent:function(obj,callBack){
        var connection=DBUtil.getConnection();
        connection.connect();
        var strSql="update studentinfo set isDel=true where s_id=?";
        connection.query(strSql,[obj],(err,results)=>{
            if(err){
                callBack(false,err);
            }
            else{
                callBack(true,results);
            }
        });
        connection.end();
    },
    //修改学生信息
    editStudentClassList:function (obj,callBack) {
        var connection=DBUtil.getConnection();
        connection.connect();
        var strSql="select * from studentinfo where s_id=?";
        var strSql2="select * from classinfo"
        connection.query(strSql+";"+strSql2,[obj],function (err,results) {
            if(err){
                callBack(false,err);
            }
            else{
                callBack(true,results);
            }
        });
        connection.end();
    },
    editStudent:function (obj,callBack) {
        var connection=DBUtil.getConnection();
        connection.connect();
        var arr=[];
        var strSql="update studentinfo set s_pwd=?, s_name=?,s_sex=?,s_birthday=?,s_nation=?,c_id=?,s_address=? where s_id=?";
        connection.query(strSql,[obj.s_pwd,obj.s_name,obj.s_sex,obj.s_birthday,obj.s_nation,obj.c_id,obj.s_address,obj.s_id],(err,results)=>{
            if(err){
                callBack(false,err);
            }
            else{
                callBack(true,results)
            }
        });
        connection.end();
    },
    //
    deleteList:function(obj,callBack){
        var s_ids=obj.s_ids;
        var s_idArr=s_ids.split(",");
        // for(var i=0;i<s_idArr.length;i++){
        //     s_idArr[i]="'"+s_idArr[i]+"'";
        // }
        Biaogege.Arrayquote(s_idArr);
        var strSql="update studentinfo set isDel=true where s_id in ("+s_idArr.toString()+")";
        var connection=DBUtil.getConnection();
        connection.connect();
        connection.query(strSql,[],(err,results)=>{
            if(err){
                callBack(false,err);
            }
            else{
                callBack(true,results);
            }
        });
        connection.end();
    }
};


module.exports=StudentServices;