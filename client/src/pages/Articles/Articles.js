import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List} from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import { Article } from "../../components/Article";

export default class Articles extends Component {
  state = {
    topic: "", //search term
    sYear: "", //start year
    eYear: "", //end year
    page: "0", //search results
    results: [], //array of results returned from api
    previousSearch: {}, //previous search term
    noResults: false //boolean used as flag for conditional rendering
  };

  saveArticle = article => {
    //this function saves the article
    let newArticle = {
      date: article.pub_date,
      title: article.headline.main,
      url: article.web_url,
      summary: article.snippet
    };
    //API CALL
    API.saveArticle(newArticle)
      .then(results => {
        //removing the saved article from the results in state
        let unsavedArticles = this.state.results.filter(
          article => article.headline.main !== newArticle.title
        );
        this.setState({ results: unsavedArticles });
      })
      .catch(err => console.log(err));
  }; // end of saveArticle function

  // Captures input and changes
  handleInputChange = event => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // Starts the searches based on the query params
  handleFormSubmit = event => {
    event.preventDefault();
    let { topic, sYear, eYear } = this.state;
    let query = { topic, sYear, eYear };
    this.getArticles(query);
  };

  //function that connectus us to the NYT API
  getArticles = query => {
    if (
      query.topic !== this.state.previousSearch.topic ||
      query.eYear !== this.state.previousSearch.eYear ||
      query.sYear !== this.state.previousSearch.sYear
    ) {
      this.setState({ results: [] }); //clears the results array if the user changes search terms
    }
    let { topic, sYear, eYear } = query;

    let queryUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?sort=newest&page=${
      this.state.page
    }`;
    let key = `&api-key=f707e238b7c84937921cc8933b487379`;

    //removing spaces and connects the search params
    if (topic.indexOf(" ") >= 0) {
      topic = topic.replace(/\s/g, "+");
    }
    if (topic) {
      queryUrl += `&fq=${topic}`;
    }
    if (sYear) {
      queryUrl += `&begin_date=${sYear}`;
    }
    if (eYear) {
      queryUrl += `&end_date=${eYear}`;
    }
    queryUrl += key;

    //calling the API
    API.queryNYT(queryUrl)
      .then(results => {
        // Concatenates results to the current state of results.
        // Also stores current search terms according to conditionals above, and alternates noResults for conditional rendering of components
        this.setState(
          {
            results: [...this.state.results, ...results.data.response.docs],
            previousSearch: query,
            topic: "",
            sYear: "",
            eYear: ""
          },
          function() {
            this.state.results.length === 0
              ? this.setState({ noResults: true })
              : this.setState({ noResults: false });
          }
        );
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>NYT Search</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.topic}
                onChange={this.handleInputChange}
                name="topic"
                placeholder="Topic (required)"
              />
              <Input
                value={this.state.sYear}
                type="date"
                onChange={this.handleInputChange}
                name="sYear"
                placeholder="Starting Year (required)"
              />
              <Input
                value={this.state.eYear}
                type="date"
                onChange={this.handleInputChange}
                name="eYear"
                placeholder="Ending Year (required)"
              />

              <FormBtn
                disabled={
                  !(this.state.eYear && this.state.topic && this.state.sYear)
                }
                onClick={this.handleFormSubmit}
              >
                Submit Search
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Search Results</h1>
            </Jumbotron>
            {this.state.noResults ? (
              "No results Found.  Please try again"
            ) : this.state.results.length > 0 ? (
              <List>
                {this.state.results.map((article, i) => (
                  <Article
                    key={i}
                    title={article.headline.main}
                    url={article.web_url}
                    summary={article.snippet}
                    date={article.pub_date}
                    type="Save"
                    onClick={() => this.saveArticle(article)}
                  />
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}
