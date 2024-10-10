const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

//Create a shortened URL
router.post('/shorten', urlController.createShortUrl);

//Redirected to the original URL
router.get('/:code', urlController.redirectToOriginalUrl);

//URL statistics
router.get('/:code/stats', urlController.getUrlStats);

//Delete a shortened URL
router.delete('/:code', urlController.deleteUrl);

module.exports = router;
