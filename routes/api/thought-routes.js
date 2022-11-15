const router = require("express").Router();

const {
  allThoughts,
  thoughtId,
  createThought,
  updateThought,
  deleteThought,
} = require("../../controllers/thought-controllers");

// /api/thoughts
router.route("/").get(allThoughts).post(createThought);

// /api/thoughts/:id
router.route("/:id").get(thoughtId).put(updateThought).delete(deleteThought);

module.exports = router;
