const express = require("express");
const router = express.Router();

const nytController = require("../../controllers/nyt");

// "/api/nyt"
router
  .route("/")
  .get(nytController.findAll)

module.exports = router;