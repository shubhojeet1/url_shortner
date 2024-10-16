require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const urlRoutes = require("./routes/urlRoutes");

connectDB();

const app = express();

app.use(express.json());

app.use("/api/url", urlRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
