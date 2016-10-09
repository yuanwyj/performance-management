/*
search_course.js
@author:yaunzp
@date  :2016/9/30
*/

var express = require('express'),
	router = express.Router(),
	Teacher = require('../models/teacher'),
	search_title = '查找课程';

router.get('/',function(req,res){
	if(req.cookies.islogin){ 

        console.log('cookies:' + req.cookies.islogin);
       	req.session.username = req.cookies.islogin;
  	}  
  	if (req.session.isrole) {
  		console.log('session:' + req.session.isrole);
  		res.locals.isrole = req.session.isrole;
  	}
  	if(req.session.username){    
        
        console.log('session:' + req.session.username);
        res.locals.username = req.session.username;      
  	}else{

        res.redirect('/login');
        return;    
  	}
	res.render('search_course',{title:search_title});		
});

router.get('/teacher_kc',function(req,res){
	if(req.cookies.islogin){ 

        console.log('cookies:' + req.cookies.islogin);
       	req.session.username = req.cookies.islogin;
  	}  
  	if (req.session.isrole) {
  		console.log('session:' + req.session.isrole);
  		res.locals.isrole = req.session.isrole;
  	}
  	if(req.session.username){    
        
        console.log('session:' + req.session.username);
        res.locals.username = req.session.username;      
  	}else{

        res.redirect('/login');
        return;    
  	}
	res.render('teacher_kc',{title:search_title});
});

router.post('/search/:course?',function(req,res) {
	if (req.params.course) {
		Teacher.searchCourse(req.params.course,function(err,results) {
			if (err) {
				res.locals.error = '按课程查找失败';
				return;
			}else {
				res.json(results);
				res.end();
			}
		});
	}
});

router.post('/del/:kcNo?',function(req,res){
	if (req.params.kcNo) {
		Teacher.delCourse(req.params.kcNo,function(err,results){
			if (err) {
				res.locals.error = '删除课程失败';
				return;
			}else{
				console.log(results.affectedRows);
				res.end();
			}
		});
	}
});

router.get('/allcourse',function(req,res){
	Teacher.searchAllCourse(function(err,results) {
        if (results == null) {
            err='没有找到课程安排';
        }
        if (err) {
            res.locals.error = err;
            return;
        }else{
            res.json(results);
            res.end();
        }
	});
});

router.post('/searchtno/:tno?',function(req,res){
	if (req.params.tno) {
		Teacher.searchCourseBytno(req.params.tno,function(err,results){
			if (results == null) {
				err = '没有找到该教师的课程';
			}
			if (err) {
				res.locals.error = err;
				return;
			}else {
				res.json(results);
				res.end();
			}
		});
	}
});

router.post('/searchkcname/:kcname?',function(req,res){
	if (req.params.kcname) {
		Teacher.searchCourseBykcname(req.params.kcname,function(err,results){
			if (results == null) {
				err = '没有找到该教师的课程';
			}
			if (err) {
				res.locals.error = err;
				return;
			}else {
				res.json(results);
				res.end();
			}
		});
	}
});
module.exports = router;