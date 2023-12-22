const router = require('express').Router();
const UserController = require('../controllers/user.controllers');

router.post("/create", UserController.Createuser);
router.get("/", UserController.Getuser);
router.get("/friends/:id", UserController.GetOnlineFriends);
router.put("/:id", UserController.Updateuser);
router.delete("/:id", UserController.Deleteuser);
router.put("/:id/follow", UserController.Followuser);
router.put("/:id/unfollow", UserController.Unfollowuser);
router.get("/allusers", UserController.GetAllUsers)
router.post("/login", UserController.Login)

router.get("/search", UserController.SearchUser)

module.exports = router;
