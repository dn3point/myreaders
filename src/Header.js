import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Search} from '@material-ui/icons';

const Header = (props) => {
  return (
    <AppBar position="sticky" color="transparent">
      <Toolbar>
        <Typography variant="h4" className="title">
          {props.title}
        </Typography>
        <Link to="/search">
          <Search fontSize="large" color="primary" />
        </Link>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
