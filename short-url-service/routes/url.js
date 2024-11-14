import express from "express";
import pool from "../config/database.js";

const router = express.Router();

// Generate Short URL
router.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;
  const shortUrl = generateShortUrl();

  try {
    const [result] = await pool.query(
      "INSERT INTO url (original_url, short_url) VALUES (?, ?)",
      [originalUrl, shortUrl]
    );
    res.json({ shortUrl: `${process.env.DOMAIN_NAME}/${shortUrl}` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Database error" });
  }
});

// Redirect and Log
router.get("/:shortUrl", async (req, res) => {
  const { shortUrl } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM url WHERE short_url = ?", [
      shortUrl,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ error: "url not found" });

    const originalUrl = rows[0].original_url;
    await pool.query("INSERT INTO log (short_url, ip_address) VALUES (?, ?)", [
      rows[0].short_url,
      req.ip,
    ]);
    res.redirect(originalUrl);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Database error" });
  }
});

function generateShortUrl() {
  return Math.random().toString(36).substring(2, 8);
}

export default router;
