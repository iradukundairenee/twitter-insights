// routes/tweetRoutes.js
import express from 'express';
import Tweet from '../models/tweet.js';

const router = express.Router();

router.get('/tweets', async (req, res) => {
  try {
    const tweets = await Tweet.find();
    res.json(tweets);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/tweets/:id', async (req, res) => {
  try {
    const tweet = await Tweet.findOne({ id: req.params.id });
    if (!tweet) {
      return res.status(404).json({ error: 'Tweet not found' });
    }
    res.json(tweet);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
