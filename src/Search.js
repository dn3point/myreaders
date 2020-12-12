import React, { Component } from 'react';
import Book from './Book';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';

class Search extends Component {
  state = {
    query: '',
    books: [],
    myBooks: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        myBooks: books,
      });
    });
  }

  searchBooks = (event) => {
    const query = event.target.value.trim();
    this.setState({
      query,
    });
    if (query && query.length > 0) {
      BooksAPI.search(query).then((books) => {
        if (books.error) {
          books = [];
        }
        books = books.map(book => {
          const sameBook = this.state.myBooks.filter(myBook => myBook.id === book.id);
          return sameBook && sameBook.length > 0 ? sameBook[0] : book;
        });
        this.setState({
          books,
        });
      });
    }
  };

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <input type="text" value={this.state.query} onChange={this.searchBooks} />
        { this.state.books && this.state.books.map(book =>
          <Book key={book.id} book={book} />) }
      </div>
    );
  }
}

export default Search;
