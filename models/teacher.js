/*
*教师模块
*@author: yuanzp
*@date:   2016/9/15
*/

var mysql = require('mysql'),
	pool = require('./db.js'),
	DB_NAME = 'student_performance_management';

function Teacher(teacher) {
	this.tNo = teacher.tNo;
	this.tName = teacher.tName;
	this.tBirthday = teacher.tBirthday;
	this.tSex = teacher.tSex;
	this.tPhone = teacher.tPhone;
	this.E_mail = teacher.E_mail;
};
module.exports = Teacher;

pool.getConnection(function(err,connection){
	/*
	*添加老师
	*/
	Teacher.prototype.save = function save(callback) {
		var teacher = {
			tNo: 		this.tNo,
			tName: 		this.tName,
			tBirthday: 	this.tBirthday,
			tSex: 		this.tSex,
			tPhone: 	this.tPhone,
			E_mail: 	this.E_mail
		};

		var insertTeacher_Sql = "INSERT INTO teacher(tNo,tName,tBirthday,tSex,tPhone,E_mail) VALUES(?,?,?,?,?,?)";
		connection.query(insertTeacher_Sql,[teacher.tNo,teacher.tName,teacher.tBirthday,teacher.tSex,teacher.tPhone,teacher.E_mail],function(err,result){
			if (err) {
				console.log("insertTeacher_Sql Error:" + err.message);
				return;
			}
			
			console.log("添加老师成功");
			callback(err,result);
		});
	};

	Teacher.getTeacherNumByTNO = function getTeacherNumByTNO(tNo,callback) {
		var getTeacherNumByTNO_Sql = "SELECT COUNT(1) AS num FROM teacher WHERE tNo = ?";

		connection.query(getTeacherNumByTNO_Sql,[tNo],function(err,result){
			if (err) {
				console.log("getTeacherNumByTNO_Sql Erroe:" + err.message);
				return;
			}

			console.log("查询老师人数成功");
			callback(err,result);
		});
	};

	 Teacher.getTeacherByTNO = function getTeacherByTNO(tNo,callback) {
	 	var getTeacherByTNO_Sql = "SELECT * FROM teacher WHERE tNo = ? ";

	 	connection.query(getTeacherByTNO_Sql,[tNo],function(err,result){
	 		if (err) {
	 			console.log("getTeacherByTNO_Sql Error:" + err.message);
	 			return;
	 		}
	 		console.log("获取老师信息成功");
	 		callback(err,result);
	 	});
	 };

	//根据教师编号或教师姓名查找教师
	Teacher.getTeacherByTnoTname = function getTeacherByTnoTname(tNo,callback){
		var getTeacherByTnoTname_Sql = "SELECT * FROM teacher WHERE tNo= ?";

		connection.query(getTeacherByTnoTname_Sql,[tNo],function(err,result){
			if (err) {
				console.log("getTeacherByTnoTname_Sql Error:" + err.message);
				return;
			}
			console.log("跟据教师编号或姓名查找教师成功");
			callback(err,result);
		});
	};
	// 删除老师数据
	Teacher.delTeacher = function delTeacher(tNo,callback){
		var delTeacher_Sql = "DELETE FROM teacher WHERE tNo =?";
		connection.query(delTeacher_Sql,[tNo],function(err,result){
			if (err) {
				console.log("delTeacher_Sql Error:" + err.message);
				return;
			}
			console.log("删除该老师记录");
			callback(err,result);
		});
	};
	// 更新老师数据

	Teacher.updataTeacher = function updataTeacher(teacher,callback){
		var updataTeacher_Sql = "UPDATE teacher SET tName=?,tBirthday=?,tSex=?,tPhone=?,E_mail=? WHERE tNo=?";
		connection.query(updataTeacher_Sql,[teacher[1],teacher[5],teacher[2],teacher[4],teacher[3],teacher[0]],function(err,result){
			if (err) {
				console.log("updataTeacher_Sql Error:" + err.message);
				return;
			}
			console.log("更新老师数据成功");
			callback(err,result);
		});
	};
	// 查询所有老师记录
	Teacher.searchallTeacher = function searchallTeacher(callback) {
		var searchallTeacher_Sql = "SELECT * FROM Teacher";
		connection.query(searchallTeacher_Sql,function(err,result){
			if (err) {
				console.log("searchallTeacher_Sql Error:" + err.message);
				return;
			}
			console.log("查询所有老师成功");
			callback(err,result);

		});
	};

	//按课程编号查询课程安排
	Teacher.searchCourse = function searchCourse(coures,callback) {
		var searchCourse_Sql = "SELECT kc.kcNo,kc.kcName,teacher.tName,class.cName,class_teacher_kc.time,class_teacher_kc.margin FROM kc,class,teacher,class_teacher_kc WHERE kc.kcNo = class_teacher_kc.kcNo AND teacher.tNo = class_teacher_kc.tNo AND class.cNo = class_teacher_kc.cNo AND class_teacher_kc.kcNo = ?";
		connection.query(searchCourse_Sql,[coures],function(err,result) {
			if (err) {
				console.log("searchCourse_Sql Error:" +err.message);
				return;
			}
			console.log("按课程编号查找课程成功");
			callback(err,result);
		});
	};
	// 按教师编号查询课程安排
	Teacher.searchCourseBytno = function searchCourseBytno(tNo,callback) {
		var searchCourse_Sql = "SELECT kc.kcNo,kc.kcName,teacher.tName,class.cName,class_teacher_kc.time,class_teacher_kc.margin FROM kc,class,teacher,class_teacher_kc WHERE kc.kcNo = class_teacher_kc.kcNo AND teacher.tNo = class_teacher_kc.tNo AND class.cNo = class_teacher_kc.cNo AND class_teacher_kc.tNo = ?";
		connection.query(searchCourse_Sql,[tNo],function(err,result) {
			if (err) {
				console.log("searchCourse_Sql Error:" +err.message);
				return;
			}
			console.log("按教师编号查找课程成功");
			callback(err,result);
		});
	};

	// 按课程名称查询课程安排
	Teacher.searchCourseBykcname = function searchCourseBykcname(kcname,callback) {
		var searchCourse_Sql = "SELECT kc.kcNo,kc.kcName,teacher.tName,class.cName,class_teacher_kc.time,class_teacher_kc.margin FROM kc,class,teacher,class_teacher_kc WHERE kc.kcNo = class_teacher_kc.kcNo AND teacher.tNo = class_teacher_kc.tNo AND class.cNo = class_teacher_kc.cNo AND kc.kcName =?";
		connection.query(searchCourse_Sql,[kcname],function(err,result) {
			if (err) {
				console.log("searchCourse_Sql Error:" +err.message);
				return;
			}
			console.log("按课程名称查找课程成功");
			callback(err,result);
		});
	};


	Teacher.delCourse = function delCourse(course,callback) {
		var delCourse_Sql = "DELETE FROM class_teacher_kc WHERE kcNo =?";
		connection.query(delCourse_Sql,[course],function(err,result){
			if (err) {
				console.log("delCourse_Sql Error:" + err.message);
				return;
			}
			console.log("删除课程安排成功");
			callback(err,result);
		});
	};

	Teacher.searchAllCourse = function searchAllCourse(callback) {
		var searchAllCourse_Sql = "SELECT kc.kcNo,kc.kcName,teacher.tName,class.cName,class_teacher_kc.time,class_teacher_kc.margin FROM kc,class,teacher,class_teacher_kc WHERE kc.kcNo = class_teacher_kc.kcNo AND teacher.tNo = class_teacher_kc.tNo AND class.cNo = class_teacher_kc.cNo";
		connection.query(searchAllCourse_Sql,function(err,result) {
			if (err) {
				console.log("searchAllCourse_Sql Error:" +err.message);
				return;
			}
			console.log("查找所有课程安排成功");
			callback(err,result);
		});
	};

	// 按学生学号查询学生成绩
	Teacher.searchGradeBySno = function searchGradeBySno(sno,callback) {
		var searchGradeBySno_Sql = "SELECT DISTINCT	student.sName,student.sNo,student_kc.kcNo,kc.kcName,kc.credit,student_kc.score 	FROM student,kc,student_kc  WHERE student_kc.kcNo = kc.kcNo AND student_kc.sNo = student.sNo AND student_kc.sNo =?";
		connection.query(searchGradeBySno_Sql,[sno],function(err,result) {
			if (err) {
				console.log("searchGradeBySno_Sql Error:" + err.message);
				return;
			}
			console.log("查找学生成绩成功");
			callback(err,result);
		});		
	};

	// 更新修改后的成绩
	Teacher.updataGrade = function updataGrade(grade,callback) {
		var updataGrade_Sql = "UPDATE student_kc SET score=? WHERE sNo=? AND kcNo=?";
		connection.query(updataGrade_Sql,[grade[0],grade[1],grade[2]],function(err,result){
			if (err) {
				console.log("updataGrade_Sql Error:" +err.message);
				return;
			}
			console.log("更新学生成绩成功");
			callback(err,result);
		});
	};

	// 查询指定课程号所有学生的成绩
	Teacher.searchGradeByKcno = function searchGradeByKcno(kcno,callback){
		var searchGradeByKcno_Sql = "SELECT DISTINCT	student.sName,student.sNo,student_kc.kcNo,kc.kcName,kc.credit,student_kc.score 	FROM student,kc,student_kc  WHERE student_kc.kcNo = kc.kcNo AND student_kc.sNo = student.sNo AND student_kc.kcNo =?"
		connection.query(searchGradeByKcno_Sql,[kcno],function(err,result){
			if (err) {
				console.log("searchGradeByKcno_Sql Error:" +err.message);
				return;
			}
			console.log("查询指定课程号所有学生的成绩成功");
			callback(err,result);
		});
	};

	// 课程成绩分析
	Teacher.performanceAnalysis = function performanceAnalysis(kcno,callback){
		var performanceAnalysis_Sql = "SELECT round(avg(score),2) AS avgGrade,concat(round(((SELECT COUNT(*) FROM STUDENT_KC WHERE KCNO=? AND SCORE >=60)/COUNT(*)),2)*100,'%') AS passrate,concat(round(((SELECT COUNT(*) FROM STUDENT_KC WHERE KCNO=? AND SCORE >=90)/COUNT(*)),2)*100,'%') AS goodgrade FROM STUDENT_KC WHERE KCNO =? ";
		connection.query(performanceAnalysis_Sql,[kcno,kcno,kcno],function(err,result){
			if (err) {
				console.log("performanceAnalysis_Sql Error:" +err.message);
				return;
			}
			console.log("课程成绩分析成功");
			callback(err,result);			
		});	
	};

	// 学生成绩分析
	Teacher.studentGradeAnalysis = function studentGradeAnalysis(sno,callback){
		var studentGradeAnalysis_Sql = "SELECT round(avg(score),2) AS avgGrade,concat(round(((SELECT COUNT(*) FROM STUDENT_KC WHERE sNo=? AND SCORE >=60)/COUNT(*)),2)*100,'%') AS passrate,concat(round(((SELECT COUNT(*) FROM STUDENT_KC WHERE sNo=? AND SCORE >=90)/COUNT(*)),2)*100,'%') AS goodgrade FROM STUDENT_KC WHERE sNo =? ";
		connection.query(studentGradeAnalysis_Sql,[sno,sno,sno],function(err,result){
			if (err) {
				console.log("studentGradeAnalysis_Sql Error:" + err.message);
				return;
			}
			console.log("学生成绩分析成功");
			callback(err,result);

		});
	};


});
