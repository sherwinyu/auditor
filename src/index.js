import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import App from './components/App';
import reducer from './reducers';

function _dateStateHelper(hour, minute) {
  const d = new Date();
  return new Date(
    d.getFullYear(),
    d.getMonth(),
    d.getDate(),
    hour,
    minute
  ).toISOString();
}


const INITIAL_STATE = {
  todos: [
    {
      id: -11,
      text: 'hello',
      completed: false,
    },
    {
      id: -10,
      text: 'hello',
      completed: false,
    },
  ],
  visibilityFilter: 'SHOW_ALL',

  // ------------

  items: {
    byId: {
      1: {
        id: 1,
        duration: 30,
        text: 'Destroy email 30m',
      },
      2: {
        id: 2,
        duration: 5,
        text: 'Order instacart 15m',
      },
      3: {
        id: 3,
        duration: 15,
        text: 'sync with reed 15m',
      },
    },
  },
  periods: {
    byId: {
      1: {
        id: 1,
        startTime: _dateStateHelper(15, 0),
        planned: [1, 2, 3],
        actual: [],
        interruptions: [],
      },
      2: {
        id: 2,
        startTime: _dateStateHelper(16, 0),
        planned: [],
        actual: [],
        interruptions: [],
      },
      3: {
        id: 3,
        startTime: _dateStateHelper(16, 30),
        planned: [],
        actual: [],
        interruptions: [],
      },
      4: {
        id: 4,
        startTime: _dateStateHelper(17, 0),
        planned: [],
        actual: [],
        interruptions: [],
      },
    },
  },
  days: {
    byId: {
      1: {
        id: 1,
        date: '2016-03-02',
        periods: [4, 3, 2, 1],
      },
    },
    currentDay: 1,
  },
};

const store = createStore(reducer, INITIAL_STATE);
window.store = store;

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
