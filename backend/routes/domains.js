const express = require("express");
const router = express.Router();
const pool = require("../db");
const authMiddleware = require("../authMiddleware");

// GET all domains
router.get("/", authMiddleware, async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM domains ORDER BY domain");
  res.json(rows);
});

// POST new domain
router.post("/", authMiddleware, async (req, res) => {
  const { domain } = req.body;
  try {
    const { rows } = await pool.query(
      "INSERT INTO domains(domain) VALUES($1) RETURNING *",
      [domain]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Erreur : domaine existant ou invalide" });
  }
});

// DELETE a domain
router.delete("/:id", authMiddleware, async (req, res) => {
  const id = req.params.id;
  try {
    const { rows } = await pool.query(
      "SELECT COUNT(*) FROM quotes WHERE domain_id=$1",
      [id]
    );
    if (parseInt(rows[0].count) > 0)
      return res.status(400).json({ message: "Impossible de supprimer : citations liées." });

    await pool.query("DELETE FROM domains WHERE id=$1", [id]);
    res.json({ message: "Domaine supprimé" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
