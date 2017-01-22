import {combineReducers} from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';

// const period = (state = {}, action) => {
//   switch (action.type) {
//     case 'ADD_PERIOD':
//       return {
//         startTime: (new Date()).toISOString(),
//         planned: [],
//         actual: [],
//         interruptions: [],
//       };
//     default:
//       return state;
//   }
// };

const days = (state = {}, action, currentDay) => {
  switch (action.type) {
    case 'ADD_PERIOD':
      return Object.assign({}, state, {
        byId: {
          ...state.byId,
          [currentDay]: {
            ...state.byId[currentDay],
            periods: [...state.byId[currentDay].periods, action.payload.id],
          },
        },
      });
    default:
      return state;
  }
};

const day = (state = {}, action) => state;
const periods = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_PERIOD':
      return {
        byId: {
          ...state.byId,
          [action.payload.id]: {
            id: action.payload.id,
            startTime: (new Date()).toISOString(),
            planned: [],
            actual: [],
            interruptions: [],
          },
        },
      };
    default:
      return state;
  }
};

function editItem(state = {}, action) {
  const {payload} = action;
  const {id, text, duration} = payload;

  return {
    byId: {
      ...state.byId,
      [id]: {
        id,
        text,
        duration,
      },
    },
  };
}


const items = (state = {}, action) => {
  switch (action.type) {
    case 'EDIT_ITEM': return editItem(state, action);
    default:
      return state;
  }
};

const todoApp = (state = {}, action) => {
  let overrides = {
    days: state.days
  };
  if (action.type === 'ADD_PERIOD') {
    overrides = {
      days: days(state.days, action, state.day),
    };
  }
  return {
    ...combineReducers({
      todos,
      visibilityFilter,
      day,
      periods,
      items,
    })(state, action),
    ...overrides,
  };
};

export default todoApp;
