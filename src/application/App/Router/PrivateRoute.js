import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Page from '../Page';

const PrivateRoute = (props) => {
  const { component, ...options } = props;

  return <Route {...options} render={() => <Page component={component} />} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.node.isRequired,
};

export default PrivateRoute;
