import React, { Component } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import * as BooksAPI from "../../BooksAPI.js";
import BookCard from "../../components/BookCard/BookCard";

export default class AddBook extends Component {
  state = {
    query: "",
    bookResult: [],
    book: "",
    bookList: this.state,
    shelf: "",
  };

  bookQuery = (query) => {
    this.setState({
      query,
    });
    this._isMounted = true;
  };

  componentDidUpdate() {
    const { query } = this.state;
    if (query) {
      BooksAPI.search(query).then((books) => {
        console.log(books);
        if (books && books.length) {
          this.setState(() => ({
            query: this.props.query,
            bookResult: this.newArray(books, this.props.bookList),
            shelf: "none",
          }));
        } else {
          this.setState(() => ({
            query: "",
            bookResult: [],
          }));
        }
      });
    }
  }

  componentWillUnmount() {
    this.setState(() => ({}));
  }

  newArray = (bookResult, bookList) => {
    bookResult.forEach((element, i) => {
      let result = bookList.find((item) => item.id === element.id);
      if (result) {
        console.log("this is RESULT;", result);
        element.shelf = result.shelf;
        console.log(bookResult);
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
                onChange={(event) => this.bookQuery(event.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {bookResult.length > 0 ? (
                bookResult.map((book) => (
                  <BookCard
                    updateShelf={updateShelf}
                    book={book}
                    shelf={shelf}
                  />
                ))
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
