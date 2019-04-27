/* eslint-disable react/prop-types */
import React, { Suspense } from 'react';
import {
  Route, Switch, Redirect,
} from 'react-router-dom';
import { Skeleton } from 'antd';

import routes from '../../utils/routes';
import { showWarningNotification } from '../reusable/Notifications';
import Dashboard from '../Dashboard/Dashboard';


import StudentList from '../student/studentList';
import StudentForm from '../student/studentForm';

import ClassList from '../class/classList';
import ClassForm from '../class/classForm';
import Teachers from '../Teachers/TeacherContainer/TeacherContainer';
import addUser from '../User/AddEditUser';

import Presenty from '../presenty/Presenty';
import { getItem } from '../helpers/localStorage';


function isAuthenticated() {
  if (getItem('api_key')) {
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
      <PrivateRoute exact path={routes.dashboard} component={Dashboard} />

      <PrivateRoute exact path={routes.studentList} component={StudentList} />
      <PrivateRoute exact path={routes.studentAdd} component={StudentForm} />
      <PrivateRoute exact path={routes.studentEdit} component={StudentForm} />

      <PrivateRoute exact path={routes.classList} component={ClassList} />
      <PrivateRoute exact path={routes.classAdd} component={ClassForm} />
      <PrivateRoute exact path={routes.classEdit} component={ClassForm} />

      <PrivateRoute exact path={routes.presenty} component={Presenty} />
      <PrivateRoute exact path={routes.teachers} component={Teachers} />
      <PrivateRoute exact path={routes.addTeachers} component={addUser} />
      <PrivateRoute exact path={routes.editTeacher} component={addUser} />

    </Switch>
  </Suspense>
);

export default MainContent;
