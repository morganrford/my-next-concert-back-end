const express = require("express");
const router = express.Router();
const auth = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Sign-Token Route

router.get("/sign-token", (req, res) => {
  const user = {
    _id: 1,
    username: "test",
    password: "test",
  };
  const token = auth.sign({ user }, process.env.JWT_SECRET);
  res.json({ token });
});

//Verify Token Route

router.post("/verify-token", (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = auth.verify(token, process.env.JWT_SECRET);

    res.json({ decoded });
  } catch (err) {
    res.status(401).json({ err: "Invalid token." });
  }
});

module.exports = router;
