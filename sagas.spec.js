import test from 'tape';
import { put, call } from 'redux-saga/effects';
import { incrementAsync, delay, fetchData } from './sagas';
import HttpFetch from './HttpFetch';

test('incrementAsync Saga test', assert => {
  const gen = incrementAsync();

  assert.deepEqual(
    gen.next().value,
    call(delay, 1000),
    'incrementAsync Saga must call delay(1000)'
  );

  assert.deepEqual(
    gen.next().value,
    put({ type: 'INCREMENT' }),
    'incrementAsync Saga must dispatch an INCREMENT action'
  );

  assert.deepEqual(
    gen.next(),
    { done: true, value: undefined },
    'incrementAsync Saga must be done'
  );

  assert.end();
});

test('fetch data from beers api', asset => {
  const intereator = fetchData();

  asset.deepEqual(
    intereator.next().value,
    call(HttpFetch.get, 'https://api.punkapi.com/v2/beers'),
    'fetch beers from beers end point'
  );

  const error = {};

  // fake error
  asset.deepEqual(
    intereator.throw(error).value,
    put({ type: 'FETCH_FAILURE', error }),
    'should yiled aerror and dispatch action FETCH_FAILURE'
  );

  asset.end();
});
