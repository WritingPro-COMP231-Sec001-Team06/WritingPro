let express = require("express");
let router = express.Router();
let mongoose=require('mongoose');
let passport=require('passport');

// create the visitor model instance
let visitorModel=require('../models/visitor');
let Visitor = visitorModel.Visitor; // alias

//let userProfile = require('../models/examplemodel');

module.exports.displayHomePage = (req, res, next) => {
    if(req.user){
        return res.redirect("/" + req.user.role);
    }
    res.render("index", { title: "Home Page",
    role: "", 
    username: req.user ? req.user.username: '' });
};

module.exports.displayLoginPage = (req, res, next) => {
  // check if the user is already logged in
  if(!req.user)
  {
       res.render('auth/login',
       {
           title: "Login",
           role: "", 
           messages: req.flash('loginMessage'),
           username: req.user ? req.user.username: ''

       })
  }else
  {
      return res.redirect('/');
  }
}

module.exports.processLoginPage = (req, res, next) => {
  passport.authenticate('local',
  (err, user, info) => {
      // server error?
      if(err)
      {
          return next(err);
      }
      // is there a visitor login error?
      if(!user)
      {
          req.flash('loginMessage', 'Authentication Error');
          return res.redirect('/login');
      }
      req.login(user, (err) => {
          //server error?
          if(err)
          {
              return next(err);
          }
          return res.redirect('/');
      });
  })(req, res, next);

}

module.exports.displayRegisterPage = (req, res, next) => {
  // check if the user is not already logged in
if(!req.user)
{
    console.log("Here1");
    res.render('auth/register',
    {
        title: 'Register',
        role: "", 
        messages: req.flash('registerMessage'),
        username: req.user ? req.user.username : ''
    });
}
else
{
    console.log("Here2");
    return res.redirect('/');
}

}

module.exports.processRegisterPage = (req, res, next) => {
 // instantiate a visitor object

 let newVisitor = new Visitor({
    username: req.body.username,
     //password cover
     //password: req.body,password,
     firstName: req.body.firstName,
     lastName: req.body.lastName,
     address: req.body.address,
     city: req.body.city,
     country: req.body.country,
     firstLanguage: req.body.firstLanguage,
     startingIELTSLevel: req.body.startingIELTSLevel,
     targetScore: req.body.targetScore,
     targetTestCountry : req.body.targetTestCountry,
     role: "student",
     isApproved: true
     //displayName: req.body.displayName
 });

 console.log(newVisitor);
 
 Visitor.register(newVisitor, req.body.password, (err) => { 
     if(err)
     {
         // seems no problem in data
         console.log('Error: Inserting New Visitor');
         console.log(err);
         if(err.name == "UserExistError")
         {
             req.flash(
                 'registerMessage',
                 'Registration Error: Visitor Already Exists!'
             );
             console.log('Error: Visitor Already Exists!')
         }
         return res.redirect('/register');
         
     }
     else
     {
         //if no error exists, then registration is successful

         // redirect the user and authenticate them

         return passport.authenticate('local')(req, res, () => {
         res.redirect('/')
         console.log('success register');
         });

     }
 })

}

module.exports.performLogout = (req, res, next) => {
  req.logout();
  res.redirect('/login');

}

module.exports.displayAdminLoginPage = (req, res, next) => {
    // check if the user is already logged in
    if(!req.user)
    {
         res.render('auth/adminLogin',
         {
             title: "Login",
             role: "", 
             messages: req.flash('loginMessage'),
             username: req.user ? req.user.username: ''
  
         })
    }else
    {
        return res.redirect('/');
    }
  }
  
  module.exports.processAdminLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        // server error?
        if(err)
        {
            return next(err);
        }
        // is there a visitor login error?
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/adminLogin');
        }
        if(user.username =='admin@admin.com'){
        req.login(user, (err) => {
            //server error?
            if(err)
            {
                return next(err);
            }
            
            return res.redirect('/admin');
            
        });}
        else{
            req.flash('loginMessage', 'Not a valid Admin ID');
            return res.redirect('/adminLogin');
        }
    })(req, res, next);
  
  }

module.exports.displayInstructorRegistrationPage = (req, res, next) => {
    if(!req.user)
    {
        res.render('auth/instructorRegistration',
        {
            title: 'Register',
            role: "", 
            messages: req.flash('registerMessage'),
            username: req.user ? req.user.username : ''
        });
    }
    else
    {
        return res.redirect('/');
    }
};

module.exports.processInstructorRegistration = (req, res, next) => {
    // instantiate a visitor object
   
    let newVisitor = new Visitor({
       username: req.body.username,
        //password cover
        //password: req.body,password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        firstLanguage: "",
        startingIELTSLevel: 0,
        targetScore: 0,
        targetTestCountry : "",
        role: "instructor",
        isApproved: false
        //displayName: req.body.displayName
    });
   
    console.log(newVisitor);
    
    Visitor.register(newVisitor, req.body.password, (err) => { 
        if(err)
        {
            // seems no problem in data
            console.log('Error: Inserting New Visitor');
            console.log(err);
            if(err.name == "UserExistError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: Visitor Already Exists!'
                );
                console.log('Error: Visitor Already Exists!')
            }
            return res.redirect('/register');
            
        }
        else
        {
            //if no error exists, then registration is successful
   
            // redirect the user and authenticate them
   
            return passport.authenticate('local')(req, res, () => {
            res.redirect('/')
            console.log('success register');
            });
            
        }
    });
   
};
/*module.exports.exampleCreatePage = (req, res, next) => {
  console.log('Here');
  userProfile.create({
    username: "dbslapitan",
    password: 'password',
    firstName: 'Dirk Brandon',
    lastName: 'Lapitan',
    email: 'dbslapitan@gmail.com',
    dateCreated: Date.now(),
  },
  (err, survey) => {
    if(err)
        {
            console.log(err);
            res.end(err);
        }
    res.redirect('/');
  });
};*/

