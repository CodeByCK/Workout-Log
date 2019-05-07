const express = require('express');
const router = express.Router();
const User = require("../models/User");
const Routine = require("../models/Routine");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const moment = require("moment");


function isLoggedIn(req, res, next) {
  console.log(req.session)
  if (req.session.currentUser) { // <== if there's user in the session (user is logged in)
    next(); // ==> go to the next route ---
  } else {                          //    |
    res.redirect("/login");         //    |
  }
}


//===============SHOW ALL  ROUTINES===================
router.get('/routine', isLoggedIn, (req, res, next) => {
  const user = req.session.currentUser

  Routine.find({ userId: user })
    .then(routines => {
      res.render("routine/index", { routines, user });
    }).catch(err => {
      next(err)
    })
});




//===============ADD NEW ROUTINES=====================


router.post('/routine/new', isLoggedIn, (req, res, next) => {
  const { name, description, date } = req.body;
  const user = req.session.currentUser
  // res.json(req.session.currentUser)
  const newRoutine = new Routine({ userId: user, name, description, date })
  newRoutine.save()
    .then((newRoutine) => {
      res.redirect(`/routine/`)
    }).catch(err => {
      next(err)
    })
})



//===============EDIT ROUTINE========================


router.post('/routine/edit', isLoggedIn, (req, res, next) => {
  Routine.findByIdAndUpdate(req.query.id, req.body)
    .then((routine) => {
      res.redirect(req.get('referer'));
    })
    .catch(err =>
      next(err))
})



//===============DELETE ROUTINE =====================

router.get('/routine/delete', isLoggedIn, (req, res, next) => {
  Routine.findByIdAndDelete(req.query.id)
    .then((routines) => {
      res.redirect("/routine/")
    }).catch(error => {
      next(error);
    })
})



module.exports = router;
