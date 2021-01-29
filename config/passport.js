const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');


const getUserData = function(username, callback) {
  console.log(username);
  global.connection.query(`SELECT * FROM pn1yme2p_rafting.login WHERE email='${username}'`, function(error, rows, fields) {
    if (error) throw error;
    if (rows.length > 0) {
      callback(rows[0]);	
    }else{
      callback(null);
    }		
  });	    
}

const checkCredentials = function(username, password, callback) {
  getUserData(username, function(data) {
    console.log('checkcredentials');
    //console.log(password, data.pass);
    callback((data != null && data.pass === password) && data.id_tipo === 6);
  });
}

const addLoginGETRoute = function(app) {
  app.get('/loginget', function(req, res) {
    if (req.isAuthenticated()) {
      res.redirect('/admin');
    }else{
      res.redirect('/');
    }
  });
};

  function addLoginPOSTRoute(app) { 
  app.post('/login', function(req, res) {
    console.log(req.body);
    let email = req.body.email;
    let password = req.body.password;
    let data = {email: email, password: password};
    let target = (req.query.t ? req.query.t : '/loginget');

    /*req.checkBody('username', 'Username should have between 5 and 10 chars').isLength({min: 5, max: 10});
    
    req.checkBody('password', 'Password should have between 8 and 15 chars').isLength({min: 8, max: 15});*/

    //let validationErrors = req.validationErrors();   

    /*if (validationErrors) {
      res.render('/', {
        errors: validationErrors,
        username: username
      });
      return;
    }*/

    checkCredentials(email, password, function(valid) {
      if (valid === true) {
        req.login(email, function(err) {
          console.log("login");
          console.log(target);
				  res.redirect(target);
			  });		
      }else{
        console.log("try again");
        res.redirect('/');
      }
    });
  });
};

// const addLoginPOSTRoute = function(app) { 
//   app.post('/login', function(req, res) {
//     console.log(req.body);
//     let username = req.body.email;
//     let password = req.body.password;

//     checkCredentials(username, password, function(valid) {
//       console.log('funcao cehck');
//       if (valid === true) {
//         req.login(username, function(err) {
// 				  res.redirect('/participante');
// 			  });		
//       }else{
//         res.redirect('/', {         
//           errors: [{msg: 'Invalid credentials provided'}],
//           username: username
//         });
//       }
//     })
//   });
// }

// function addLoginPOSTRoute(app) { 
//   app.post('/', function(req, res) {
//     let username = req.body.email;
//     let password = req.body.password;
//     let data = {username: username, password: password};
//     console.log(data);
//     let target = (req.query.t ? req.query.t : '/login');

//     /*req.checkBody('username', 'Username should have between 5 and 10 chars').isLength({min: 5, max: 10});
    
//     req.checkBody('password', 'Password should have between 8 and 15 chars').isLength({min: 8, max: 15});*/

//     //let validationErrors = req.validationErrors();   

//     /*if (validationErrors) {
//       res.render('/', {
//         errors: validationErrors,
//         username: username
//       });
//       return;
//     }*/

//     checkCredentials(username, password, function(valid) {
//       if (valid === true) {
//         req.login(username, function(err) {
//           console.log("login");
//           console.log(target);
// 				  res.redirect(target);
// 			  });		
//       }else{
//         console.log("try again");
//         res.redirect('/');
//       }
//     });
//   });
// };

const addLogoutRoute = function(app) {
  app.get('/logout', function(req, res) {
    if (req.isAuthenticated()) {
      req.logout();
      req.session.destroy();
    }
    res.redirect('/');
  });
}

const addSessions = function(app) {
  app.use(cookieParser());
  app.use(session({
	  secret: 'someRandomSecretKey',
	  resave: false,
	  saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
}

const addUsersDataToViews = function(app) {
  app.use(function(request, response, next) {
	  response.locals.user = request.user;
	  response.locals.isAuthenticated = request.isAuthenticated();
	  next();
  });
}

const authenticationdMiddleware = function(type, onFailure) {
  return function (req, res, next) {
    let hasAccess = req.isAuthenticated() && (type ? type === req.user.type : true);

    if (hasAccess) {
      next();
    }else{
      onFailure(res);
    }    
}} 

const addSecureOptions = function() {  
  global.redirectIfNotLogged = function(type) {
    return function (req, res, next) {
      let hasAccess = req.isAuthenticated() && (type ? type === req.user.type : true);
      if (hasAccess) {
        next();
      }else{
        res.redirect(`/login?t=${req.originalUrl}`);
      }    
    }  
  }
  global.forbidIfNotLogged = function(type) {
    return function (req, res, next) {
      let errorMsg = `Access to ${req.originalUrl} was forbidden.`;
      let hasAccess = req.isAuthenticated() && (type ? type === req.user.type : true);
      if (hasAccess) {
        next();
      }else{
        res.status(403).json({error: {msg: errorMsg}, response: null}); 
      }    
    }  
  }
}

module.exports = {  
  applyTo: function(app) {

    addSecureOptions();
    addSessions(app);
    addLoginGETRoute(app);  
    addLoginPOSTRoute(app);
    addLogoutRoute(app);
    addUsersDataToViews(app);

    passport.serializeUser(function(username, callback) {
	    callback(null, username);
    });   

    passport.deserializeUser(function(username, callback) {  
      getUserData(username, function(data) {
        callback(null, data);
      });
    });  


  }  
}