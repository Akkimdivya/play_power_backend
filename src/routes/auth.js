const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Simple user authentication logic (replace with real user verification)
  if (username === "admin" && password === "password") {
    const user = { id: 1, username: "admin" }; // Example user object
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    return res.json({ accessToken });
  }

  res.status(401).send("Username or password incorrect");
});

module.exports = router;
