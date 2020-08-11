import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';

function App(props) {
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}
export default App;
