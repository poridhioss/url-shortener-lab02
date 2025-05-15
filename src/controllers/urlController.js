const { shortenUrl, getLongUrl } = require('../services/urlService');

async function createShortUrl(req, res) {
  try {
    const { longUrl } = req.body;
    if (!longUrl || !/^https?:\/\//.test(longUrl)) {
      return res.status(400).json({ error: 'Invalid URL' });
    }
    const shortUrl = await shortenUrl(longUrl);
    res.status(201).json({ shortUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function redirectToLongUrl(req, res) {
  try {
    const { shortUrlId } = req.params;
    const longUrl = await getLongUrl(shortUrlId);
    res.redirect(301, longUrl);
  } catch (err) {
    if (err.message === 'URL not found') {
      return res.status(404).json({ error: 'Not Found' });
    }
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createShortUrl, redirectToLongUrl };