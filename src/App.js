import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import SearchBook from "./components/SearchBook/SearchBook";
import { Route, Link } from "react-router-dom";
import MainList from "./components/MainList/MainList";

class BooksApp extends React.Component {
  state = {
    bookList: [],
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
    BooksAPI.getAll().then((bookList) => {
      this.setState(() => ({
        bookList: bookList,
        currRead: this.getCurrReading(bookList),
        wantRead: this.getWantRead(bookList),
        read: this.getRead(bookList),
      }));
    });
  };

  getCurrReading = (books) => {
    let currReadArr = [];
    books.forEach((element) => {
      if (element.shelf === "currentlyReading") {
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
      if (element.shelf === "wantToRead") {
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
        // this.setState(() => ({
        //   read: readArr,
        // }));
        // console.log(readArr);
      }
    });
    return readArr;
  };

  // bookList.forEach((element) => {
  //   let currReadArr = [];
  //   if (element.shelf === "currentlyReading") {
  //     currReadArr.push(element);
  //     this.setState(() => ({
  //       currRead: currReadArr,
  //     }));
  //     console.log(currReadArr);
  //   }
  // });

  updateShelf = (book, shelf) => {
    // console.log("shelf state from App", this.state.shelf.shelf);
    // this.setState(() => ({
    //   bookState: shelf,
    //   book: book,
    // }));
    BooksAPI.update(book, shelf).then(() => {
      //  console.log(bookList);
      // console.log("shelf state from App", this.state.shelf.shelf);
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
        <div className="open-search">
          <Link to="/search">
            <button onClick={() => this.setState({ showSearchPage: true })}>
              Add a book
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default BooksApp;
