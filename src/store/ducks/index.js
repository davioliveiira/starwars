import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { Dashboard } from './reducers';

export default history => combineReducers({
  Dashboard,
  router: connectRouter(history),
});
