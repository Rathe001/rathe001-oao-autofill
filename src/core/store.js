import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import coreReducers from './reducers';
import coreSagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const initialState = {
  domain: {
    name: '',
  },
  fields: {
    current: [],
    data: {},
  },
  profile: {
    name: 'profile1',
  },
};

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : initialState;

const store = createStore(
  coreReducers,
  persistedState,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(coreSagas);

export default store;
