import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';

const Root = () => (
  <BrowserRouter>
      <App />
  </BrowserRouter>
);

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);

//ReactDOM.render((
//  <BrowserRouter>
//    <App />
//  </BrowserRouter>
//), document.getElementById('root'));

module.hot.accept();
