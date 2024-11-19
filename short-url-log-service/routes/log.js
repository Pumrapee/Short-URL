import express from "express";
import pool from "../config/database.js";

const router = express.Router();

router.get("/totalClicked", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT count(*) as totalClicked");
    if (rows.length === 0)
      return res.status(404).json({ error: "Log not found" });
    res.status(200).json(rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Database error" });
  }
});

router.get("/totalClicked/:shortUrl", async (req, res) => {
  const { shortUrl } = req.params;
  try {
    const [rows] = await pool.query("SELECT count(*) as totalClicked FROM log WHERE short_url = ?", [
      shortUrl,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ error: "Log not found" });
    res.status(200).json(rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Database error" });
  }
});

router.get("/url", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM url");
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Database error" });
  }
});

router.get("/totalUrl", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT count(*) as totalUrl FROM url");
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Database error" });
  }
});

router.get("/:shortUrl", async (req, res) => {
  const { shortUrl } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM log WHERE short_url = ?", [
      shortUrl,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ error: "Log not found" });
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Database error" });
  }
});



export default router;
