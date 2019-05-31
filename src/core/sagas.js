import { all } from 'redux-saga/effects';
import profile from 'core/profile/sagas';
import domain from 'core/domain/sagas';
import fields from 'core/fields/sagas';

const combineSagas = [...profile, ...domain, ...fields];

export default function* sagas() {
  yield all(combineSagas);
}
