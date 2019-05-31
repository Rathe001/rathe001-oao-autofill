import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import { connect } from 'react-redux';
import domainActions from 'core/domain/actions';
import profileActions from 'core/profile/actions';
import fieldsActions from 'core/fields/actions';
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

const App = ({
  classes,
  setDomain,
  setProfile,
  setFields,
  setFieldValue,
  profileName,
  domainName,
  fieldsData,
}) => {
  function scrubFields() {
    const fields = Array.from(document.querySelectorAll('[class*="field-type--"]')).map((n, i) => {
      const elLabel = n.children[0].querySelector('label');

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

  function getFields() {
    chrome.tabs.executeScript(
      {
        code: `(${scrubFields})();`,
      },
      results =>
        setFields(
          domainName,
          profileName,
          results[0].reduce(
            (obj, item) => ({
              ...obj,
              [item.clientId]: item,
            }),
            {},
          ),
        ),
    );
  }

  useEffect(() => {
    if (chrome && chrome.tabs && chrome.tabs.query) {
      chrome.tabs.query({ active: true, windowId: chrome.windows.WINDOW_ID_CURRENT }, tabs => {
        setDomain(tabs[0].url.split('://')[1].split('/')[0]);
        getFields();
      });
    }
  }, []);
  /*
  function setPageFields(fields) {
    Object.keys(fields).map(key => {
      const elField = document.querySelector(
        `[data-name="${key}"] input, [data-name="${key}"] select`,
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
            }),
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
        code: `(${setPageFields})(${JSON.stringify(fields)});`,
      },
      () => {},
    );
  };

  const next = () => {
    chrome.tabs.executeScript(
      {
        code: `(${clickNext})(${JSON.stringify(fields)});`,
      },
      () => {},
    );
  };
*/
  return (
    <main>
      <h1 className={classes.header}>
        <small className={classes.domain}>{domainName}</small>
        OAO 4.0 Autofill
        <small className={classes.version}>1.0.1 beta</small>
      </h1>
      <div className={classes.tools}>
        <div className={classes.cellL}>
          <button
            type="button"
            className={classes.btnPrimary}
            disabled={fieldsData.length === 0}
            onClick={() => {
              // autofill(fields);
            }}
          >
            Autofill
          </button>
          <button
            type="button"
            className={classes.btnPrimary}
            disabled={fieldsData.length === 0}
            onClick={() => {
              // next();
            }}
          >
            Next Page
          </button>
        </div>
        <div className={classes.cellR}>
          <select value={profileName} onChange={e => setProfile(e.target.value)}>
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
        {Object.keys(fieldsData).length > 0 ? (
          <ul>
            {Object.keys(fieldsData)
              .map(key => fieldsData[key])
              .map(field => (
                <li key={field.id} className={classes.field}>
                  <label className={classes.label} htmlFor={field.clientId}>
                    <span className={classes.labelText}>
                      {field.label}
                      :
                      <br />
                      <small className={classes.clientId}>{field.clientId}</small>
                    </span>
                    <span className={classes.labelInput}>
                      <input
                        id={field.clientId}
                        type={getInputType(field.type)}
                        onChange={e => setFieldValue(field, e.target.value)}
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
            disabled={fieldsData.length === 0}
            onClick={() => {
              // autofill(fields);
            }}
          >
            Autofill
          </button>
          <button
            type="button"
            className={classes.btnPrimary}
            disabled={fieldsData.length === 0}
            onClick={() => {
              // next();
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
  profileName: PropTypes.string.isRequired,
  domainName: PropTypes.string.isRequired,
  fieldsData: PropTypes.shape({}).isRequired,
  setDomain: PropTypes.func.isRequired,
  setProfile: PropTypes.func.isRequired,
  setFields: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

const mapStateToProps = ({ profile, domain, fields }) => ({
  profileName: profile.name,
  domainName: domain.name,
  fieldsData: fields.data,
});

const mapDispatchToProps = {
  setDomain: domainActions.setName,
  setProfile: profileActions.setName,
  setFields: fieldsActions.setData,
  setFieldValue: fieldsActions.setValue,
};

const StyledApp = withStyles(styles)(App);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StyledApp);
