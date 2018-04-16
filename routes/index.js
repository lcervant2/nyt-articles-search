const express = require("express");
const path = require("path");
const router = express.Router();

const apiRoutes = require("./api");

// API routes
router.use("/api", apiRoutes);

// base route - serve the React client
router.use((req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;