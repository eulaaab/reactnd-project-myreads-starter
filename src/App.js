import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import SearchBook from "./components/SearchBook/SearchBook";
import { Route } from "react-router-dom";
import MainList from "./components/MainList/MainList";

const SHELVES = [
  {
    title: "Currently Reading",
    id: "currentlyReading",
  },
  {
    title: "Want To Read",
    id: "wantToRead",
  },
  {
    title: "Read",
    id: "read",
  },
];

class BooksApp extends React.Component {
  state = {
    books: [],
    currRead: [],
    wantRead: [],
    read: [],
    book: {},
    bookState: "",
  };

  componentDidMount() {
    this.getBooks();
  }

  getBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        bookList: books,
        currRead: this.getCurrReading(books),
        wantRead: this.getWantRead(books),
        read: this.getRead(books),
      }));
    });
  };

  getCurrReading = (books) => {
    let currReadArr = [];
    books.forEach((element) => {
      if (element.shelf === SHELVES[0].id) {
        currReadArr.push(element);
        // this.setState(() => ({
        //   currRead: currReadArr,
        // }));
        // console.log(currReadArr);
      }
    });
    return currReadArr;
  };

  getWantRead = (books) => {
    let wantReadArr = [];
    books.forEach((element) => {
      if (element.shelf === SHELVES[1].id) {
        wantReadArr.push(element);
        // this.setState(() => ({
        //   wantRead: wantReadArr,
        // }));
        // console.log(wantRead);
      }
    });
    return wantReadArr;
  };

  getRead = (books) => {
    let readArr = [];
    books.forEach((element) => {
      if (element.shelf === "read") {
        readArr.push(element);
      }
    });
    return readArr;
  };

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      const { bookList } = this.state;
      this.setState(() => ({
        bookList: [...bookList, book],
      }));
      this.getBooks();
    });
  };
  render() {
    const { bookList, currRead, wantRead, read } = this.state;
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <MainList
              currReadList={currRead}
              wantReadList={wantRead}
              readList={read}
              updateShelf={this.updateShelf}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBook bookList={bookList} updateShelf={this.updateShelf} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
