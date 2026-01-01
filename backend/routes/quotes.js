const express = require("express");
const pool = require("../db");
const auth = require("../authMiddleware");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const r = await pool.query(`
    SELECT c.id, c.quote, c.reference,
           a.name AS author, d.domain AS domain
    FROM quotes c
    LEFT JOIN authors a ON c.author_id = a.id
    LEFT JOIN domains d ON c.domain_id = d.id
    ORDER BY c.created_at DESC
  `);
  res.json(r.rows);
});

router.post("/", auth, async (req, res) => {
  const { quote, reference, author_id, domain_id } = req.body;

  const r = await pool.query(
    `INSERT INTO quotes (quote, reference, author_id, domain_id)
     VALUES ($1,$2,$3,$4) RETURNING *`,
    [quote, reference, author_id, domain_id]
  );

  res.json(r.rows[0]);
});

module.exports = router;
