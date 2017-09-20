import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
import App from './components/App';
import { loadData } from './actions/data'

const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

store.dispatch(loadData())

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
