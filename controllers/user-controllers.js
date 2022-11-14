const { User, Thought } = require("../models");

const userControl = {
  // GRAB ALL USERS
  getAllUsers(req, res) {
    User.find({})
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // GRAB USER BY ID
  getUserId({ params }, res) {
    User.findOne({})
      .then((userId) => {
        if (!dbUserData) {
          res
            .status(404)
            .json({ message: "No User can be found with the id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // CREATE/POST NEW USER
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  // UPDATE EXISTING USER
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res
            .status(404)
            .json({ message: 'Cannot update a user that doesn"t exist' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  // DELETE USER
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "There is no such user." });
        }
      })
      .then(() => {
        res.json({ message: "User and thoughts have been deleted!" });
      })
      .catch((err) => res.json(err));
  },
};
module.exports = userControl;
