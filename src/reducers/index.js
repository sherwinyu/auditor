import {combineReducers} from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';

const period = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_PERIOD':
      return {
        startTime: (new Date()).toISOString(),
        planned: [],
        actual: [],
        interruptions: [],
      };
    default:
      return state;
  }
};

const day = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_PERIOD':
      return Object.assign({}, state, {
        periods: [...state.periods, period(undefined, action)],
      });
    default:
      return state;
  }
};

const todoApp = combineReducers({
  todos,
  visibilityFilter,
  day,
});

export default todoApp;
