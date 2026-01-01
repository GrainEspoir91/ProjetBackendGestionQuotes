const express = require("express");
const router = express.Router();
const pool = require("../db");
const authMiddleware = require("../authMiddleware");

// GET all authors
router.get("/", authMiddleware, async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM authors ORDER BY name");
  res.json(rows);
});

// POST new author
router.post("/", authMiddleware, async (req, res) => {
  const { name, bio } = req.body;
  try {
    const { rows } = await pool.query(
      "INSERT INTO authors(name,bio) VALUES($1,$2) RETURNING *",
      [name, bio]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Erreur : auteur existant ou invalide" });
  }
});

// DELETE an author
router.delete("/:id", authMiddleware, async (req, res) => {
  const id = req.params.id;
  try {
    const { rows } = await pool.query(
      "SELECT COUNT(*) FROM quotes WHERE author_id=$1",
      [id]
    );
    if (parseInt(rows[0].count) > 0)
      return res.status(400).json({ message: "Impossible de supprimer : citations liées." });

    await pool.query("DELETE FROM authors WHERE id=$1", [id]);
    res.json({ message: "Auteur supprimé" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
