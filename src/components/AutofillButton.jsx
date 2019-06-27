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
  let autocompleteCount = 0;

  fields.forEach(field => {
    const elField = document.querySelector(
      `[data-name="${field.clientId}"] input, [data-name="${field.clientId}"] select`,
    );

    const e = {
      bubbles: true,
      target: {
        value: field.value,
      },
    };

    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value',
    ).set;

    const nativeSelectValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLSelectElement.prototype,
      'value',
    ).set;

    if (elField) {
      switch (field.type) {
        case 'lookup':
          nativeSelectValueSetter.call(elField, field.value);
          elField.dispatchEvent(new Event('change', e));
          setTimeout(() => elField.dispatchEvent(new Event('blur', e)), 1000);

          break;
        case 'boolean':
        case 'multi-disclosures':
          if (elField.checked !== field.value) {
            elField.click();
          }
          elField.dispatchEvent(new Event('blur', e));
          break;
        case 'amount-slider':
          nativeInputValueSetter.call(elField, field.value);
          elField.dispatchEvent(new Event('change', e));
          break;
        case 'auto-complete':
          autocompleteCount += 1;
          // Cannot fire 2 auto completes simultaneously
          setTimeout(() => {
            elField.dispatchEvent(new Event('focus'));
            nativeInputValueSetter.call(elField, field.value);
            elField.dispatchEvent(new Event('change', e));
            setTimeout(() => elField.dispatchEvent(new Event('blur')), 1000);
          }, autocompleteCount * 1000);
          break;
        default:
          nativeInputValueSetter.call(elField, field.value || '');
          elField.dispatchEvent(new Event('change', e));
          break;
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
