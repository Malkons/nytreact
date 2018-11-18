import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import {Article} from "../../components/Article"



class Detail extends Component {
  state = {
    savedArticles: []// Saved articles go here
  };

  //Saved articles get loaded from here
  componentWillMount() {
    this.loadArticles();
  };

  //This function retrieves the articles
  loadArticles = () => {
    API
      .getArticles()
      .then(results => {
        this.setState({savedArticles: results.data})
      })
  };

  // This function finds articles and deletes them
  deleteArticle = id => {
    API
      .deleteArticle(id)
      .then(results => {// Articles are re-rendered after the deletion with this
        let savedArticles = this.state.savedArticles.filter(article => article._id !== id)
        this.setState({savedArticles: savedArticles})
        this.loadArticles();
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
             Saved Articles
              </h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
       
              <h1>Synopsis</h1>
              <p>
              { this.state.savedArticles.length > 0 ?
                  (this.state.savedArticles.map((article, i) => (
                    <Article
                      key={i}
                      title={article.title}
                      url={article.url}
                      summary={article.summary}
                      date={article.date}
                      type='Delete'
                      onClick={() => this.deleteArticle(article._id)}
                    />
                    )
                  )) : "You have no saved articles."
                }
              </p>
           
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to articles</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
