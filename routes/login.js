var express = require('express'),
    router = express.Router(),
    User = require('../models/user.js'),
    crypto = require('crypto'),
    TITLE_LOGIN = '登录';

router.get('/', function(req, res) {
    res.render('login',{title:TITLE_LOGIN});
});

router.post('/', function(req, res) {
    var userName = req.body['txtUserName'],
        userPwd = req.body['txtUserPwd'],
        isRem = req.body['chbRem'],
        isRole = req.body['optionsRadios'],
        md5 = crypto.createHash('md5');
        
        userPwd = md5.update(userPwd).digest('hex');

        User.getUserByUserName(userName,isRole, function (err, results) {                            
        
        if(results == '')
        {
            res.locals.error = '用户不存在';
             res.render('login',{title:TITLE_LOGIN});
             return;
        }

         
         if(results[0].username != userName || results[0].password != userPwd || results[0].permission != isRole)
         {
             res.locals.error = '用户名或密码有误' ;
             res.render('login',{title:TITLE_LOGIN});
             console.log("用户名或密码有误");
             return;
         }
         else
         {
             if(isRem)
             {
                res.cookie('islogin', userName, { maxAge: 660000 });                 
             }

            res.locals.username = userName;
            req.session.username = res.locals.username; 

            res.locals.isrole = isRole; 
            req.session.isrole = res.locals.isrole

            console.log(req.session.username);                        
            res.redirect('/');
            return;
         }     
    });              
});

module.exports = router;

