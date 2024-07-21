// models/tweet.js
import mongoose from 'mongoose';

const tweetSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  text: String,
  created_at: Date,
  user: {
    id: String,
    name: String,
    screen_name: String,
    location: String,
    followers_count: Number
  },
  // Add other relevant fields
}, { timestamps: true });



const Tweet = mongoose.model('Tweet', tweetSchema);

export default Tweet;
