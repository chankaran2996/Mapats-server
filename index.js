import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './database/connection.js';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Required for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load Swagger JSON
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./swagger/swagger.json"), "utf-8")
);

  // Mount Swagger UI at /api
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  connectDB();
});