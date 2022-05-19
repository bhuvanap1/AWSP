let mongoose = require("mongoose");
const { collection } = require("../models/user.model");
const User = require("../models/user.model");

exports.getAllUsers = function (req, res) {
  User.find({}, function (err, user) {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.createNewUser = function (req, res) {
  var new_user = new User(req.body);
  new_user.save(function (err, user) {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.getUser = function (req, res) {
  User.findById(req.params.userId, function (err, user) {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.updateUser = function (req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    req.body,
    { new: true },
    function (err, user) {
      if (err) res.send(err);
      res.json(user);
    }
  );
};
async function search(s){
  console.log('searching for:'+s);
  const users=await collection.find({$or:[
    {firstname:{$regex:s,$options:'i'}},
    {lastname:{$regex:s,$options:'i'}},
    {handle:{$regex:s,$options:'i'}},
  ]}).toArray();
}

exports.deleteUser = function (req, res) {
  User.remove(
    {
      _id: req.params.userId,
    },
    function (err, user) {
      if (err) res.send(err);
      res.json({ message: "User successfully deleted" });
    }
  );
};
