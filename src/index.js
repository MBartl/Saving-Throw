import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter, Route } from 'react-router-dom';
import thunk from 'redux-thunk';

import rootReducer from './reducers/rootReducer';

const middleware = [thunk]

const store = createStore(rootReducer(), composeWithDevTools(
  applyMiddleware(...middleware)
));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route component={App} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
