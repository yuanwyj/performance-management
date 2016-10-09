/*
Course arrangment module routing
@author:yuanzp
@date  :2016/9/29
*/

var express = require('express'),
	router = express.Router(),
	Student = require('../models/student'),
	Arrangent_title = '课程安排';

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
	res.render('arrangment',{title:Arrangent_title});	
});

router.get('/find/:courseArr?',function(req,res,next) {
    if (req.params.courseArr) {
        var course = eval("("+req.params.courseArr+")");
        Student.getCourseClassTime(course,function(err,results){
                if (err) {
                    res.locals.error = 'error in here';
                    next();
                    return;
                }
                else{
                    res.json(results);
                }
        });
    }
});

router.post('/',function(req,res) {
    var cNo = req.body['cno'],
        tNo = req.body['tno'],
        kcNo = req.body['kcno'],
        time = req.body['time'],
        margin = req.body['description'],
        course = [];
    course = [cNo,tNo,kcNo,time,margin];
  

    Student.addCourseArrange(course,function(err,results){
            if (err) {
                res.locals.error = err;
                    
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
                res.render('student', { title: ADD_STUDENT }); 
                return;
            }


            else {

                res.locals.success = '添加课程安排成功';
                //发送cookie
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
            res.render('arrangment',{title:Arrangent_title});                   
            }
            
    });

    // });
});
module.exports = router;