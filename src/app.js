// src/app.js
import express from 'express';
import mongoose from 'mongoose';
import { MONGODB_URI, PORT } from './config.js';
import tweetRoutes from './routes/tweetRoutes.js';
import { loadTweets } from './services/etlService.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.use(express.json());


app.use('/api', tweetRoutes);


const tweetFilePath = path.join(__dirname, 'tweets.json');

loadTweets(tweetFilePath);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
