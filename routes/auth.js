const express = require('express');
const router = express.Router();
const User = require("../models/User");

//encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


// =======================ROUTES==============================

router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
})

router.get('/login', (req, res, next) => {
  res.render('auth/login')
})


// ========================LOGIN==================================
router.post("/login", (req, res, next) => {
  const theUsername = req.body.username;
  const thePassword = req.body.password;

  if (theUsername === "" || thePassword === "") {
    res.render("auth/login", {
      errorMessage: "Please enter both, username and password to sign up."
    });
    return;
  }

  User.findOne({ "username": theUsername })
    .then(user => {
      if (!user) {
        res.render("auth/login", {
          errorMessage: "The username doesn't exist."
        });
        return;
      }
      if (bcrypt.compareSync(thePassword, user.password)) {
        // Save the login in the session!
        req.session.currentUser = user;
        res.redirect("/dashboard");
      } else {
        res.render("auth/login", {
          errorMessage: "Incorrect password"
        });
      }
    })
    .catch(error => {
      next(error);
    })
});

//=====================SIGNING UP=================================

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const displayName = req.body.displayName;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  //Field must be filled or Error message pops up
  if (username === "" || password === "" || displayName === "") {
    res.render("auth/signup", {
      errorMessage: "Must fill all fields"
    });
    return;
  }

  //If the user already exists...  Display error message
  User.findOne({ "username": username })
    .then(user => {
      if (user !== null) {
        res.render("auth/signup", {
          errorMessage: "The username already exists!"
        });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
      User.create({
        username,
        password: hashPass,
        displayName
      })
        .then(() => {
          res.redirect("/dashboard");
        })
        .catch(error => {
          console.log(error);
        })
    })
    .catch(error => {
      next(error);
    })
})

//================= IF CURRENT USER IS LOGGED IN =================
function isLoggedIn(req, res, next) {
  console.log(req.session)
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/login");
  }
}

router.get("/dashboard", isLoggedIn, (req, res, next) => {
  console.log(req.session)
  res.render("dashboard", { user: req.session.currentUser });
});



//=====================LOG OUT=================================
router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    // can't access session here
    res.redirect("/login");
  });
});

module.exports = router;
