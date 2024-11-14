import express from 'express';
import cors from "cors"
import "./config/dotenv.js"
import "express-async-errors"
import urlRoutes from './routes/url.js';

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors())
app.use(express.json());

app.use('/url', urlRoutes);
app.listen(PORT, () => console.log(`Short URL Service running on port ${PORT}`));