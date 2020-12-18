import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI'
import { NONE, SHELVES } from './Constants';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

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
      showOptions: false,
      shelf,
    });
    BooksAPI.update(this.props.book, shelf).then(() => {
      if (this.props.onBookUpdate) {
        this.props.onBookUpdate();
      }
    })
  };

  render() {
    const { book } = this.props;
    const { id, title, authors, imageLinks} = book;
    return (
      <Paper className="book">
        <img src={imageLinks && imageLinks.thumbnail} className="book-cover" alt={title}/>
        <Typography variant="body1">{title}</Typography>
        {authors && authors.map(author => (<Typography key={author} variant="body2">{author}</Typography>))}
        <Button variant="outlined" color="primary" onClick={this.flipShowOptions}>
          Move to ...
        </Button>
        <Dialog onClose={this.flipShowOptions} aria-labelledby={title} open={this.state.showOptions}>
          <DialogTitle id={title}>Move to</DialogTitle>
          <DialogContent dividers>
            <RadioGroup
              aria-label="shelf-option"
              name="shelf-option"
              value={this.state.shelf}
              onChange={this.onBookShelfChange}
            >
              {Object.keys(SHELVES).filter(key => this.state.shelf === NONE || key !== NONE).map(key => (
                <FormControlLabel value={key} key={`${key}_input_${id}`} control={<Radio />} label={SHELVES[key]} />
              ))}
            </RadioGroup>
          </DialogContent>
        </Dialog>
      </Paper>
    );
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onBookUpdate: PropTypes.func,
};

export default Book;
