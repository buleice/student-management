var mysql=require("mysql");
var config={
  host:"127.0.0.1",
  user:"root",
  password:"18696188160",
  database:"H1706",
  multipleStatements:true
};
var DBUtil={
    getConnection:function () {
        return mysql.createConnection(config);
    }
};

module.exports=DBUtil;
