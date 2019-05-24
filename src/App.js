import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import styles from './Styles';

const scanInputs = e => {
  const fields = document.querySelector(`[class^='field-type--'']`);

  console.log('HELLO WORLD!');
  console.log(fields);
};

const App = ({ classes }) => {
  const fields = [
    {
      id: 'this_is_a_field_id1',
      type: 'text',
    },
    {
      id: 'this_is_a_field_id2',
      type: 'text',
    },
    {
      id: 'this_is_a_field_id3',
      type: 'text',
    },
    {
      id: 'this_is_a_field_id4',
      type: 'text',
    },
    {
      id: 'this_is_a_field_id5',
      type: 'text',
    },
    {
      id: 'this_is_a_field_id6',
      type: 'text',
    },
    {
      id: 'this_is_a_field_id7',
      type: 'text',
    },
    {
      id: 'this_is_a_field_id8',
      type: 'text',
    },
    {
      id: 'this_is_a_field_id9',
      type: 'text',
    },
    {
      id: 'this_is_a_field_id10',
      type: 'text',
    },
  ];
  return (
    <main>
      <h1 className={classes.header}>OAO 4.0 Autofill</h1>
      <div className={classes.tools}>
        <div className={classes.cellL}>
          <button type="button" className={classes.btnPrimary} onClick={scanInputs}>
            Scan inputs
          </button>
        </div>
        <div className={classes.cellR}>
          <select defaultValue="">
            <option>Profile 1</option>
          </select>
          <button type="button" className={classes.btnPrimary}>
            Save
          </button>
          <button type="button" className={classes.btnPrimary}>
            Save as
          </button>
        </div>
      </div>
      <div className={classes.fields}>
        <h2>Fields</h2>
        <ul>
          {fields.map(field => (
            <li key={field.id}>
              <label>
                {field.id}: <input type={field.type} />
              </label>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

App.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(App);
