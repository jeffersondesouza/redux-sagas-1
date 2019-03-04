import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import createSagaMidleware from 'redux-saga';

import Counter from './Counter';
import reducer from './reducers';

import rootSaga from './sagas';

const sagaMidleware = createSagaMidleware();

const store = createStore(reducer, applyMiddleware(sagaMidleware));
sagaMidleware.run(rootSaga);

const action = type => store.dispatch({ type });

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')}
      onIncrementAsync={() => action('FETCH_REQUESTED')}
    />,
    document.getElementById('root')
  );
}

render();
store.subscribe(render);
