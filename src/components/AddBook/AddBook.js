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
  };

  bookQuery = (query) => {
    this.setState({
      query,
    });
  };
  componentDidUpdate() {
    const { query } = this.state;
    if (query.length) {
      BooksAPI.search(query).then((books) => {
        console.log(books);
        if (books && books.length) {
          this.setState(() => ({
            // query: query,
            bookResult: books,
          }));
        } else {
          this.setState(() => ({
            //  query,
            bookResult: [],
          }));
        }
      });
    }
  }
  // BooksAPI.search(query).then((books) => {
  //   console.log(books);
  //   if (books && books.length) {
  //     this.setState(() => ({
  //       query: query,
  //       bookResult: books,
  //     }));
  //   } else {
  //     this.setState(() => ({
  //       query,
  //       bookResult: [],
  //     }));
  //   }
  // });

  render() {
    const {
      bookResult,
      bookList,
      query,
      image,
      title,
      author,
      shelf,
    } = this.state;

    const showResults =
      query === ""
        ? []
        : bookResult.filter(
            (book) => {
              book.title.toLowerCase().includes(query.toLowerCase());
            }
            // (book) => console.log("book", book)
          );

    console.log("nooks", this.state.bookList);
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
              {bookResult.length &&
                bookResult.map((book) => (
                  <BookCard
                    image={book.imageLinks.smallThumbnail}
                    title={book.title}
                    author={book.authors}
                    shelf={book.shelf}
                  />
                ))}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}
