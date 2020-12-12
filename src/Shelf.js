import React from "react";
import PropTypes from "prop-types"
import Book from "./Book";

const BookShelf = (props) => {
  return (
    <div>
      <h3>{props.shelfName}</h3>
      <hr/>
      { props.books && props.books.map(book =>
          <Book key={book.id} book={book} onBookUpdate={props.onBookUpdate} />
        ) }
    </div>
  );
};

BookShelf.propTypes = {
  shelfName: PropTypes.string.isRequired,
  books: PropTypes.array,
  onBookUpdate: PropTypes.func.isRequired,
};

export default BookShelf;
