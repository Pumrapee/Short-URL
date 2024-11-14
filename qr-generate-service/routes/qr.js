import express from "express";
import QRCode from "qrcode";

const router = express.Router();

router.post("/generate", async (req, res) => {
  const { shortUrl } = req.body;
  try {
    const qrCodeBuffer = await QRCode.toBuffer(`${shortUrl}`);
    res.contentType("image/png");
    res.send(qrCodeBuffer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
