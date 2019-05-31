import { combineReducers } from 'redux';
import domain from 'core/domain/reducers';
import profile from 'core/profile/reducers';
import fields from 'core/fields/reducers';

export default combineReducers({
  domain,
  profile,
  fields,
});
