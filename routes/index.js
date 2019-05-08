const express = require('express');
const router = express.Router();
const User = require("../models/User");
const Routine = require("../models/Routine");
const uploadCloud = require('../config/cloudinary.js');
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

function isLoggedIn(req, res, next) {
  console.log(req.session)
  if (req.session.currentUser) { // <== if there's user in the session (user is logged in)
    next(); // ==> go to the next route ---
  } else {                          //    |
    res.redirect("/login");         //    |
  }
}

// =======================ROUTES=======================================
router.get('/', (req, res, next) => {
  res.render('home', { user: req.session.currentUser })
});

router.get('/faq', (req, res, next) => {
  res.render('faq', { user: req.session.currentUser });
});


//======================Showing all users in community page================
//Renders all users in the community tab
router.get('/community', isLoggedIn, (req, res, next) => {
  const user = req.session.currentUser
  User.find().then(allUsers => {
    res.render('community', { allUsers, user })
      .catch(err => {
        next(err)
      })
  })
})


//=======================Show Profile Details===================

router.get('/profile', isLoggedIn, (req, res, next) => {
  const user = req.session.currentUser
  User.findById(user._id)
    .then(info => {
      res.render('profile', { info, user });
    }).catch(err => {
      next(err)
    })
});

//======================Edit User Profile=============================
router.post('/profile/edit/', uploadCloud.single('photo'), isLoggedIn, (req, res, next) => {
  let img = req.file.url;
  // console.log('dsadsdasasad', img)
  let { displayName, username, location, training, goal, bio } = req.body
  User.findByIdAndUpdate(req.session.currentUser._id, { displayName, username, location, training, goal, bio, img })
    .then(exercise => {
      res.redirect(req.get('referer'));
    })
    .catch(err => {
      next(err)
    })
})


//============================ Community Profiles===========================


router.get('/profile/:id', isLoggedIn, (req, res, next) => {
  User.findById(req.params.id).then((user) => {
    Routine.find({ userId: user })
      .then(routines => {
        res.render(`userProfile`, { routines, user })
      })
  }).catch(err => {
    next(err)
  })
})



module.exports = router;
