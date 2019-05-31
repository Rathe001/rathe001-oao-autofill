import { takeEvery, put } from 'redux-saga/effects';
import fieldsActions from 'core/fields/actions';
import domainActions from './actions';

function* addDomainToFields(action) {
  try {
    yield put(fieldsActions.addDomain(action.payload));
  } catch (e) {
    // fail
  }
}

export default [takeEvery(domainActions.SET_NAME, addDomainToFields)];
