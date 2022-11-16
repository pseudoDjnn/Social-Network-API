const router = require("express").Router();

const {
  allThoughts,
  thoughtId,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thought-controllers");

// /api/thoughts
router.route("/").get(allThoughts).post(createThought);

// /api/thoughts/:id
router.route("/:id").get(thoughtId).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtsId/reactions
router.route("/:thoughtId/reactions").post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
