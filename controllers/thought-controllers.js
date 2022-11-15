const { Thought, User } = require("../models");

const thoughtControl = {
  // GRAB ALL USERS THOUGHTS
  allThoughts(req, res) {
    Thought.find({})
      .sort({ _id: -1 })
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // GRAB THOUGHTS BY ID
  thoughtId({ params }, res) {
    Thought.findOne({})
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "No thought found!" });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // CREATE THOUGHT
  createThought({ params, body }, res) {
    Thought.create(body)
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "No thought found!" });
          return;
        }
        res.json(thoughtData);
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
