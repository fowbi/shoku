import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard';
import Register from '../../pages/Register';
import Page from '../Page';
import PrivateRoute from './PrivateRoute';

const Router = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Dashboard} />;
      <Route exact path="/signUp" render={() => <Page component={Register} />} />;
    </Switch>
  );
};

export default Router;
