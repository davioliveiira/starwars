import { all } from 'redux-saga/effects';

import { Dashboard } from './sagas';

export default function* rootSaga() {
  return yield all([
    Dashboard,
  ]);
}