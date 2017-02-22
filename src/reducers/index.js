import {combineReducers} from 'redux';
import reactUpdate from 'react-addons-update';

import todos from './todos';
import visibilityFilter from './visibilityFilter';

const days = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_PERIOD':
      return Object.assign({}, state, {
        byId: {
          ...state.byId,
          [state.currentDay]: {
            ...state.byId[state.currentDay],
            periods: [...state.byId[state.currentDay].periods, action.payload.id],
          },
        },
      });
    default:
      return state;
  }
};

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
    case 'INSERT_ITEM': // eslint-disable-line
      return {
        byId: {
          ...state.byId,
          [action.payload.periodId]: {
            ...state.byId[action.payload.periodId],
            [action.payload.type]: reactUpdate(
              state.byId[action.payload.periodId][action.payload.type], {
                $splice: [[action.payload.index, 0, action.payload.newId]],
              }
            ),
          },
        },
      };
    case 'DELETE_ITEM': // eslint-disable-line
      return {
        byId: {
          ...state.byId,
          [action.payload.periodId]: {
            ...state.byId[action.payload.periodId],
            [action.payload.type]: reactUpdate(
              state.byId[action.payload.periodId][action.payload.type], {
                $splice: [[action.payload.index, 1]],
              }
            ),
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

function newItem(id) {
  return {
    id,
    text: '',
    duration: null,
    planned: [],
    actual: [],
    interruptions: [],
  };
}

function insertItem(state = {}, action) {
  const item = newItem(action.payload.newId);
  return {
    byId: {
      ...state.byId,
      [action.payload.newId]: item,
    },
  };
}

function deleteItem(state = {}, action) {
  // TODO fix this to not just set undefined, but rather delete the key altogether
  return {
    byId: {
      ...state.byId,
      [action.payload.id]: undefined,
    },
  };
}


const items = (state = {}, action) => {
  switch (action.type) {
    case 'EDIT_ITEM': return editItem(state, action);
    case 'INSERT_ITEM': return insertItem(state, action);
    case 'DELETE_ITEM': return deleteItem(state, action);
    default:
      return state;
  }
};

const todoApp = (state = {}, action) => {
  return {
    ...combineReducers({
      todos,
      visibilityFilter,
      days,
      periods,
      items,
    })(state, action),
  };
};

export default todoApp;
