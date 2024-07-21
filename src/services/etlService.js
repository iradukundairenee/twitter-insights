// services/etlService.js
import fs from 'fs';
import readline from 'readline';
import Tweet from '../models/tweet.js';
// import {hashtagSchema} from "../models/tweet.js"

const loadTweets = async (filePath) => {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const tweets = [];

  for await (const line of rl) {
    try {
      const tweet = JSON.parse(line);
      tweets.push({
        id: tweet.id_str,
        text: tweet.text,
        created_at: new Date(tweet.created_at),
        user: {
          id: tweet.user.id_str,
          name: tweet.user.name,
          screen_name: tweet.user.screen_name,
          location: tweet.user.location,
          followers_count: tweet.user.followers_count
        },
        // Extract and transform other fields as necessary
      });
    } catch (error) {
      console.error(`Failed to parse line: ${line}`);
    }
  }

  try {
    await Tweet.insertMany(tweets, { ordered: false });
    console.log('Tweets successfully loaded into MongoDB.');
  } catch (error) {
    console.error('Error inserting tweets into MongoDB:', error);
  }
};





export { loadTweets };
