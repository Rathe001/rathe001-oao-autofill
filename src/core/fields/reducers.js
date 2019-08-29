import actions from './actions';

const reducers = (state = {}, action) => {
  switch (action.type) {
    case actions.SET_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          ...Object.keys(action.payload)
            .map(field => ({
              ...state.data[field],
              ...action.payload[field],
              key: field,
              value: state.data[field].value,
            }))
            .reduce(
              (fields, item) => ({
                ...fields,
                [item.key]: item,
              }),
              {},
            ),
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
