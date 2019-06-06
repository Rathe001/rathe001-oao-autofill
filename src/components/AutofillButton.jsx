import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import { connect } from 'react-redux';
import fieldsActions from 'core/fields/actions';

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

function setPageFields(fields) {
  fields.forEach(field => {
    const elField = document.querySelector(
      `[data-name="${field.clientId}"] input, [data-name="${field.clientId}"] select`,
    );

    if (elField) {
      if (field.type === 'boolean' || field.type === 'multi-disclosures') {
        elField.checked = !!field.value;
        elField.dispatchEvent(new Event('blur'));
      } else if (field.type === 'auto-complete') {
        elField.click();
        elField.value = field.value;
        elField.dispatchEvent(new Event('keyup'));
      } else if (field.type === 'amount-slider') {
        elField.value = field.value;
        elField.dispatchEvent(new Event('change'));
      } else {
        elField.value = field.value;
        elField.dispatchEvent(new Event('blur'));
      }
    }
  });
}

const AutofillButton = ({ classes, disabled, fieldsData, currentFields, prefix }) => {
  const autofill = e => {
    e.preventDefault();
    const fields = currentFields.map(clientId => fieldsData[`${prefix}${clientId}`]);

    chrome.tabs.executeScript(
      {
        code: `(${setPageFields})(${JSON.stringify(fields)});`,
      },
      () => {},
    );
  };

  return (
    <button type="button" className={classes.btnPrimary} disabled={disabled} onClick={autofill}>
      Autofill
    </button>
  );
};

AutofillButton.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  disabled: PropTypes.bool.isRequired,
  fieldsData: PropTypes.shape({}).isRequired,
  currentFields: PropTypes.arrayOf(PropTypes.string).isRequired,
  prefix: PropTypes.string.isRequired,
};

const mapStateToProps = ({ fields }) => ({
  fieldsData: fields.data,
  currentFields: fields.current,
});

const mapDispatchToProps = {
  setFieldValue: fieldsActions.setValue,
};

const StyledAutofillButton = withStyles(styles)(AutofillButton);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StyledAutofillButton);
