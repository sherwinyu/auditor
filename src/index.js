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

  days: [
    1, 2, 3,
  ],
  daysById: {
    id: 0,
    name: '2016-11-25',
    timelog: [

    ],
  },
  day: {
    date: '2016-03-02',
    periods: [
      {
        startTime: '3pm',
        planned: [{
          text: '',
          duration: '23',
        }],
      },
      {
        startTime: '4pm',
        planned: [{
          text: '',
          duration: '23',
        }],
      },
    ],
  },
};

const store = createStore(reducer, INITIAL_STATE);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
