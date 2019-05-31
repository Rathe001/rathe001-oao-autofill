import actions from './actions';

const reducers = (state = {}, action) => {
  switch (action.type) {
    case actions.SET_NAME:
      return {
        ...state,
        name: action.payload,
      };
    default:
      return state;
  }
};

export default reducers;
