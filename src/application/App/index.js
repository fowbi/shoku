import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Router from './Router';
import { fetchUser as fetchUserAction } from '../../domain/User/actions';

function App(props) {
  const { fetchUser } = props;
  const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#ffc4ff',
        main: '#ce93d8',
        dark: '#9c64a6',
        contrastText: '#000',
      },
      secondary: {
        light: '#df78ef',
        main: '#ab47bc',
        dark: '#790e8b',
        contrastText: '#fff',
      },
    },
  });

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

App.propTypes = { fetchUser: PropTypes.func.isRequired };

const mapStateToProps = createStructuredSelector({});
const mapDispatchToProps = { fetchUser: fetchUserAction };

export default connect(mapStateToProps, mapDispatchToProps)(App);
