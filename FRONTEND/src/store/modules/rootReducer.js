import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import student from './student/reducer';
import plan from './plan/reducer';
import enrollment from './enrollment/reducer';
import assistence from './assistence/reducer';

export default combineReducers({
  auth,
  user,
  student,
  plan,
  enrollment,
  assistence,
});
