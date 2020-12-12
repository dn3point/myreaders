import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI'
import { NONE, SHELVES } from './Constants';

class Book extends Component {
  constructor(props) {
    super(props);
    const shelf = props.book.shelf ? props.book.shelf : NONE;
    this.state = {
      showOptions: false,
      shelf: shelf,
    };
  }

  flipShowOptions = () => {
    this.setState(oldState => ({
      showOptions: !oldState.showOptions,
    }));
  };

  onBookShelfChange = (event) => {
    const shelf = event.target.value;
    this.setState({
      shelf,
    });
    if (shelf !== NONE) {
      BooksAPI.update(this.props.book, shelf).then(() => {})
    }
    if (this.props.onBookUpdate) {
      this.props.onBookUpdate();
    }
  };

  render() {
    const { book } = this.props;
    const { id, title, authors, imageLinks} = book;
    return (
      <div>
        <img src={imageLinks && imageLinks.thumbnail} alt={title}/>
        <h5>{title}</h5>
        {authors && authors.map(author => (<h6 key={author}>{author}</h6>))}
        <button onClick={this.flipShowOptions}>Show Options</button>
        {this.state.showOptions && <div>
          <p>Move to</p>
          { Object.keys(SHELVES).map(key => (<div key={key}>
            <input type="radio"
                   key={`${key}_input_${id}`}
                   name={`book_${id}`}
                   value={key}
                   checked={this.state.shelf === key}
                   onChange={this.onBookShelfChange} />
            <label key={`${key}_label_${id}`} htmlFor={`book_${id}`}>{ SHELVES[key] }</label>
          </div>)) }
        </div>}
      </div>
    );
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onBookUpdate: PropTypes.func,
};

export default Book;
