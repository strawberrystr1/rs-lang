import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
// import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { store } from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root'),
);
