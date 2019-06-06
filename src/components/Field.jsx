import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import { connect } from 'react-redux';
import fieldsActions from 'core/fields/actions';

const styles = {
  field: {
    margin: '0 0 5px 0',
    padding: '5px 10px',
    float: 'left',
    width: '100%',
  },
  label: {
    display: 'flex',
  },
  labelText: {
    flex: '1',
    padding: '5px 10px 0 0',
    textAlign: 'right',
  },
  labelInput: {
    flex: '1',
  },
  clientId: {
    fontSize: 9,
    color: '#999',
  },
  type: {
    fontSize: 9,
    color: '#999',
    textAlign: 'right',
    display: 'block',
    width: '100%',
  },
};

function getInputType(type) {
  switch (type) {
    case 'multi-disclosures':
    case 'boolean':
      return 'checkbox';
    case 'htmlElement':
    case 'output':
      return 'hidden';
    default:
      return 'text';
  }
}

const Field = ({ classes, setFieldValue, id, data = {} }) => {
  function onChangeField(el) {
    const value =
      getInputType(data.type) === 'checkbox' || getInputType(data.type) === 'radio'
        ? el.checked
        : el.value;

    setFieldValue(id, data, value);
  }

  return (
    <li key={data.id} className={classes.field}>
      <label className={classes.label} htmlFor={data.clientId}>
        <span className={classes.labelText}>
          {data.label}
          :
          <br />
          <small className={classes.clientId}>{data.clientId}</small>
        </span>
        <span className={classes.labelInput}>
          <input
            id={data.clientId}
            type={getInputType(data.type)}
            onChange={e => onChangeField(e.target)}
            value={data.value}
            checked={data.value}
          />
          <br />
          <small className={classes.type}>{data.type}</small>
        </span>
      </label>
    </li>
  );
};

Field.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  id: PropTypes.string.isRequired,
  data: PropTypes.shape({}).isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  setFieldValue: fieldsActions.setValue,
};

const StyledField = withStyles(styles)(Field);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StyledField);
