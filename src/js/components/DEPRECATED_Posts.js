import React, { Component } from "react";
import { connect } from "react-redux";
import { getData } from "../actions/index";

export class Post extends Component {

  componentDidMount() {
    this.props.getData("https://api.valentinog.com/api/link/");
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.articles.map(el => (
            <li key={el.id}>{el.title}</li>
          ))}
        </ul>
        <h3> {this.props.error} </h3>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    articles: state.remoteArticles.slice(0, 10),
    error: state.error,
  };
}

export default connect(
  mapStateToProps,
  { getData }
)(Post);
