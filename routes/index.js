const express = require('express');
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


// =======================ROUTES==============================
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
