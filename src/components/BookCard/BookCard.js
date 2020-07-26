import React, { Component } from "react";

export default class BookCard extends Component {
  render() {
    const { image, title, author } = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <img
            src={image}
            className="book-cover"
            style={{
              width: 128,
              height: 193,
            }}
          />
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{author}</div>
      </div>
    );
  }
}
