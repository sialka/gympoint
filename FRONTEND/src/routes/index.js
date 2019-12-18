import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import Student from '../pages/Student/All';
import CreateStudent from '../pages/Student/Create';
import UpdateStudent from '../pages/Student/Update';
import Plan from '../pages/Plan/All';
import CreatePlan from '../pages/Plan/Create';
import UpdatePlan from '../pages/Plan/Update';
import Enrollment from '../pages/Enrollment/All';
import CreateEnrollment from '../pages/Enrollment/Create';
import UpdateEnrollment from '../pages/Enrollment/Update';
import Assistence from '../pages/Assistence';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/students" exact component={Student} isPrivate />
      <Route path="/students/create" component={CreateStudent} isPrivate />
      <Route path="/students/update" component={UpdateStudent} isPrivate />
      <Route path="/plans" exact component={Plan} isPrivate />
      <Route path="/plans/create" exact component={CreatePlan} isPrivate />
      <Route path="/plans/update" exact component={UpdatePlan} isPrivate />
      <Route path="/enrollments" exact component={Enrollment} isPrivate />
      <Route path="/enrollments/create" exact component={CreateEnrollment} isPrivate />
      <Route path="/enrollments/update" exact component={UpdateEnrollment} isPrivate />
      <Route path="/assistences" exact component={Assistence} isPrivate />
    </Switch>
  );
}
