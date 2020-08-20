import React from 'react';
import { Container } from '@material-ui/core';
import PropTypes from 'prop-types';

const Page = ({ component }) => {
  const ComponentToRender = component;

  return (
    <Container maxWidth={false}>
      <ComponentToRender />
    </Container>
  );
};

Page.propTypes = {
  component: PropTypes.func.isRequired,
};

export default Page;
