const express = require("express");
const pool = require("../db");
const auth = require("../authMiddleware");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const r = await pool.query("SELECT * FROM authors ORDER BY name");
  res.json(r.rows);
});

router.post("/", auth, async (req, res) => {
  const { name, bio } = req.body;
  const r = await pool.query(
    "INSERT INTO authors (name, bio) VALUES ($1,$2) RETURNING *",
    [name, bio]
  );
  res.json(r.rows[0]);
});

module.exports = router;
