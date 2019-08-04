import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const ErrorMessage = ({ key, isError, message }) => {
  return (
    <div id={key}>{isError ? <h2 className="red errorText">Error: {message}</h2> : null}</div>
  );
};

ErrorMessage.propTypes = {
  key: PropTypes.string,
  isError: PropTypes.bool.isRequired,
  message: PropTypes.string,
};

ErrorMessage.defaultProps = {
  key: '',
  message: '',
};

export default ErrorMessage;
