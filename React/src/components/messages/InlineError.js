import React from 'react';
import PropTypes from 'prop-types';

const InlineError = ({ text }) => (
  <span style={{ color: "#ae5856", margin: "2h" }}>{text}</span>
);

InlineError.propTypes = {
  text: PropTypes.string.isRequired
};

export default InlineError;
