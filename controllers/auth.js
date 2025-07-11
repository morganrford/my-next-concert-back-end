const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

//Sign In

router.post("/sign-in", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({ err: "Invalid credentials." });
    }
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.hashedPassword
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ err: "Invalid credentials." });
    }
    const payload = { username: user.username, _id: user._id };
    const token = jwt.sign({ payload }, process.env.JWT_SECRET);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

//Sign Up

router.post("/sign-up", async (req, res) => {
  const saltRounds = 12;
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      return res.status(409).json({ err: "Username already taken." });
    }
    const user = await User.create({
      username: req.body.username,
      hashedPassword: bcrypt.hashSync(req.body.password, saltRounds),
    });
    const payload = { username: user.username, _id: user._id };
    const token = jwt.sign({ payload }, process.env.JWT_SECRET);
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

module.exports = router;
