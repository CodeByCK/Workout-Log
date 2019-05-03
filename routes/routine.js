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

  Routine.find({ userId: req.session.currentUser })
    .then(routines => {
      res.render("routine/index", { routines });
    }).catch(err => {
      console.log(err)
    })
});

//===============ADD NEW ROUTINES=====================
router.get('/routine/new', isLoggedIn, (req, res, next) => {
  res.render("routine/new");
})

//==============ADD ROUTINE TO DATABASE===============
router.get('/routine/details/:id', (req, res, next) => {
  Routine.findById(req.params.id).then(routineDetail => {
    // res.json(routineDetail)
    res.render("routine/details", { routineDetail })
      .catch(err => {
        next(err)
      })
  })
})


router.post('/routine/new', isLoggedIn, (req, res, next) => {
  const { name, description } = req.body;
  // res.json(req.session.currentUser)
  const newRoutine = new Routine({ userId: req.session.currentUser, name, description })
  newRoutine.save()
    .then((newRoutine) => {
      res.redirect(`/routine/details/${newRoutine._id}`)
    }).catch(err => {
      console.log(err)
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
    }).catch(err => {
      console.log(err)
    })
})





module.exports = router;
