import React, { Component } from "react";
import { Link } from "react-router-dom";

import { socket } from "../../utils/sockets";

import API from "../../utils/api";

import Article from "../../components/Article";

class Home extends Component {

  constructor(props) {
    super(props);

    this.getArticles = this.getArticles.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.search = this.search.bind(this);
    this.clearArticles = this.clearArticles.bind(this);
    this.saveArticle = this.saveArticle.bind(this);

    this.state = {
      articles: [],
      q: "",
      start_year: "",
      end_year: "",
      message: "Enter a search query to find articles."
    };
  }

  getArticles() {
    API.getArticles({
      q: this.state.q,
      start_year: this.state.start_year,
      end_year: this.state.end_year
    }).then(res => {
      if (res.data.length > 0) {
        this.setState({
          articles: res.data,
          message: "Found " + res.data.length + " article" + (res.data.length === 1 ? "" : "s") + " for the query \"" + this.state.q + "\"."
        });
      } else {
        this.setState({
          articles: [],
          message: "No articles found for that query."
        });
      }
    }).catch(err => console.log(err));
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  search(event) {
    event.preventDefault();
    this.getArticles();
  }

  clearArticles(event) {
    event.preventDefault();
    this.setState({
      articles: [],
      message: "Articles cleared."
    });
  }

  saveArticle(article) {
    API.saveArticle(article).then(res => {
      this.getArticles();
      socket.emit("article_saved", res.data);
    });
  }

  render() {
    return (
      <div className="container py-4">
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <div className="jumbotron text-center">
              <h1 className="display-4">New York Times Article Search</h1>
              <p className="lead">Search and save articles using the NYT Article API.</p>
              <hr className="my-4" />
              <Link to="/" className="btn btn-dark mr-3">Search</Link> <span className="text-secondary">|</span> <Link to="/saved" className="btn btn-outline-secondary ml-3">Saved</Link>
            </div>
          </div>
          <div className="col-md-10 offset-md-1 mb-4">
            <div className="card">
              <div className="card-header">
                Search
              </div>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="q">Search query</label>
                    <input type="text" className="form-control" id="q" name="q" onChange={this.handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="start_year">Start year (optional)</label>
                    <input type="text" className="form-control" id="start_year" name="start_year" onChange={this.handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="end_year">End year (optional)</label>
                    <input type="text" className="form-control" id="end_year" name="end_year" onChange={this.handleInputChange} />
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary mr-2" onClick={this.search}><i className="fas fa-search"></i> Search</button>
                    <button type="submit" className="btn btn-secondary" onClick={this.clearArticles}><i className="fas fa-trash"></i> Clear results</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-10 offset-md-1">
            <div className="card mb-4">
              <div className="card-body">
                <p className="text-center m-0">{this.state.message}</p>
              </div>
            </div>
            {this.state.articles.map(article => (
              <Article
                key={article._id}
                title={article.headline.main}
                url={article.web_url}
                date={article.pub_date}
                isSaved={false}
                onSave={() => this.saveArticle(article)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

}

export default Home;