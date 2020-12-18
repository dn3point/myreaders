import React from "react";
import PropTypes from "prop-types"
import Book from "./Book";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const BookShelf = (props) => {
  return (
    <Box>
      <Typography variant="h6" className="shelf-name">
        {props.shelfName}
      </Typography>
      <Grid container spacing={3}>
        { props.books && props.books.map(book =>
            <Grid item xs={3} key={book.id}>
              <Book book={book} onBookUpdate={props.onBookUpdate} />
            </Grid>
          ) }
      </Grid>
    </Box>
  );
};

BookShelf.propTypes = {
  shelfName: PropTypes.string.isRequired,
  books: PropTypes.array,
  onBookUpdate: PropTypes.func.isRequired,
};

export default BookShelf;
