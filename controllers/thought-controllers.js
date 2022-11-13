const { Thought, User } = require("../models");

const thoughtControl = {
  // GRAB ALL USERS THOUGHTS
  allThoughts(req, res) {
    Thought.find({})
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
};

module.exports = thoughtControl;
