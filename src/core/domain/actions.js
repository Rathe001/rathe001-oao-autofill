const actions = {
  SET_NAME: 'DOMAIN_SET_NAME',
  setName: payload => ({
    type: actions.SET_NAME,
    payload,
  }),
};

export default actions;
