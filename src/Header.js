import React from "react";
import PropTypes from "prop-types";

const Header = (props) => {
  return (
    <header>
      <h2>{props.title}</h2>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
