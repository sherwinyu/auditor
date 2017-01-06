import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import App from './components/App';
import reducer from './reducers';

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
        text: 'Destroy email',
      },
      2: {
        id: 2,
        duration: 5,
        text: 'Order instacart',
      },
      3: {
        id: 3,
        duration: 15,
        text: 'sync with reed',
      },
    },
  },
  periods: {
    byId: {
      1: {
        id: 1,
        startTime: '3pm',
        planned: [1, 2, 3],
        actual: [],
        interruptions: [],
      },
      2: {
        id: 2,
        startTime: '4pm',
        planned: [3],
        actual: [1, 2, 3],
        interruptions: [],
      },
    },
  },
  days: {
    byId: {
      1: {
        id: 1,
        date: '2016-03-02',
        periods: [1, 2],
      },
    },
  },
  day: '1',
};

const store = createStore(reducer, INITIAL_STATE);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
