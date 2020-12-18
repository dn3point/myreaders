import React, { Component } from 'react';
import Book from './Book';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import {ArrowBack} from '@material-ui/icons';
import InputBase from '@material-ui/core/InputBase';

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
        <AppBar position="sticky" color="transparent">
          <Toolbar>
            <Link to="/" color="primary">
              <ArrowBack />
            </Link>
            <InputBase
              placeholder="Search…"
              onChange={this.searchBooks}
              value={this.state.query}
            />
          </Toolbar>
        </AppBar>
        <Grid container spacing={3}>
        { this.state.books && this.state.books.map(book =>
          <Grid item xs={3} key={book.id}>
            <Book key={book.id} book={book} />
          </Grid>
        )}
        </Grid>
      </div>
    );
  }
}

export default Search;
