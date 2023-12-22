const router = require('express').Router();
// const User = require('../models/User');
const UserController = require('../controllers/user.controllers');

//fetch user
router.post("/login", UserController.Login);


module.exports = router;

