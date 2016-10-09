/*
search_grade.js
Performance query routing. 
@author :yuanzp
@date	:2016/10/2
*/

var express = require('express'),
	router = express.Router(),
	Teacher = require('../models/Teacher'),
	SEARCH_GRADE = '查询成绩';

router.get('/',function(req,res) {
	if(req.cookies.islogin){ 

        console.log('cookies:' + req.cookies.islogin);
       	req.session.username = req.cookies.islogin;
  	}  

  	if(req.session.username){    
        
        console.log('session:' + req.session.username);
        res.locals.username = req.session.username;      
  	}else{

        res.redirect('/login');
        return;    
  	}
	res.render('search_grade',{title:SEARCH_GRADE});	
});

router.post('/search/:sno?',function(req,res) {
	if (req.params.sno) {
		Teacher.searchGradeBySno(req.params.sno,function(err,results) {
			if(results == null) {
				err = "没有找到该学生的成绩";
			}
			if(err) {
				res.locals.error = err;
				return;
			}else{
				res.json(results);
				res.end();
			}
				
		});
	}
});

router.post('/updata/:grade?',function(req,res) {
	if (req.params.grade) {
		var grade = eval("("+req.params.grade+")");
		Teacher.updataGrade(grade,function(err,results) {
			if (err) {
				res.locals.error = '更新学生成绩失败';
				return;
			}
			else {
				res.locals.success = '更新学生成绩成功';
				res.end();
			}
		});
	}
});

router.post('/searchkcno/:kcno?',function(req,res){
	if (req.params.kcno) {
		Teacher.searchGradeByKcno(req.params.kcno,function(err,results){
			if (results == null) {
				err = "没有找到该课程号学生成绩";
			}
			if (err) {
				res.locals.error = err;
				return;
			}else{
				res.json(results);
				res.end();
			}
		});
	}
});

router.post('/analyse/:kcno?',function(req,res){
	if (req.params.kcno) {
		Teacher.performanceAnalysis(req.params.kcno,function(err,results){
			if (results == null) {
				err = "没有找到该课程号成绩分析结果";
			}
			if (err) {
				res.locals.error = err;
				return;
			}
			else{
				res.json(results);
				res.end();
			}
		});
	}
});

router.post('/analysesno/:sno?',function(req,res){
	if (req.params.sno) {
		Teacher.studentGradeAnalysis(req.params.sno,function(err,results){
			if (results == null) {
				err = "没有找到该学生成绩分析结果";
			}
			if (err) {
				res.locals.error = err;
				return;
			}
			else{
				res.json(results);
				res.end();
			}
		});		
	}
});
module.exports = router;