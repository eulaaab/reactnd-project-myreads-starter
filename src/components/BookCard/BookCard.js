import React, { Component } from "react";
import "../../App.css";

export default class BookCard extends Component {
  // state = {
  //   shelf: this.props.book.shelf,
  // };

  handleShelf = (book, event) => {
    this.props.updateShelf(book, event);
  };

  render() {
    const { book } = this.props;
    const { imageLinks, title, authors, shelf } = book;
    const selectedValue = shelf ? shelf : "none";

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
              value={selectedValue}
              onChange={(event) => this.handleShelf(book, event.target.value)}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading" className="shelf">
                Currently Reading
              </option>
              <option value="wantToRead" className="shelf">
                Want to Read
              </option>
              <option value="read" className="shelf">
                Read
              </option>
              <option value="none" className="shelf">
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
