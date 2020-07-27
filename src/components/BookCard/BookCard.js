import React, { Component } from "react";
import "../../App.css";
//import * as BooksAPI from "../..BooksAPI";

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

  updateShelf = (book, shelf) => {
    if (this.props.updateShelf) {
      this.updateShelf(book, shelf);
    }
  };

  render() {
    const { image, title, author, shelf, book, updateShelf } = this.props;
    const isCurrentlyReading = shelf === "currentlyReading";
    const isWantRead = shelf === "wantToRead";
    const isRead = shelf === "read";
    const isNone = !shelf;
    //  const thumbnail = (image) => {
    //     if (image.thumbnail){
    // return (
    //       <img
    //         src={image.thumbnail}
    //         className="book-cover"
    //         style={{
    //           width: 128,
    //           height: 193,
    //         }}
    //         alt={image.thumbnail}
    //       />
    //     );
    //     }

    //   };
    return (
      <div className="book">
        <div className="book-top">
          <img
            src={image ? image.thumbnail : "no image"}
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
              onChange={(event) => updateShelf(book, event)}
            >
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
