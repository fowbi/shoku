import { Route } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import Page from '../Page';
import Login from '../../pages/Login';
import { getAccessToken } from '../../../utils/localStorage';

const PrivateRoute = (props) => {
  const { component, ...options } = props;

  const isAuthenticated = () => {
    const token = getAccessToken();
    return token !== null;
  };

  return <Route {...options} render={() => (isAuthenticated() ? <Page component={component} /> : <Login />)} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.node.isRequired,
};

export default PrivateRoute;
