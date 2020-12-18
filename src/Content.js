import React from 'react';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';
import Box from '@material-ui/core/Box';

const Content = (props) => {
  return (
    <Box>
      {props.bookShelves && Object.values(props.bookShelves).map(shelf => (
        <BookShelf key={shelf[0]} shelfName={shelf[1]} books={shelf[2]} onBookUpdate={props.onBookUpdate} />
      ))}
    </Box>
  );
}

Content.prototype = {
  bookShelves: PropTypes.object.isRequired,
  onBookUpdate: PropTypes.func.isRequired,
};

export default Content;
