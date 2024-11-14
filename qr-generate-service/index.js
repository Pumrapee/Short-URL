import express from 'express';
import cors from "cors"
import "./config/dotenv.js"
import "express-async-errors"
import qrRoutes from './routes/qr.js';

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors())
app.use(express.json());

app.use('/qr', qrRoutes);
app.listen(PORT, () => console.log(`QRCode Service running on port ${PORT}`));