import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import AddBook from "./components/AddBook/AddBook";
import { Route, Link } from "react-router-dom";
import MainList from "./components/MainList/MainList";

class BooksApp extends React.Component {
  state = {
    bookList: [],
    currRead: [],
    wantRead: [],
    read: [],
  };

  componentDidMount() {
    this.getBooks();
  }

  getBooks = () => {
    BooksAPI.getAll().then((bookList) => {
      console.log(bookList);
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
    BooksAPI.update(book, shelf).then(() => {
      //  console.log(bookList);
      this.getBooks();
    });
  };
  render() {
    const { bookList, currRead, wantRead, read, updateShelf } = this.state;
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
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <AddBook bookList={bookList} updateShelf={updateShelf} />
          )}
        />

        {/*
 {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button
                className="close-search"
                onClick={() => this.setState({ showSearchPage: false })}
              >
                Close
              </button>
              <div className="search-books-input-wrapper">
                /*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                
                <input type="text" placeholder="Search by title or author" />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid" />
            </div>
          </div>
        ) : 
         */}
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
