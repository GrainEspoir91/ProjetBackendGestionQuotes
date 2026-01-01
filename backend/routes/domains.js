const express = require("express");
const pool = require("../db");
const auth = require("../authMiddleware");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const r = await pool.query("SELECT * FROM domains ORDER BY domain");
  res.json(r.rows);
});

router.post("/", auth, async (req, res) => {
  const { domain } = req.body;
  const r = await pool.query(
    "INSERT INTO domains (domain) VALUES ($1) RETURNING *",
    [domain]
  );
  res.json(r.rows[0]);
});

module.exports = router;
