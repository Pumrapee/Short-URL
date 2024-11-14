import express from 'express';
import cors from "cors"
import "./config/dotenv.js"
import "express-async-errors"
import logRoutes from './routes/log.js';

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors())
app.use(express.json());

app.use('/log', logRoutes);
app.listen(PORT, () => console.log(`Log Service running on port ${PORT}`));