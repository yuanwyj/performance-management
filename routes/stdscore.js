/*
stdscore.js
@author :yuanzp
@date 	:2016/10/9
*/

var express = require('express'),
	router = express.Router(),
    Student = require('../models/student'),
	STDSCORE = '我的成绩';

router.get('/',function(req,res){
	if(req.cookies.islogin){ 

        console.log('cookies:' + req.cookies.islogin);
       	req.session.username = req.cookies.islogin;
  	}  

  	if (req.session.isrole) {
  		console.log('isrole:' + req.session.isrole);
  		res.locals.isrole = req.session.isrole;
  	}

  	if(req.session.username){    
        
        console.log('session:' + req.session.username);
        res.locals.username = req.session.username;      
  	}else{

        res.redirect('/login');
        return;    
  	}
	res.render('stdscore',{title:STDSCORE});
});

router.post('/searchkcname/:kcname?',function(req,res){
	if (req.params.kcname) {
		Student.getGradeByKcname(req.session.username,req.params.kcname,function(err,results){
			if (err) {
				return;
			}
			else{
				res.json(results);
				res.end();
			}
		});
	}
});


router.post('/failure',function(req,res){
	Student.getFailureCourse(req.session.username,function(err,results){
		if (err) {
			return;
		}else{
			res.json(results);
			res.end();
		}
	});
});


module.exports = router;
