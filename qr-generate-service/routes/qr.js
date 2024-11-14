import express from "express";
import QRCode from "qrcode";
import pool from "../config/database.js";

const router = express.Router();

router.post("/generate", async (req, res) => {
  const { shortUrl } = req.body;
  const shortUrlId = shortUrl.split("/").pop();

  try {
    const [rows] = await pool.query(
      "SELECT qr_code FROM url WHERE short_url = ?",
      [shortUrlId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "url not found" });
    }
    if (rows.length > 0 && rows[0].qr_code) {
      res.contentType("image/png");
      res.send(rows[0].qr_code);
    } else {
      const qrCodeBuffer = await QRCode.toBuffer(shortUrl);
      await pool.query("UPDATE url SET qr_code = ? WHERE short_url = ?", [
        qrCodeBuffer,
        shortUrlId,
      ]);
      res.contentType("image/png");
      res.send(qrCodeBuffer);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
