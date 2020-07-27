import React, { Component } from "react";
import "../../App.css";
//import * as BooksAPI from "../..BooksAPI";

export default class BookCard extends Component {
  state = {
    shelf: this.props,
  };
  // state ={
  //   shelf="none"
  // }

  //   shelfStatus =(item) => {
  //     switch (item) {
  //       case 'currentlyReading'
  // let xdocument.querySelector("")
  //     }
  //   }

  handleShelf = (book, event) => {
    //const { shelf } = event.target.value;
    // event.preventDefault();
    // console.log("event value", event.target.value);
    // console.log("book", book);
    // this.setState(() => ({
    //   shelf: shelf,
    // }));
    this.props.updateShelf(book, event);
    // if (this.props.updateShelf) {
    //   this.updateShelf(book, shelf);
    // }
  };

  render() {
    const { book, updateShelf } = this.props;
    const { imageLinks, title, author, shelf } = book;
    //const { shelf } = this.state;
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
                selected={shelf}
                className="shelf"
              >
                Currently Reading
              </option>
              <option selected={shelf} value="wantToRead">
                Want to Read
              </option>
              <option selected={shelf} value="read">
                Read
              </option>
              <option selected={shelf} value="none">
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
