const express = require('express');
const router = express.Router();
const User = require("../models/User");
const Routine = require("../models/Routine");
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


//===============SHOW ALL  ROUTINES===================
router.get('/routine', isLoggedIn, (req, res, next) => {
  Routine.find()
    .then(routines => {
      res.render("routine/index", { routines });
    })
});

//===============ADD NEW ROUTINES=====================
router.get('/routine/new', isLoggedIn, (req, res, next) => {
  res.render("routine/new");
});

//==============ADD ROUTINE TO DATABASE===============
router.post('/routine/new', isLoggedIn, (req, res, next) => {
  const { name, description } = req.body;
  const newRoutine = new Routine({ name, description })
  newRoutine.save()
    .then((newRoutine) => {
      res.redirect("/routine")
    })
})

//===============EDIT ROUTINE========================
router.get('/routine/edit', isLoggedIn, (req, res, next) => {
  Routine.findById(req.query.id)
    .then((routine) => {
      res.render("routine/edit", { routine });
    })
    .catch((error) => {
      console.log(error);
    })
});


router.post('/routine/edit', isLoggedIn, (req, res, next) => {
  Routine.findByIdAndUpdate(req.query.id, req.body)
    .then((routine) => {
      res.redirect("/routine")
    }).catch(err => console.error(err))
})


//===============DELETE ROUTINE =====================

router.get('/routine/delete', isLoggedIn, (req, res, next) => {
  Routine.findByIdAndDelete(req.query.id)
    .then((routines) => {
      res.redirect("/routine/")
    })
})





module.exports = router;
