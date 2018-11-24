var DBUtil=require("../util/DBUitl");
var ClassInfoServices={
  getAllList:function (callBack) {
      var connection=DBUtil.getConnection();
      connection.connect();
      connection.query("select * from classInfo",[],(err,results)=>{
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

module.exports=ClassInfoServices;