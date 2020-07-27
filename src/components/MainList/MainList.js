import React, { Component } from "react";
import "../../App.css";
import BookList from "../../components/BookList/BookList";

export default class MainList extends Component {
  render() {
    const { currReadList, wantReadList, readList, updateShelf } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookList
            books={currReadList}
            updateShelf={updateShelf}
            bookshelf="Currently Reading"
          />
          <BookList
            books={wantReadList}
            updateShelf={updateShelf}
            bookshelf="Want to Read"
          />
          <BookList
            books={readList}
            updateShelf={updateShelf}
            bookshelf="Read"
          />
        </div>
      </div>
    );
  }
}
