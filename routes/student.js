var express = require('express'),
    router = express.Router(),
    Student = require('../models/student'),
    ADD_STUDENT = '添加学生';

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
        res.render('student',{title:ADD_STUDENT});
    });

    router.post('/find/:sNo?',function(req,res){
        if (req.params.sNo) {
            Student.getStudentNumBySNO(req.params.sNo,function(err,results){
                if (err) {
                    res.locals.error = 'asdf';
                    return;
                }
                else{
                    res.json(results);
                }
            });
        }
    });

    router.post('/',function(req,res){
    var sNo = req.body['sno'],
        sName = req.body['sname'],
        sBirthday = req.body['birthday'],
        sSex = req.body['sex'],
        sphone = req.body['phone'],
        E_mail = req.body['E_mail'];

    var newStudent = new Student({
        sNo:        sNo,
        sName:      sName,
        sBirthday:  sBirthday,
        sSex:       sSex,
        sphone:     sphone,
        E_mail:     E_mail
    });


            newStudent.save(function (err,result){
                if (err) {
                    res.locals.error = '已有该学生记录';
                    
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

                    res.locals.success = '添加成功';
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
                    
                    
                }

                res.render('student',{title:ADD_STUDENT});

            });
});
module.exports = router;