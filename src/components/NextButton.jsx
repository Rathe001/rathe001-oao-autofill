import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import { connect } from 'react-redux';

const styles = {
  btnPrimary: {
    cursor: 'pointer',
    background: '#008ff5',
    color: '#fff',
    margin: '0 5px 0 0',
    borderRadius: 10,
    border: 'none',
    fontFamily: `'Barlow Condensed', Arial, Helvetica, sans-serif`,
    fontSize: 16,
    textTransform: 'uppercase',
    padding: '0 10px 2px 10px',

    '&:focus': {
      outline: 'none',
    },
  },
};

const NextButton = ({ classes }) => {
  function clickNext() {
    document.querySelector('.btn-page-next').click();
  }

  const next = () => {
    chrome.tabs.executeScript(
      {
        code: `(${clickNext})();`,
      },
      () => {},
    );
  };

  return (
    <button
      type="button"
      className={classes.btnPrimary}
      onClick={() => {
        next();
      }}
    >
      Next Page
    </button>
  );
};

NextButton.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

const StyledNextButton = withStyles(styles)(NextButton);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StyledNextButton);
