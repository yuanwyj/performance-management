var mysql = require('mysql');
var pool = require('./db.js');
var DB_NAME = 'student_performance_management';

pool.on('connection', function(connection) {  
    connection.query('SET SESSION auto_increment_increment=1'); 
});  
/*创建对象模型*/
function User(user){
    this.username = user.username;
    this.password = user.password;
    this.permission = user.permission;
};
module.exports = User;

pool.getConnection(function(err, connection) {
 
    var useDbSql = "USE " + DB_NAME;
    connection.query(useDbSql, function (err) {
         if (err) {
            console.log("USE Error: " + err.message);
            return;
         }
         console.log('USE succeed');
    });

    //保存数据
    User.prototype.save = function save(callback) {
        var user = {
            username: this.username,
            password: this.password,
            permission: this.permission
        };

        var insertUser_Sql = "INSERT INTO userlogin(username,password,permission) VALUES(?,?,?)";

        connection.query(insertUser_Sql, [user.username, user.password, user.permission], function (err,result) {
            if (err) {
                console.log("insertUser_Sql Error: " + err.message);
                return;
            }

            console.log("存储成功");
            callback(err,result);                     
        });       
    };

    //根据用户名得到用户数量
    User.getUserNumByName = function getUserNumByName(user, callback) {

        var getUserNumByName_Sql = "SELECT COUNT(1) AS num FROM userlogin WHERE username = ? and permission = ?";

        connection.query(getUserNumByName_Sql, [user.username,user.permission], function (err, result) {
            if (err) {
                console.log("getUserNumByName Error: " + err.message);
                return;
            }

            

            console.log("用户数量查询成功");
            callback(err,result);  
            // connection.release();                  
        });        
    };

    //根据用户名得到用户信息
    User.getUserByUserName = function getUserNumByName(username,permission, callback) {

        var getUserByUserName_Sql = "SELECT * FROM userlogin WHERE username = ? and permission = ?";

        connection.query(getUserByUserName_Sql, [username,permission], function (err, result) {
            if (err) {
                console.log("getUserByUserName Error: " + err.message);
                return;
            }

            // connection.release();

            console.log("查询成功");
            callback(err,result);                     
        });        
    };
    //验证新建用户是否为老师
    User.searchTeacher = function searchTeacher(tno,callback) {
        var searchTeacher_Sql = "SELECT count(1) AS num FROM teacher WHERE tno =? ";
        connection.query(searchTeacher_Sql,[tno],function(err,result){
            if (err) {
                console.log("searchTeacher_Sql Error:" + err.message);
                return;
            }
            console.log("验证新建用户是否为老师");
            callback(err,result);
        });
    };

    //验证新建用户是否为学生
    User.searchStudent = function searchStudent(sno,callback) {
        var searchStudent_Sql = "SELECT COUNT(1) AS num FROM student WHERE sno =?";
        connection.query(searchStudent_Sql,[sno],function(err,result){
            if (err) {
                console.log("searchStudent_Sql Error:" + err.message);
                return;
            }
            console.log("验证新建用户是否为学生");
            callback(err,result);
        });
    };
    //验证新建用户是否为管理员
    User.searchAdm = function searchAdm(ano,callback) {
        var searchAdm_Sql = "SELECT COUNT(1) AS num FROM adm WHERE ano=?";
        connection.query(searchAdm_Sql,[ano],function(err,result){
            if (err) {
                console.log("searchAdm_Sql Error:" +err.message);
                return;
            }
            console.log("验证新建用户是否为管理员");
            callback(err,result);
        });
    };
 
});
