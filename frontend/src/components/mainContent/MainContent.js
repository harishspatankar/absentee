/* eslint-disable react/prop-types */
import React, { Suspense } from 'react';
import {
  Route, Switch, Redirect,
} from 'react-router-dom';
import { Skeleton } from 'antd';

import routes from '../../utils/routes';
import { showWarningNotification } from '../reusable/Notifications';
import Dahshboard from '../Dashboard/Dasgboard';
import Teachers from '../Teachers/TeacherContainer/TeacherContainer';
import addUser from '../User/AddEditUser';


function isAuthenticated() {
  if (true) {
    return true;
  }
  return false;
}

function getComponent({ location, ...rest }, Component) {
  if (isAuthenticated()) {
    const props = { location, ...rest };
    return <Component {...props} />;
  }
  showWarningNotification('Authentication Failed. Redirecting to login page.');
  return (
    <>
      <Redirect
        to={{
          pathname: routes.root,
          state: { from: location },
        }}
      />
    </>
  );
}

function PrivateRoute({ component: Component, ...rest }) {
  return <Route {...rest} render={props => getComponent(props, Component)} />;
}

const MainContent = () => (
  <Suspense fallback={<Skeleton active paragraph />}>
    <Switch>
      <PrivateRoute path={routes.dashboard} component={Dahshboard} />
      <PrivateRoute exact path={routes.teachers} component={Teachers} />
      <PrivateRoute exact path={routes.addTeachers} component={addUser} />
      <PrivateRoute exact path={routes.editTeacher} component={addUser} />
    </Switch>
  </Suspense>
);

export default MainContent;
