import React, { Component } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import * as BooksAPI from "../../BooksAPI.js";
import BookCard from "../../components/BookCard/BookCard";

export default class SearchBook extends Component {
  state = {
    query: "",
    bookResult: [],
  };

  bookQuery = (event) => {
    const query = event.target.value;

    //const { query } = this.state;
    //this.setState(() => ({ query }));
    if (query.length) {
      BooksAPI.search(query).then((books) => {
        if (books && books.length) {
          let bookSearch = this.newArray(books, this.props.bookList);
          this.setState(() => ({
            //query: this.state.query,
            bookResult: bookSearch,
            shelf: bookSearch.shelf,
          }));
        } else {
          this.setState(() => ({
            bookResult: null,
          }));
        }
      });
    } else {
      this.setState(() => ({
        bookResult: [],
      }));
    }
    this.setState({
      query: query,
    });
  };

  newArray = (bookResult, bookList) => {
    bookResult.forEach((element, i) => {
      let result = bookList.find((item) => item.id === element.id);
      if (result) {
        element.shelf = result.shelf;
      }
    });
    return bookResult;
  };

  render() {
    const { bookResult, query, shelf } = this.state;
    const { updateShelf } = this.props;
    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/">
              <button className="close-search">Close</button>
            </Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title"
                value={query}
                onChange={this.bookQuery}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {bookResult !== null ? (
                bookResult.length > 0 ? (
                  bookResult.map((book) => (
                    <BookCard
                      updateShelf={updateShelf}
                      book={book}
                      shelf={shelf}
                      key={book.id}
                    />
                  ))
                ) : null
              ) : (
                <div>No Result</div>
              )}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}
