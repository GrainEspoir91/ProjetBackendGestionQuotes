const express = require("express");
const router = express.Router();
const pool = require("../db");
const authMiddleware = require("../authMiddleware");

// GET all quotes with author/domain names
router.get("/", authMiddleware, async (req, res) => {
  const { rows } = await pool.query(
    `SELECT q.id, q.quote, q.reference, a.name AS author, d.domain
     FROM quotes q
     LEFT JOIN authors a ON q.author_id = a.id
     LEFT JOIN domains d ON q.domain_id = d.id
     ORDER BY q.id DESC`
  );
  res.json(rows);
});

// POST new quote
router.post("/", authMiddleware, async (req, res) => {
  const { quote, reference, author_id, domain_id } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO quotes(quote,reference,author_id,domain_id)
       VALUES($1,$2,$3,$4) RETURNING *`,
      [quote, reference, author_id, domain_id]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Erreur lors de l'ajout de la citation" });
  }
});

// DELETE a quote
router.delete("/:id", authMiddleware, async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query("DELETE FROM quotes WHERE id=$1", [id]);
    res.json({ message: "Citation supprimée" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
