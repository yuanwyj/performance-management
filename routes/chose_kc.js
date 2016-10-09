/*
chose_kc.js
curricula-variable routing.
@author :yuanzp
@date 	:2016/10/7
*/

var express = require('express'),
	router = express.Router(),
    Student = require('../models/student'),
	CHOSE_KC = '选修课程';

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
	res.render('chose_kc',{title:CHOSE_KC});
});

router.post('/chose',function(req,res){
    if (req.session.username) {
        Student.getAllcourseBysNo(req.session.username,function(err,results){
            if (err) {
                res.locals.error = '查找课程失败';
                return;
            }
            else {
                res.json(results);
                res.end();
            }
        });
    }
});

router.post('/choose/:kcno?',function(req,res){
    var message;
    if (req.params.kcno) {
        Student.ifChooseKcBySno(req.session.username,req.params.kcno,function(err,results){
            if (results != null && results[0]['num'] > 0) {
                message = "你已经选择了该课程";
                res.json(message);
                res.end();
                return;
            }

            Student.getMargin(req.params.kcno,function(err,results){
                if ( results != null && results[0]['num'] > 0) {
                    message = '该课程余量为0，不可选';
                    res.json(message);
                    res.end();
                    return;
                }
                Student.updateMargin(req.params.kcno,function(err,results){
                    if (err) {
                        res.locals.error = '更新课程余量失败';
                        return;
                    }
                });
                Student.updataStudentKc(req.session.username,req.params.kcno,function(err,results){
                    if (err) {
                        res.locals.error = '选课失败';
                        return;
                    }
                    message = '选课成功';
                    res.json(message);
                    res.end;
                });



            }) ;
            
        });
    }
});

module.exports = router;