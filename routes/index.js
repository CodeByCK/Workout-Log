const express = require('express');
const router = express.Router();
const User = require("../models/User");
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

// router.get('/profile', isLoggedIn, (req, res, next) => {
//   res.render('profile', { user: req.session.currentUser });
// });



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

//======================Edit profile=============================
router.post('/profile/edit/', isLoggedIn, (req, res, next) => {
  // const user = req.session.currentUser
  console.log('wexwexwexwxkexelclr/c', req.session.currentUser._id)
  let { displayName, username, location, training, goal, bio } = req.body

  User.findByIdAndUpdate(req.session.currentUser._id, { displayName, username, location, training, goal, bio })
    .then(exercise => {
      res.redirect(req.get('referer'));
      // res.redirect('/profile')
      // res.json(exercise)
    })
    .catch(err => {
      next(err)
    })
})



module.exports = router;
