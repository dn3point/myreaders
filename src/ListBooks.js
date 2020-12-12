import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI';
import Header from './Header';
import Content from './Content';
import {Link} from 'react-router-dom';
import {NONE, SHELVES} from './Constants';

class ListBooks extends Component {
  state = {
    shelves: {},
  };

  componentDidMount() {
    this.getAllBooks();
  };

  onBookUpdate = () => {
    this.getAllBooks();
  };

  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        shelves: Object.keys(SHELVES).filter(key =>
          key !== NONE).map(key =>
          [key, SHELVES[key], books.filter(book => book.shelf === key)]),
      }));
    })
  };

  render() {
    return (
      <div className="App">
        <Header title="MyReaders"/>
        <Content bookShelves={this.state.shelves} onBookUpdate={this.onBookUpdate} />
        <Link to="/search">Add a book</Link>
      </div>
    );
  }
}

export default ListBooks;
