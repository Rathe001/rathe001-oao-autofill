const actions = {
  SET_DATA: 'FIELDS_SET_DATA',
  setData: (domain, profile, data) => ({
    type: actions.SET_DATA,
    payload: {
      domain,
      profile,
      data,
    },
  }),

  SET_VALUE: 'FIELDS_SET_VALUE',
  setValue: (field, value) => ({
    type: actions.SET_VALUE,
    payload: {
      field,
      value,
    },
  }),

  ADD_DOMAIN: 'FIELDS_ADD_DOMAIN',
  addDomain: payload => ({
    type: actions.ADD_DOMAIN,
    payload,
  }),
};

export default actions;
