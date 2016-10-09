/*查找学生模块路由
@author: yuanzp
@date  :2016/9/28
*/

var express = require('express'),
	router = express.Router(),
	Student = require('../models/student'),
	SEARCH_TITLE = '查找学生';

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
	res.render('search_Student',{title:SEARCH_TITLE});	
});

router.post('/search/:sNo?',function(req,res){
    if (req.params.sNo) {
        Student.getStudentBySNO(req.params.sNo,function(err,results){
            if (results == null) {
                err = '没有找到该学生';
            }
            if (err) {
                res.locals.error = err;
                res.render('search_Student',{title:SEARCH_TITLE});
                return;
            }else {
                res.json(results);
                console.log(results.sNo);
            }
        });
    }
});

router.post('/del/:sno?',function(req,res) {
    if (req.params.sno) {
        Student.delStudentBySNO(req.params.sno,function(err,results) {
            if (err) {
                res.locals.error = '删除失败';
                return;
            }
            else{
                console.log(results.affectedRows);
                res.json(results);
                res.end();
            }            
        });
    }
});

router.post('/updata/:student?',function(req,res) {
    if (req.params.student) {
        var student = eval("("+req.params.student+")");
        Student.updataStudentBySNO(student,function(err,results) {
            if (err) {
                res.locals.error = '更新失败';
                return;
            }
            else {
                res.locals.success = '更新成功';
                res.end()
            }
        });
    }
});

router.get('/allstudent',function(req,res) {
    Student.searchallStudent(function(err,results){
        if (results == null) {
            err='没有找到学生';
        }
        if (err) {
            res.locals.error = err;
            res.render('search_Student',{title:'查询所有学生失败'});
            return;
        }else{
            res.json(results);
            res.end();
        }
    });
});

module.exports = router;