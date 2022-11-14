const router = require("express").Router();

const {
  getAllUsers,
  getUserId,
  createUser,
} = require("../../controllers/user-controllers");

// /api/users
router.route("/").get(getAllUsers).post(createUser);

// /api/users/:id
router.route("/:id").get().put().delete();

module.exports = router;
