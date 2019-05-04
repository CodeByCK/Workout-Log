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



//=====================ADD NEW EXERCISE===================

//? THE ROUTE: /routine/details/5ccc47b841dd15bf711f5b77/new

router.get('/routine/:id/new', isLoggedIn, (req, res, next) => {
  res.render("exercise/new", { currentUser: req.params })
})





//====================SHOW ALL EXERCISES FOR ROUTINE=======
//! taking you to /wer ... (need to figure out where to put the exercise data user inputs)

router.get('/routine/:id/show', isLoggedIn, (req, res, next) => {
  // res.json({ asba: 'asdnk' })
  let routineId = req.params;
  Routine.findById(req.params.id).then((routine) => {
    Exercise.find({ routineId: routine })
      .then(exercise => {
        // res.json(exercise)
        if (exercise.length === 0) {
          res.render(`exercise/show`, { routineId })
        } else {
          res.render(`exercise/show`, { exercise })
        }
      })
      .catch(err => {
        next(err)
      })
  })
})



//==========Send form info to database==========
///? THE ROUTE: /routine/details/:id{{routine.id}}/new


router.post('/routine/:id/new', isLoggedIn, (req, res, next) => {
  // res.json(req.body)
  Routine.findById(req.params.id).then(routine => {
    const { name, reps, sets, weight } = req.body;
    const newExercise = new Exercise({ routineId: routine, name, reps, sets, weight })
    newExercise.save()
      .then((newRoutine) => {
        res.redirect(`/routine/${req.params.id}/show`)
      }).catch(err => {
        console.log(err)
      })
  })

})


module.exports = router;