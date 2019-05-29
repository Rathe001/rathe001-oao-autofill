import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import styles from './Styles';

function getInputType(field) {
  switch (field) {
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

const App = ({ classes }) => {
  const [domain, setDomain] = useState('');
  const [fields, setFields] = useState({});
  const [profile, setProfile] = useState('profile1');

  useEffect(updateFields, []);

  function updateFields(newProfile) {
    chrome.tabs.query({ active: true, windowId: chrome.windows.WINDOW_ID_CURRENT }, function(tabs) {
      const newDomain = tabs[0].url.split('://')[1].split('/')[0];
      setDomain(newDomain);

      const selectedProfile = newProfile || profile;

      chrome.tabs.executeScript(
        {
          code: '(' + getFields + ')();',
        },
        results => {
          results[0].forEach(r => {
            if (!localStorage.getItem(`${newDomain}_${selectedProfile}_field_${r.clientId}`)) {
              localStorage.setItem(
                `${newDomain}_${selectedProfile}_field_${r.clientId}`,
                JSON.stringify(r)
              );
            }
          });

          const objResults = results[0].reduce((obj, item) => {
            return {
              ...obj,
              [item.clientId]: JSON.parse(
                localStorage.getItem(`${newDomain}_${selectedProfile}_field_${item.clientId}`)
              ),
            };
          }, {});

          setFields(objResults);
        }
      );
    });
  }

  function getFields() {
    const fields = Array.from(document.querySelectorAll('[class*="field-type--"]')).map((n, i) => {
      const elLabel = n.children[0].querySelector('label');
      const elInput = n.children[0].querySelector('input, select');

      return {
        id: i,
        classList: n.classList.value,
        label: elLabel ? elLabel.innerText : '',
        clientId: n.getAttribute('data-name'),
        type: n.classList[1].split('--')[1] || '',
        value: '',
      };
    });

    return fields.filter(f => !!f.clientId);
  }

  function setPageFields(fields) {
    Object.keys(fields).map(key => {
      const elField = document.querySelector(
        `[data-name="${key}"] input, [data-name="${key}"] select`
      );

      if (elField) {
        if (fields[key].type === 'boolean' || fields[key].type === 'multi-disclosures') {
          elField.checked = !!fields[key].value;
          elField.dispatchEvent(new Event('blur'));
        } else if (fields[key].type === 'auto-complete') {
          elField.value = fields[key].value;
          elField.dispatchEvent(
            new Event('input', {
              target: elField,
            })
          );

          setTimeout(() => {}, 1500);
        } else {
          elField.value = fields[key].value;
          elField.dispatchEvent(new Event('blur'));
        }
      }
    });
  }

  function clickNext() {
    document.querySelector('.btn-page-next').click();
  }

  function inputOnChange(e, field) {
    const value = {
      ...field,
      value: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    };

    setFields({
      ...fields,
      [field.clientId]: value,
    });

    localStorage.setItem(`${domain}_${profile}_field_${field.clientId}`, JSON.stringify(value));
  }

  const profileOnChange = e => {
    setProfile(e.target.value);
    updateFields(e.target.value);
  };

  const autofill = fields => {
    chrome.tabs.executeScript(
      {
        code: '(' + setPageFields + ')(' + JSON.stringify(fields) + ');',
      },
      () => {}
    );
  };

  const next = () => {
    chrome.tabs.executeScript(
      {
        code: '(' + clickNext + ')(' + JSON.stringify(fields) + ');',
      },
      () => {}
    );
  };

  return (
    <main>
      <h1 className={classes.header}>
        OAO 4.0 Autofill <small className={classes.version}>1.0.1 beta</small>
      </h1>
      <div className={classes.tools}>
        <div className={classes.cellL}>
          <button
            type="button"
            className={classes.btnPrimary}
            disabled={fields.length === 0}
            onClick={() => {
              autofill(fields);
            }}
          >
            Autofill
          </button>

          <button
            type="button"
            className={classes.btnPrimary}
            disabled={fields.length === 0}
            onClick={() => {
              next();
            }}
          >
            Next Page
          </button>
        </div>
        <div className={classes.cellR}>
          <select value={profile} onChange={profileOnChange}>
            <option value="profile1">Profile 1</option>
            <option value="profile2">Profile 2</option>
            <option value="profile3">Profile 3</option>
            <option value="profile4">Profile 4</option>
            <option value="profile5">Profile 5</option>
            <option value="profile6">Profile 6</option>
            <option value="profile7">Profile 7</option>
            <option value="profile8">Profile 8</option>
            <option value="profile9">Profile 9</option>
            <option value="profile10">Profile 10</option>
          </select>
        </div>
      </div>
      <div className={classes.fields}>
        <h2>Fields</h2>
        {Object.keys(fields).length > 0 ? (
          <ul>
            {Object.keys(fields)
              .map(key => fields[key])
              .map(field => (
                <li key={field.id} className={classes.field}>
                  <label className={classes.label}>
                    <span className={classes.labelText}>
                      {field.label}:<br />
                      <small className={classes.clientId}>{field.clientId}</small>
                    </span>
                    <span className={classes.labelInput}>
                      <input
                        type={getInputType(field.type)}
                        onChange={e => inputOnChange(e, field)}
                        value={field.value}
                        checked={field.value}
                      />
                    </span>
                  </label>
                </li>
              ))}
          </ul>
        ) : (
          <p className={classes.noFields}>
            <strong>No fields could be found on this page.</strong>
          </p>
        )}
      </div>
      <div className={classes.tools}>
        <div className={classes.cellL}>
          <button
            type="button"
            className={classes.btnPrimary}
            disabled={fields.length === 0}
            onClick={() => {
              autofill(fields);
            }}
          >
            Autofill
          </button>
          <button
            type="button"
            className={classes.btnPrimary}
            disabled={fields.length === 0}
            onClick={() => {
              next();
            }}
          >
            Next Page
          </button>
        </div>
      </div>
    </main>
  );
};

App.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(App);
