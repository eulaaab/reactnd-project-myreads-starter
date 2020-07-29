import React from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import BookList from "../../components/BookList/BookList";

const MainList = (props) => {
  const { currReadList, wantReadList, readList, updateShelf } = props;
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
        <BookList books={readList} updateShelf={updateShelf} bookshelf="Read" />
      </div>
      <div className="open-search">
        <Link to="/search">
          <button>Add a book</button>
        </Link>
      </div>
    </div>
  );
};

export default MainList;
