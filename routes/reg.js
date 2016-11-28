var express = require('express'),
    router = express.Router(),
    User = require('../models/user.js'),
    crypto = require('crypto'),
    TITLE_REG = '注册';

router.get('/', function(req, res) {
  res.render('reg',{title:TITLE_REG});
});

router.post('/', function(req, res) {
  var userName = req.body['txtUserName'],
      userPwd = req.body['txtUserPwd'],
      userRePwd = req.body['txtUserRePwd'],
      isRole = req.body['optionsRadios'],      
      md5 = crypto.createHash('md5');
 
      userPwd = md5.update(userPwd).digest('hex');

  var newUser = new User({
      username: userName,
      password: userPwd,
      permission: isRole
  });

  //检查用户名是否已经存在
  if (isRole == 'teacher') {
  User.getUserNumByName(newUser, function (err, results) {        
             
      if (err) {
          res.locals.error = err;
          res.render('reg', { title: TITLE_REG });
          return;
      } else {
          if (results != null && results[0]['num'] > 0) {
              err = '用户名已存在';
          }  else {
            User.searchTeacher(newUser.username,function(err,results){
                if (results !=null && results[0]['num'] > 0) {
                
                    newUser.save(function (err,result) {
                        if (err) {
                            res.locals.error = err;
                            res.render('reg', { title: TITLE_REG }); 
                            return;            
                        } else{
              
                        res.locals.success = '注册成功,请点击   <a class="btn btn-link" href="/login" role="button"> 登录 </a>' ;
                        }
                    res.render('reg', { title: TITLE_REG });
                 });

                }else {
                    err = '没有该老师';
                }
                if (err) {
                    res.locals.error = err;
                    res.render('reg',{title:TITLE_REG});
                }
            });               
          }      
      }

       
      });
    } else if (isRole == 'student') {
  User.getUserNumByName(newUser, function (err, results) {        

      if (err) {
          res.locals.error = err;
          res.render('reg', { title: TITLE_REG });
          return;
      } else {
          if (results != null && results[0]['num'] > 0) {
              err = '用户名已存在';
          } else {
            User.searchStudent(newUser.username,function(err,results){
                if (results !=null && results[0]['num'] > 0) {
                
                    newUser.save(function (err,result) {
                        if (err) {
                            res.locals.error = err;
                            res.render('reg', { title: TITLE_REG }); 
                            return;            
                        } else{
              
                        res.locals.success = '注册成功,请点击   <a class="btn btn-link" href="/login" role="button"> 登录 </a>' ;
                        }
                    res.render('reg', { title: TITLE_REG });
                 });

                }else {
                    err = '没有该学生';
                }
                if (err) {
                    res.locals.error = err;
                    res.render('reg',{title:TITLE_REG});
                }
            });               
          }       
      }

       
      });       
    } else {
        User.getUserNumByName(newUser, function (err, results) {        
             


      if (err) {
          res.locals.error = err;
          res.render('reg', { title: TITLE_REG });
          return;
      } else {
          if (results != null && results[0]['num'] > 0) {
              var  error = '用户名已存在';
              res.locals.error = error;
              res.render('reg',{title: TITLE_REG});

          } else {
            User.searchAdm(newUser.username,function(err,results){
                if (results !=null && results[0]['num'] > 0) {
                
                    newUser.save(function (err,result) {
                        if (err) {
                            res.locals.error = err;
                            res.render('reg', { title: TITLE_REG }); 
                            return;            
                        } else{
              
                        res.locals.success = '注册成功,请点击   <a class="btn btn-link" href="/login" role="button"> 登录 </a>' ;
                        }
                    res.render('reg', { title: TITLE_REG });
                 });

                }else {
                    err = '没有该管理员';
                }
                if (err) {
                    res.locals.error = err;
                    res.render('reg',{title:TITLE_REG});
                }
            });              
          }

      
      }

        
      });
    }  
});

module.exports = router;