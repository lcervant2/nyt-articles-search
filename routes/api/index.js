const express = require("express");
const router = express.Router();

const articlesRoutes = require("./articles");
const nytRoutes = require("./nyt");

router.use("/articles", articlesRoutes);
router.use("/nyt", nytRoutes);

module.exports = router;