import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import { connect } from 'react-redux';
import domainActions from 'core/domain/actions';
import profileActions from 'core/profile/actions';
import fieldsActions from 'core/fields/actions';
import Field from 'components/Field';
import AutofillButton from 'components/AutofillButton';
import NextButton from 'components/NextButton';
import manifest from '../manifest.json';

import baseStyles from '../Styles';

const styles = {
  ...baseStyles,
  header: {
    fontFamily: "'Barlow Condensed', Arial, Helvetica, sans-serif",
    background: '#37435c',
    padding: 15,
    fontSize: 18,
    color: '#fff',
    margin: 0,
  },
  version: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#999',
    padding: '0 5px',
  },
  domain: {
    float: 'right',
  },
  tools: {
    display: 'flex',
    padding: 15,
    background: '#f2f2f2',
  },
  cellL: {
    flex: 1,
  },
  cellR: {
    flex: 1,
    textAlign: 'right',
  },
  fields: {
    padding: 15,
  },
  noFields: {
    marginTop: 15,
  },
};

const App = ({
  classes,
  setDomain,
  setProfile,
  setFields,
  setCurrentFields,
  profileName,
  domainName,
  fieldsData,
  currentFields,
}) => {
  function scrubFields() {
    const fields = Array.from(document.querySelectorAll('[class*="field-type--"]')).map((n, i) => {
      const elLabel = n.querySelector('label');
      let labelText = '';

      if (n.classList.contains('field-type--boolean-selector')) {
        n.querySelectorAll('label').forEach((label, index) => {
          if (index === 0) {
            labelText = `${labelText}checked: "${label.innerText}"<br /> `;
          } else {
            labelText = `${labelText}unchecked: "${label.innerText}" `;
          }
        });
      }

      return {
        id: i,
        label: labelText || (elLabel ? elLabel.innerText : n.innerText),
        clientId: n.getAttribute('data-name'),
        type: n.classList[1].split('field-type--')[1] || '',
        hidden: n.classList.contains('is-hiden'),
        required: n.classList.contains('required'),
      };
    });

    return fields.filter(f => !!f.clientId);
  }

  function getFields() {
    if (domainName && profileName) {
      chrome.tabs.executeScript(
        {
          code: `(${scrubFields})();`,
        },
        results => {
          if (results[0].length > 0 && domainName && profileName) {
            const fields = {
              ...results[0].reduce(
                (obj, item) => ({
                  ...obj,
                  [`${domainName}|${profileName}|${item.clientId}`]: item,
                }),
                {},
              ),
            };
            setCurrentFields(results[0].map(field => field.clientId));
            setFields(fields);
          }
        },
      );
    }
  }

  useEffect(() => {
    if (chrome && chrome.tabs && chrome.tabs.query) {
      chrome.tabs.query({ active: true, windowId: chrome.windows.WINDOW_ID_CURRENT }, tabs => {
        setDomain(tabs[0].url.split('://')[1].split('/')[0]);
        getFields();
      });
    }
  }, [profileName, domainName]);

  const onChangeProfile = e => {
    setProfile(e.target.value);
  };

  const prefix = `${domainName}|${profileName}|`;

  return (
    <main>
      <h1 className={classes.header}>
        <small className={classes.domain}>{domainName}</small>
        OAO 4.0 Autofill
        <small className={classes.version}>{manifest.version}</small>
      </h1>
      <div className={classes.tools}>
        <div className={classes.cellL}>
          <AutofillButton disabled={!currentFields.length} prefix={prefix} />
          <NextButton />
        </div>
        <div className={classes.cellR}>
          <select value={profileName} onChange={onChangeProfile}>
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
        {currentFields.length > 0 ? (
          <ul>
            {currentFields.map(
              clientId => fieldsData[`${prefix}${clientId}`]
                && fieldsData[`${prefix}${clientId}`].type !== 'html-element'
                && fieldsData[`${prefix}${clientId}`].type !== 'disclosure'
                && fieldsData[`${prefix}${clientId}`].type !== 'output'
                && (
                  <Field
                    key={clientId}
                    id={`${prefix}${clientId}`}
                    data={fieldsData[`${prefix}${clientId}`]}
                  />
                ),
            )}
          </ul>
        ) : (
          <p className={classes.noFields}>
            <strong>No fields could be found on this page.</strong>
          </p>
        )}
      </div>
      <div className={classes.tools}>
        <div className={classes.cellL}>
          <AutofillButton disabled={!currentFields.length} prefix={prefix} />
          <NextButton />
        </div>
      </div>
    </main>
  );
};

App.propTypes = {
  classes: PropTypes.shape({
    header: PropTypes.shape({}).isRequired,
    domain: PropTypes.shape({}).isRequired,
    version: PropTypes.shape({}).isRequired,
    tools: PropTypes.shape({}).isRequired,
    cellL: PropTypes.shape({}).isRequired,
    cellR: PropTypes.shape({}).isRequired,
    fields: PropTypes.shape({}).isRequired,
    noFields: PropTypes.shape({}).isRequired,
  }).isRequired,
  profileName: PropTypes.string.isRequired,
  domainName: PropTypes.string.isRequired,
  fieldsData: PropTypes.shape({}).isRequired,
  currentFields: PropTypes.arrayOf(PropTypes.string).isRequired,
  setDomain: PropTypes.func.isRequired,
  setProfile: PropTypes.func.isRequired,
  setFields: PropTypes.func.isRequired,
  setCurrentFields: PropTypes.func.isRequired,
};

const mapStateToProps = ({ profile, domain, fields }) => ({
  profileName: profile.name,
  domainName: domain.name,
  fieldsData: fields.data,
  currentFields: fields.current,
});

const mapDispatchToProps = {
  setDomain: domainActions.setName,
  setProfile: profileActions.setName,
  setFields: fieldsActions.setData,
  setCurrentFields: fieldsActions.setCurrent,
};

const StyledApp = withStyles(styles)(App);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StyledApp);
