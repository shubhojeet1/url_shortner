const Url = require("../models/urlModel");
const { generateShortCode, isValidUrl } = require("../utils/helpers");

// Shorten URL
exports.createShortUrl = async (req, res) => {
  const { longUrl, customCode, expirationDate } = req.body;

  if (!longUrl || longUrl.trim() === "") {
    return res.status(400).json({ error: "longUrl is required" });
  }

  if (!isValidUrl(longUrl)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  let shortUrlCode = customCode || generateShortCode();

  try {
    const existingUrl = await Url.findOne({ shortUrlCode });
    if (existingUrl) {
      return res.status(400).json({ error: "Custom code already in use" });
    }

    const newUrl = new Url({
      longUrl,
      shortUrlCode,
      expirationDate,
    });

    await newUrl.save();
    res
      .status(201)
      .json({ shortUrlCode, message: "URL shortened successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Redirect to the original URL
exports.redirectToOriginalUrl = async (req, res) => {
  const { code } = req.params;

  try {
    const url = await Url.findOne({ shortUrlCode: code });

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    if (url.expirationDate && url.expirationDate < new Date()) {
      return res.status(410).json({ error: "URL has expired" });
    }

    url.clicks++;
    await url.save();

    return res.redirect(url.longUrl);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// stats for the shortened URL
exports.getUrlStats = async (req, res) => {
  const { code } = req.params;

  try {
    const url = await Url.findOne({ shortUrlCode: code });

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    res.json({
      longUrl: url.longUrl,
      shortUrlCode: url.shortUrlCode,
      clicks: url.clicks,
      expirationDate: url.expirationDate,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a shortened URL
exports.deleteUrl = async (req, res) => {
  const { code } = req.params;

  try {
    const url = await Url.findOneAndDelete({ shortUrlCode: code });

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    res.json({ message: "URL deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
