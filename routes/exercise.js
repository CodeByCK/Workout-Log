const express = require('express');
const router = express.Router();
const User = require("../models/User");
const Routine = require("../models/Routine");
const Exercise = require("../models/Exercise")
const bcrypt = require("bcrypt");
const bcryptSalt = 10;



// router.get('/routine/details/:id/new', isLoggedIn, (req, res, next) => {
//   res.render("routine/new");
// })

function isLoggedIn(req, res, next) {
  console.log(req.session)
  if (req.session.currentUser) { // <== if there's user in the session (user is logged in)
    next(); // ==> go to the next route ---
  } else {                          //    |
    res.redirect("/login");         //    |
  }
}


//! /routine/details/5ccc47b841dd15bf711f5b77/new
//=====================ADD NEW EXERCISE===================
router.get('/routine/details/:id/new', isLoggedIn, (req, res, next) => {
  res.render("exercise/new")
})

//====================SHOW ALL EXERCISES FOR ROUTINE=======
router.get('/routine/details/:id/new', isLoggedIn, (req, res, next) => {
  Exercise.find()
    .then(exercise => {
      res.render("/routine/details/:id", { exercise })
        .catch(err => {
          next(err)
        })
    })
})


///! /routine/details/:id{{routine.id}}/new
router.post('/routine/details/:id/new', isLoggedIn, (req, res, next) => {
  const { name, reps, sets, weight, routineId } = req.body;
  const newExercise = new Exercise({ name, reps, sets, weight, routineId })
  newExercise.save()
    .then((newRoutine) => {
      res.redirect(`/routine/details/${newRoutine._id}`)
    }).catch(err => {
      console.log(err)
    })
})


module.exports = router;