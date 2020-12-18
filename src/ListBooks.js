import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI';
import Header from './Header';
import Content from './Content';
import { NONE, SHELVES } from './Constants';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

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
      <Box>
        <Header title="MyReaders"/>
        <Container fixed>
          <Content bookShelves={this.state.shelves} onBookUpdate={this.onBookUpdate} />
        </Container>
      </Box>
    );
  }
}

export default ListBooks;
