const Url = require('../models/urlModel');
const config = require('../config');

function generateShortUrlId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 7; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

async function shortenUrl(longUrl) {
  const shortUrlId = generateShortUrlId();
  const url = new Url({ shortUrlId, longUrl });
  await url.save();
  return `${config.baseUrl}/${shortUrlId}`;
}

async function getLongUrl(shortUrlId) {
  const url = await Url.findOne({ shortUrlId });
  if (!url) throw new Error('URL not found');
  
  // Increment visit count
  url.visits += 1;
  await url.save();
  
  return url.longUrl;
}

module.exports = { shortenUrl, getLongUrl };