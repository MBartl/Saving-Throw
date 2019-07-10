import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { API_WS_ROOT } from './constants';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter, Route } from 'react-router-dom';
import { ActionCableProvider } from 'react-actioncable-provider';

import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const middleware = [thunk];

const store = createStore(rootReducer(), composeWithDevTools(
  applyMiddleware(...middleware)
));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ActionCableProvider url={API_WS_ROOT}>
        <Route component={App} />
      </ActionCableProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
