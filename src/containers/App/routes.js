import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import store, { history } from '../../store';
// components
import Dashboard from '../Dashboard';

const Router = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" component={Dashboard} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default Router;
