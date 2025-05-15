const express = require('express');
const { createShortUrl, redirectToLongUrl } = require('../controllers/urlController');

const router = express.Router();

router.post('/urls', createShortUrl);
router.get('/:shortUrlId', redirectToLongUrl);

module.exports = router;