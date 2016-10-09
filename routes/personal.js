/*
personal.js
Personal center routing.
@author :yaunzp
@date   :2016/10/6
*/

var express = require('express'),
	router = express.Router(),
    Student = require('../models/student'),
    Teacher = require('../models/teacher'),
	PERSONAL = '个人中心';

router.get('/',function(req,res){
	if(req.cookies.islogin){ 

        console.log('cookies:' + req.cookies.islogin);
       	req.session.username = req.cookies.islogin;
  	}  

  	if(req.session.username){    
        
        console.log('session:' + req.session.username);
        res.locals.username = req.session.username;

  	}

    if (req.session.isrole == 'student') {
        console.log('isrole:' + req.session.isrole);
        res.locals.isrole = req.session.isrole;
        Student.getStudentBySNO(req.session.username,function(err,results){
            if(err){
                res.locals.error = '查找用户失败';
                return;
            }
            else{
                res.locals.student = results[0];
                res.render('personal',{title:PERSONAL});
         
            }
        });
    }

    if (req.session.isrole == 'adm') {
        console.log('isrole:' + req.session.isrole);
        res.locals.isrole = req.session.isrole;
        Student.getAdmByANO(req.session.username,function(err,results){
            if(err){
                res.locals.error = '查找用户失败';
                return;
            }
            else{
                res.locals.adm = results[0];
                res.render('personal',{title:PERSONAL});
          
            }
        });
    }    
    if (req.session.isrole == 'teacher') {
        console.log('isrole:' + req.session.isrole);
        res.locals.isrole = req.session.isrole;
        Teacher.getTeacherByTNO(req.session.username,function(err,results){
            if(err){
                res.locals.error = '查找用户失败';
                return;
            }
            else{
                res.locals.teacher = results[0];
                res.render('personal',{title:PERSONAL});
          
            }
        });
    }

    else{

        // res.redirect('/login');
        return;    
  	}

	// res.render('personal',{title:PERSONAL});	
});
module.exports = router;
