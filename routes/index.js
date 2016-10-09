
var express = require('express'),
    router = express.Router();
    

router.get('/', function(req, res) {
  if(req.cookies.islogin)
  { 
         console.log('cookies:' + req.cookies.islogin);
       req.session.username = req.cookies.islogin;
  }  

  if(req.session.username)
  {    
        console.log('session:' + req.session.username);
        res.locals.username = req.session.username;      
  }

  if (req.session.isrole == 'teacher') {
        res.locals.isrole = req.session.isrole;
        res.render('teacher_index',{title:'主页'});
  }
  else if (req.session.isrole == 'student') {
        res.locals.isrole = req.session.isrole;
        res.render('student_index',{title:'主页'});
  }
  else if (req.session.isrole == 'adm') {
        res.locals.isrole = req.session.isrole;
        res.render('index',{title:'主页'});
  }

  else
  {
        res.redirect('/login');
        return;    
  }

  // res.render('index',{title:'主页'});
  
});


module.exports = router;

