/*
学生模块
@author:yuanzp
@date  :2016/2/27
*/

var mysql = require('mysql'),
	pool = require('./db.js'),
	DB_NAME = 'student_performance_management';

function Student(student) {
	this.sNo = student.sNo;
	this.sName = student.sName;
	this.sBirthday = student.sBirthday;
	this.sSex = student.sSex;
	this.sphone = student.sphone;
	this.E_mail = student.E_mail;
};
module.exports = Student;

pool.getConnection(function(err,connection){
	// 添加学生记录
	Student.prototype.save = function save(callback) {
		var student = {
			sNo: 		this.sNo,
			sName: 		this.sName,
			sBirthday: 	this.sBirthday,
			sSex: 		this.sSex,
			sphone: 	this.sphone,
			E_mail: 	this.E_mail
		};	
		var insetStudent_Sql = "INSERT INTO student (sNo,sName,sBirthday,sSex,sphone,E_mail) VALUES(?,?,?,?,?,?)";
		connection.query(insetStudent_Sql,[student.sNo,student.sName,student.sBirthday,student.sSex,student.sphone,student.E_mail],function(err,result){
			if (err) {
				console.log("insetStudent_Sql Error:" + err.message);
				return;
			}
			console.log("添加学生成功");
			callback(err,result);
		});	
	};

	Student.getStudentNumBySNO = function getStudentNumBySNO(sNo,callback){
		var	getStudentNumBySNO_Sql = "SELECT COUNT(1) AS num FROM student WHERE sNo =?";
		connection.query(getStudentNumBySNO_Sql,[sNo],function(err,result){
			if (err) {
				console.log("getStudentNumBySNO_Sql Error:" + err.message);
				return;
			}
			console.log("查询学生人数成功");
			callback(err,result);
		}); 
	};

	Student.getStudentBySNO = function getStudentBySNO(sNo,callback) {
		var getStudentBySNO_Sql = "SELECT * FROM student WHERE sNo = ?";
		connection.query(getStudentBySNO_Sql,[sNo],function(err,result){
			if (err) {
				console.log("getStudentBySNO_Sql Error:" + err.message);
				return;
			}
			console.log("获取学生记录成功");
			callback(err,result);
		});
	};

	Student.getAdmByANO = function getAdmByANO(aNo,callback) {
		var getAdmByANO_Sql = "SELECT * FROM adm WHERE aNo = ?";
		connection.query(getAdmByANO_Sql,[aNo],function(err,result){
			if (err) {
				console.log("getStudentBySNO_Sql Error:" + err.message);
				return;
			}
			console.log("获取管理员记录成功");
			callback(err,result);
		});
	};

	Student.delStudentBySNO = function delStudentBySNO(sNo,callback) {
		var delStudentBySNO_Sql = "DELETE FROM student WHERE sNo = ?";
		connection.query(delStudentBySNO_Sql,[sNo],function(err,result){
			if (err) {
				console.log("delStudentBySNO_Sql Error:" + err.message);
				return;
			}
			console.log("删除学生成功");
			callback(err,result);
		});
	};

	Student.updataStudentBySNO = function updataStudentBySNO(student,callback) {
		var updataStudentBySNO = "UPDATE student SET sName=?,sBirthday=?,sSex=?,sphone=?,E_mail=? WHERE sNo=?";
		connection.query(updataStudentBySNO,[student[1],student[5],student[2],student[4],student[3],student[0]],function(err,result){
			if (err) {
				console.log("updataStudentBySNO Error:" + err.message);
				return;
			}
			console.log("更新老师数据成功");
			callback(err,result);
		});
	};

	Student.searchallStudent = function searchallStudent(callback) {
		var searchallStudent_Sql = "SELECT * FROM student";
		connection.query(searchallStudent_Sql,function(err,result){
			if (err) {
				console.log("searchallStudent_Sql Error:" + err.message);
				return;
			}
			console.log("查询所有学生成功");
			callback(err,result);
		});
	};

	Student.addCourseArrange = function addCourseArrange(course,callback) {
		var addCourseArrange_Sql = "INSERT INTO class_teacher_kc(kcNo,cNo,tNo,time,margin) VALUES(?,?,?,?,?)";
		connection.query(addCourseArrange_Sql,[course[2],course[0],course[1],course[3],course[4]],function(err,result){
			if (err) {
				console.log("addCourseArrange_Sql Error:" +err.message);
				return;
			}
			console.log("添加课程安排成功");
			callback(err,result);
		});
	};

	// 检查上课时间与教室是否冲突
	Student.getCourseClassTime = function getCourseClassTime(course,callback) {
		var getCourseClassTime_Sql = "SELECT COUNT(1) AS num FROM class_teacher_kc WHERE cNo=? AND time=?";
		connection.query(getCourseClassTime,[course[2],course[3]],function(err,result) {
			if (err) {
				console.log("getCourseClassTime_Sql Error:" +err.message);
				return;
			}
		console.log("教室冲突");
		callback(err,result);				
		});
	};

	// 查询指定学号学生选修某个老师的所有课程
	Student.getGradeBySnoTno = function getGradeBySnoTno(score,callback){
		var getGradeBySnoTno_Sql = "SELECT DISTINCT STUDENT.sName,STUDENT.sNo,STUDENT_KC.kcNo,KC.kcName,KC.credit,STUDENT_KC.score FROM STUDENT,KC,STUDENT_KC,CLASS_TEACHER_KC WHERE CLASS_TEACHER_KC.KCNO = STUDENT_KC.KCNO AND STUDENT_KC.KCNO = KC.KCNO AND STUDENT_KC.SNO = STUDENT.SNO AND CLASS_TEACHER_KC.TNO =? AND STUDENT_KC.SNO =?";
		connection.query(getGradeBySnoTno_Sql,[score[0],score[1]],function(err,result){
			if (err) {
				console.log("getGradeBySnoTno_Sql Error:" + err.message);
				return;
			}
			console.log("查询指定学号学生选修某个老师的所有课程成功");
			callback(err,result);
		});
	};

	// 查询选修了某老师课程的所有学生的成绩
	Student.getGradeByKcnoTno = function getGradeByKcnoTno(kcnotno,callback){
		var getGradeByKcnoTno_Sql = "SELECT DISTINCT STUDENT.sName,STUDENT.sNo,STUDENT_KC.kcNo,KC.kcName,KC.credit,STUDENT_KC.score FROM STUDENT,KC,STUDENT_KC,CLASS_TEACHER_KC WHERE CLASS_TEACHER_KC.KCNO = STUDENT_KC.KCNO AND STUDENT_KC.KCNO = KC.KCNO AND STUDENT_KC.SNO = STUDENT.SNO AND CLASS_TEACHER_KC.TNO =? AND student_kc.kcno =?";
		connection.query(getGradeByKcnoTno_Sql,[kcnotno[0],kcnotno[1]],function(err,result){
			if (err) {
				console.log("getGradeByKcnoTno_Sql Error:"+err.message);
				return;
			}
			console.log("查询选修了某老师课程的所有学生的成绩成功");
			callback(err,result);
		});
	};

	// 查询某个老师教授的所有课程
	Student.getAllKcByTno = function getAllKcByTno(tno,callback){
		var getAllKcByTno_Sql = "SELECT CLASS_TEACHER_KC.kcNo,KC.kcName,CLASS_TEACHER_KC.time,class.cName,class_teacher_kc.margin FROM CLASS_TEACHER_KC,KC,CLASS WHERE KC.kcNo = CLASS_TEACHER_KC.kcNo AND CLASS.cNo = CLASS_TEACHER_KC.cNo AND CLASS_TEACHER_KC.tNo =?";
		connection.query(getAllKcByTno_Sql,[tno],function(err,result){
			if (err) {
				console.log("getAllKcByTno_Sql Error:" +err.message);
				return;
			}
			console.log("查询某个老师教授的所有课程成功");
			callback(err,result);
		});
	};

	// 学生查询本人所有课程成绩
	Student.getAllcourseBysNo = function getAllcourseBysNo(sno,callback){
		var getAllcourseBysNo_Sql = "SELECT STUDENT_KC.kcNo,KC.kcName,TEACHER.tName,CLASS.cName,CLASS_TEACHER_KC.time,STUDENT_KC.score FROM TEACHER,KC,CLASS,STUDENT_KC,CLASS_TEACHER_KC WHERE CLASS_TEACHER_KC.tNo = TEACHER.tNo AND CLASS_TEACHER_KC.cNo = CLASS.cNo AND CLASS_TEACHER_KC.kcNo = STUDENT_KC.kcNo AND STUDENT_KC.kcNo = KC.kcNo AND STUDENT_KC.sNo =?";
		connection.query(getAllcourseBysNo_Sql,[sno],function(err,result){
			if (err) {
				console.log("getAllcourseBysNo_Sql Error:" + err.message);
				return;
			}
			console.log("学生查询本人所有课程成绩成功");
			callback(err,result);
		});
	};

	// 学生本人查询所有不及格课程
	Student.getFailureCourse = function getFailureCourse(sno,callback){
		var getFailureCourse_Sql = "SELECT STUDENT_KC.kcNo,KC.kcName,TEACHER.tName,CLASS.cName,CLASS_TEACHER_KC.time,STUDENT_KC.score FROM TEACHER,KC,CLASS,STUDENT_KC,CLASS_TEACHER_KC WHERE CLASS_TEACHER_KC.tNo = TEACHER.tNo AND CLASS_TEACHER_KC.cNo = CLASS.cNo AND CLASS_TEACHER_KC.kcNo = STUDENT_KC.kcNo AND STUDENT_KC.kcNo = KC.kcNo AND STUDENT_KC.score <60 AND STUDENT_KC.sNo =?"
		connection.query(getFailureCourse_Sql,[sno],function(err,result){
			if(err){
				console.log("getAllKcByTno_Sql Error:" +err.message);
				return;
			}
			console.log("学生本人查询所有不及格课程成功");
			callback(err,result);
		});
	};

	// 学生根据课程名查询自己的成绩
	Student.getGradeByKcname = function getGradeByKcname(sno,kcname,callback){
		var getGradeByKcname_Sql = "SELECT STUDENT_KC.kcNo,TEACHER.tName,CLASS.cName,KC.credit,CLASS_TEACHER_KC.time,STUDENT_KC.score,CLASS_TEACHER_KC.margin FROM TEACHER,KC,CLASS,STUDENT_KC,CLASS_TEACHER_KC WHERE CLASS_TEACHER_KC.tNo = TEACHER.tNo AND CLASS_TEACHER_KC.cNo = CLASS.cNo AND CLASS_TEACHER_KC.kcNo = STUDENT_KC.kcNo AND STUDENT_KC.kcNo = KC.kcNo AND STUDENT_KC.sNo =? AND KC.kcName = ?"
		connection.query(getGradeByKcname_Sql,[sno,kcname],function(err,result){
			if(err){
				console.log("getGradeByKcname_Sql Error:" +err.message);
				return;
			}
			console.log("学生根据课程名查询自己的成绩成功");
			callback(err,result);
		});
	}

	// 检查学生是否已经选修了某个课程
	Student.ifChooseKcBySno = function ifChooseKcBySno(sno,kcno,callback){
		var ifChooseKcBySno_Sql = "SELECT COUNT(1) AS num FROM student_kc WHERE sNo =? AND kcNo=?";
		connection.query(ifChooseKcBySno_Sql,[sno,kcno],function(err,result){
			if(err){
				console.log("ifChooseKcBySno_Sql Error:" + err.message);
				return;
			}
			console.log("检查学生是否已经选修了某个课程成功");
			callback(err,result);
		});
	};
	// 检查课程余量
	Student.getMargin = function getMargin(kcno,callback){
		var getMargin_Sql = "SELECT COUNT(1) AS num FROM CLASS_TEACHER_KC WHERE kcNo=? AND margin = 0";
		connection.query(getMargin_Sql,[kcno],function(err,result){
			if(err){
				console.log("getMargin_Sql Error:" + err.message);
				return;
			}
			console.log("检查课程余量成功");
			callback(err,result);
		});
	};

	// 更新课程余量
	Student.updateMargin = function updateMargin(kcno,callback){
		var updateMargin_Sql = "UPDATE class_teacher_kc SET margin = margin- 1 WHERE margin > 0 AND kcno = ?";
		connection.query(updateMargin_Sql,[kcno],function(err,result){
			if(err){
				console.log("updateMargin_Sql Error:" + err.message);
				return;
			}
			console.log("更新课程余量成功");
			callback(err,result);
		});
	};



	// 更新学生选课记录
	Student.updataStudentKc = function updataStudentKc(sno,kcno,callback){
		var updataStudentKc_Sql = "INSERT INTO STUDENT_KC(sNo,kcNo) VALUES(?,?) ";
		connection.query(updataStudentKc_Sql,[sno,kcno],function(err,result){
			if(err){
				console.log("updataStudentKc_Sql Error:" +err.message);
				return;
			}
			console.log("更新学生选课记录成功");
			callback(err,result);
		});
	};

});
