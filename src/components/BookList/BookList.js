import React, { Component } from "react";
import "../../App.css";
import BookCard from "../BookCard/BookCard";

export default class BookList extends Component {
  render() {
    const { books, bookshelf, updateShelf } = this.props;
    return (
      <>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{bookshelf}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books !== undefined
                ? books.map((book) => {
                    return (
                      <li key={book.id}>
                        <BookCard updateShelf={updateShelf} book={book} />
                      </li>
                    );
                  })
                : null}
            </ol>
          </div>
        </div>
      </>
    );
  }
}
