import React, { Component } from "react";
import "../../App.css";

export default class BookCard extends Component {
  // state ={
  //   shelf="none"
  // }

  //   shelfStatus =(item) => {
  //     switch (item) {
  //       case 'currentlyReading'
  // let xdocument.querySelector("")
  //     }
  //   }

  render() {
    const { image, title, author, shelf } = this.props;
    const isCurrentlyReading = shelf === "currentlyReading";
    const isWantRead = shelf === "wantToRead";
    const isRead = shelf === "read";
    const isNone = !shelf;
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
            alt={image}
          />
          <div className="book-shelf-changer">
            <select>
              <option value="move" disabled>
                Move to...
              </option>

              <option
                value="currentlyReading"
                selected={isCurrentlyReading}
                className="shelf"
              >
                Currently Reading
              </option>
              <option selected={isWantRead} value="wantToRead">
                Want to Read
              </option>
              <option selected={isRead} value="read">
                Read
              </option>
              <option selected={isNone} value="none">
                None
              </option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{author}</div>
      </div>
    );
  }
}
