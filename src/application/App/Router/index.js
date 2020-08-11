import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard';
import Page from '../Page';

const Router = () => {
  return (
    <Switch>
      <Route render={() => <Page component={Dashboard} />} />;
    </Switch>
  );
};

export default Router;
