import { put, takeEvery, takeLatest, call, all } from 'redux-saga/effects';
import HttpFetch from './HttpFetch';
export const delay = ms => new Promise(res => setTimeout(res, ms));

export function* helloSaga() {
  console.log('Hello Sagas');
}

export function* incrementAsync() {
  yield call(delay, 1000);
  yield put({ type: 'INCREMENT' });
}

export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync);
}

export function* fetchData() {
  console.log('fetchData');

  try {
    const res = yield call(
      HttpFetch.get,
      'https://api.punkapi.com/v2/beers'
    );
    console.log('res:', res);
    const data = yield res.json();
    yield put({ type: 'FETCH_SUCCESS', data });
  } catch (error) {
    console.log('error:', error);
    yield put({ type: 'FETCH_FAILURE', error });
  }
}

function* watchFetchData() {
  console.log('watchFetchData');

  yield takeLatest('FETCH_REQUESTED', fetchData);
}

export default function* rootSaga() {
  yield all([helloSaga(), watchIncrementAsync(), watchFetchData()]);
}
