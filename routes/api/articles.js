const express = require("express");
const router = express.Router()

const articlesController = require("../../controllers/articles");

// "/api/articles"
router
  .route("/")
  .get(articlesController.findAll)
  .post(articlesController.create)

// "/api/articles/:id"
router
  .route("/:id")
  .get(articlesController.findById)
  .delete(articlesController.delete)

module.exports = router;