import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import rootReducer from './ducks';
import rootSaga from './sagas';

export const history = createBrowserHistory();

const middlewares = [
  routerMiddleware(history),
];

// const enableTron = ['development', 'test'].includes(process.env.NODE_ENV);
const enableTron = false;
const sagaMonitor = enableTron ? console.tron.createSagaMonitor : {};
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

middlewares.push(sagaMiddleware);

const store = createStore(
  rootReducer(history),
  enableTron
    ? compose(
      applyMiddleware(...middlewares),
      console.tron.createEnhancer(),
    )
    : compose(applyMiddleware(...middlewares)),
);

let sagaTask = sagaMiddleware.run(rootSaga);

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./ducks', () => {
    store.replaceReducer(rootReducer);
  });
  module.hot.accept('./sagas', () => {
    sagaTask.cancel();
    sagaTask.done.then(() => {
      sagaTask = sagaMiddleware.run(rootSaga);
    });
  });
}

export default store;