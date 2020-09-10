import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import React from 'react';
import PropTypes from 'prop-types';
import Page from '../Page';
import Login from '../../pages/Login';
import { selectIsAuthenticated } from '../../../domain/User/selectors';

const PrivateRoute = (props) => {
  const { component, isAuthenticated, ...options } = props;

  return <Route {...options} render={() => (isAuthenticated ? <Page component={component} /> : <Login />)} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.node.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
