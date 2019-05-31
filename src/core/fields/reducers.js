import actions from './actions';

const reducers = (state = {}, action) => {
  switch (action.type) {
    case actions.SET_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.domain]: {
            ...state.data[action.payload.domain],
            [action.payload.profile]: {
              ...action.payload.data,
              ...state.data[action.payload.domain][action.payload.profile],
            },
          },
        },
      };
    case actions.SET_VALUE:
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.field.clientId]: {
            ...state.data[action.payload.field.clientId],
            value: action.payload.value,
          },
        },
      };
    case actions.ADD_DOMAIN:
      if (state.data[actions.payload]) {
        return state;
      }

      return {
        ...state,
        data: {
          ...state.data,
          [action.payload]: {},
        },
      };
    default:
      return state;
  }
};

export default reducers;
