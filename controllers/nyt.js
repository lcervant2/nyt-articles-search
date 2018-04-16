const axios = require("axios");
const models = require("../models");

module.exports = {
  findAll: function(req, res) {
    const params = Object.assign({ api_key: "9b3adf57854f4a19b7b5782cdd6e427a" }, req.query);
    axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json", { params })
      .then(response => {
        models.Article
          .find()
          .then(articles => response.data.response.docs.filter(article =>
            articles.every(a => a._id.toString() !== article._id)
          ))
          .then(articles => {
            res.json(articles);
          });
      })
      .catch(err => {
        res.status(422).json(err);
      });
  }
};