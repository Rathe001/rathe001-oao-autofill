const actions = {
  SET_DATA: 'FIELDS_SET_DATA',
  setData: payload => ({
    type: actions.SET_DATA,
    payload,
  }),

  SET_CURRENT: 'FIELDS_SET_CURRENT',
  setCurrent: payload => ({
    type: actions.SET_CURRENT,
    payload,
  }),

  SET_VALUE: 'FIELDS_SET_VALUE',
  setValue: (key, field, value) => ({
    type: actions.SET_VALUE,
    payload: {
      key,
      field,
      value,
    },
  }),
};

export default actions;
