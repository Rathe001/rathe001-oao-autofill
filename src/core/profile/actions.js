const actions = {
  SET_NAME: 'PROFILE_SET_NAME',
  setName: payload => ({
    type: actions.SET_NAME,
    payload,
  }),
};

export default actions;
