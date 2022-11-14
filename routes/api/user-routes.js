const router = require("express").Router();

const {
  getAllUsers,
  getUserId,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/user-controllers");

// /api/users
router.route("/").get(getAllUsers).post(createUser);

// /api/users/:id
router.route("/:id").get(getUserId).put(updateUser).delete(deleteUser);

module.exports = router;
