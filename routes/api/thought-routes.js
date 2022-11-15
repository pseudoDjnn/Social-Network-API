const router = require("express").Router();

const {
  allThoughts,
  thoughtId,
  createThought,
} = require("../../controllers/thought-controllers");

// /api/thoughts
router.route("/").get(allThoughts).post(createThought);

module.exports = router;
