var express = require('express'),
	router = express.Router(),
	Teacher = require('../models/teacher'),
	ADD_TEACHER = '添加老师';

	router.get('/',function(req,res){
		if(req.cookies.islogin){ 

        console.log('cookies:' + req.cookies.islogin);
       	req.session.username = req.cookies.islogin;
  		}  

  		if(req.session.username){    
          
         	console.log('session:' + req.session.username);
        	res.locals.username = req.session.username;      
  		}
  		if (req.session.isrole) {
  			console.log('isrole:' + req.session.isrole);
  			res.locals.isrole = req.session.isrole;
  		}

  		else{

        res.redirect('/login');
        return;    
  		}
		res.render('teacher',{title:ADD_TEACHER});
	});

	router.post('/',function(req,res){
		var tNo = req.body['tno'],
			tName = req.body['tname'],
			tBirthday = req.body['birthday'],
			tSex = req.body['sex'],
			tPhone = req.body['phone'],
			E_mail = req.body['E_mail'];

		var newTeacher = new  Teacher({
			tNo: 		tNo,
			tName: 		tName,
			tBirthday: 	tBirthday,
			tSex: 		tSex,
			tPhone: 	tPhone,
			E_mail: 	E_mail
		});


		Teacher.getTeacherNumByTNO(newTeacher.tNo,function(err,results){
			if (results != null && results[0]['num'] > 0) {
				err = '该教师早已经存在';
			}
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

				res.render('teacher',{title:ADD_TEACHER});
				return;
			}

			newTeacher.save(function (err,result){
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
					res.render('teacher', { title: ADD_TEACHER }); 
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

				res.render('teacher',{title:ADD_TEACHER});

			});
	});
});
	module.exports = router;