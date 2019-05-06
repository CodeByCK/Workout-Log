const express = require('express');
const router = express.Router();
const User = require("../models/User");
const Routine = require("../models/Routine");
const Exercise = require("../models/Exercise")
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


function isLoggedIn(req, res, next) {
  console.log(req.session)
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/login");
  }
}


//====================SHOW ALL EXERCISES FOR ROUTINE=======

router.get('/routine/:id/', isLoggedIn, (req, res, next) => {
  Routine.findById(req.params.id).then((routine) => {
    Exercise.find({ routineId: routine })
      .then(exercise => {
        res.render(`exercise/show`, { exercise })
      })
      .catch(err => {
        next(err)
      })
  })
})



//==========Send form info to database==========
///? THE ROUTE: /routine/details/:id{{routine.id}}/new


router.post('/routine/:id/', isLoggedIn, (req, res, next) => {
  Routine.findById(req.params.id).then(routine => {
    const { name, reps, sets, weight } = req.body;
    const newExercise = new Exercise({ routineId: routine, name, reps, sets, weight })
    newExercise.save()
      .then((newRoutine) => {
        res.redirect(`/routine/${req.params.id}/`)
      }).catch(err => {
        console.log(err)
      })
  })
})


//================DELETE EXERCISE=============

router.post('/deleteExercise', (req, res, next) => {
  Exercise.findByIdAndDelete(req.body.exerciseId)
    .then(exercise => {
      res.redirect("./")
    })
    .catch(err => {
      next(err)
    })
})


//=================EDIT EXERCISE===============

router.post('/editExercise', (req, res, next) => {
  let { name, reps, sets, weight } = req.body
  Exercise.findByIdAndUpdate(req.body.exerciseId, { name, reps, sets, weight })
    .then(exercise => {
      res.redirect("./")
    })
    .catch(err => {
      next(err)
    })
})




module.exports = router;