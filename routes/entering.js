/*
entering.js
performance entering routing.
@author :yuanzp
@date   :2016/10/3
*/

var express = require('express'),
	router = express.Router(),
	Student = require('../models/student'),
	ENTER_TITLE = '成绩录入';

router.get('/',function(req,res){
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
	res.render('entering',{title:ENTER_TITLE});
});

router.post('/search/:score?',function(req,res){
	if (req.params.score) {
		var score = eval("("+req.params.score+")");
		Student.getGradeBySnoTno(score,function(err,results){
			if (results == null) {
				err = '没有找到该学生成绩';
			}
			if (err) {
				res.locals.error = err;
				return;
			}
			else {
				res.json(results);
				res.end();
			}
		});
	}
});


router.post('/searchkcno/:kcnotno?',function(req,res){
	if (req.params.kcnotno) {
		var kcnotno = eval("("+req.params.kcnotno+")");
		Student.getGradeByKcnoTno(kcnotno,function(err,results){
			if (results == null) {
				err = '没有找到选修该课程的学生';
			}
			if (err) {
				res.locals.error = err;
				return;
			}
			else {
				res.json(results);
				res.end();
			}
		});
	}
});

router.post('/searchkc/:kcno?',function(req,res){
	if (req.params.kcno) {
		Student.getAllKcByTno(req.params.kcno,function(err,results){
			if (results == null) {
				err = '没有找到您教授的课程';
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