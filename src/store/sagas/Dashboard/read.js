import {
  all, takeLatest, put,
} from 'redux-saga/effects';
import { Types } from '../../ducks/Dashboard';
import Api from '../../../services/api';

function* requestRead({ payload }) {
  try {
    const { data } = yield Api.get('/people', {
      params: { ...payload }
    });
    yield put({ type: Types.SUCCESS_READ, payload: { dashboard: data } });
  } catch (err) {
    yield put({ type: Types.FAILURE_READ, payload: { dashboard: [] } });
  }
}

export default all([
  takeLatest(Types.READ, requestRead),
]);
