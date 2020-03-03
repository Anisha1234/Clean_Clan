import React from 'react';
import PropTypes from 'prop-types';


const ErrorDisplayComponent = ({ error }) => {
  if (!error) {
    return null;
  }
  return (
    <p>
      Error founded:
      {error}
    </p>
  );
};

export default ErrorDisplayComponent;

// prop-types
ErrorDisplayComponent.propTypes = {
  error: PropTypes.string,
};

ErrorDisplayComponent.defaultProps = {
  error: null,
};
