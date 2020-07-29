import React, { Component } from "react";
import "../../App.css";

export default class BookCard extends Component {
  state = {
    shelf: this.props,
  };

  handleShelf = (book, event) => {
    this.props.updateShelf(book, event);
  };

  render() {
    const { book } = this.props;
    const { imageLinks, title, authors, shelf } = book;
    const isCurrentlyReading = shelf === "currentlyReading";
    const isWantRead = shelf === "wantToRead";
    const isRead = shelf === "read";
    const isNone = !shelf;

    return (
      <div className="book">
        <div className="book-top">
          <img
            src={imageLinks ? imageLinks.thumbnail : "no image"}
            className="book-cover"
            style={{
              width: 128,
              height: 193,
            }}
            alt={title}
          />
          <div className="book-shelf-changer">
            <select
              value={shelf}
              onChange={(event) => this.handleShelf(book, event.target.value)}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option
                value="currentlyReading"
                select={shelf}
                selected={isCurrentlyReading}
                className="shelf"
              >
                Currently Reading
              </option>
              <option select={shelf} selected={isWantRead} value="wantToRead">
                Want to Read
              </option>
              <option select={shelf} selected={isRead} value="read">
                Read
              </option>
              <option select={shelf} selected={isNone} value="none">
                None
              </option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        {authors && <div className="book-authors">{authors.join(", ")}</div>}
      </div>
    );
  }
}
