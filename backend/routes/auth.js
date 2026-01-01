const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      "INSERT INTO users (username, password_hash) VALUES ($1,$2) RETURNING id",
      [username, hash]
    );
    res.json({ id: result.rows[0].id });
  } catch (e) {
    res.status(400).json({ message: "Utilisateur existe déjà" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const result = await pool.query(
    "SELECT * FROM users WHERE username=$1",
    [username]
  );

  const user = result.rows[0];
  if (!user) return res.status(400).json({ message: "Identifiants invalides" });

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(400).json({ message: "Identifiants invalides" });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  res.json({ token });
});

module.exports = router;
