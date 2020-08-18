import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Router from './Router';

function App() {
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
export default App;
