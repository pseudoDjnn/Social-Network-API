const { Thought, User } = require("../models");

const thoughtControl = {
  // GRAB ALL USERS THOUGHTS
  allThoughts(req, res) {
    Thought.find({})
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // GRAB THOUGHTS BY ID
  thoughtId({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: "No thought found!" });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // CREATE THOUGHT
  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: "No thought found!" });
        }
        res.json({ message: "Success!" });
      })
      .catch((err) => res.json(err));
  },

  // UPDATE THOUGHTS BY ID
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: "There is no thought with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  // DELETE THOUGHTS
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res
            .status(404)
            .json({ message: "There is no thought with this id!" });
        }
        // REMOVE THOUGHT FROM USERS 'THOUGHTS' FIELD
        return User.findOneAndUpdate(
          { thoughts: params.id },
          // $pull REMOVES 'params.id'
          { $pull: { thoughts: params.id } },
          { new: true }
        );
      })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res
            .status(404)
            .json({ message: "There is a thought, yet no user with this id!" });
        }
        res.json({ message: "Thought deleted!" });
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtControl;
