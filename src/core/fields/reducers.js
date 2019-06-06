import actions from './actions';

const reducers = (state = {}, action) => {
  switch (action.type) {
    case actions.SET_DATA:
      return {
        ...state,
        data: {
          ...action.payload,
          ...state.data,
        },
      };
    case actions.SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case actions.SET_VALUE:
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.key]: {
            ...state.data[action.payload.key],
            value: action.payload.value,
          },
        },
      };
    default:
      return state;
  }
};

export default reducers;
