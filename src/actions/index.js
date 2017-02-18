let nextTodoId = 0;
export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text,
});

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter,
});

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id,
});

// --------------------------------

let nextItemId = 100;

export const addPeriod = () => ({
  type: 'ADD_PERIOD',
  payload: {
    id: Math.random(),
  },
});

export const editItem = ({id, text, duration}) => ({
  type: 'EDIT_ITEM',
  payload: {
    id,
    text,
    duration,
  },
});

export const insertItem = (type, periodId, index) => ({
  type: 'INSERT_ITEM',
  payload: {
    periodId,
    type,
    index,
    newId: nextItemId++,
  },
});

/*
editPeriod
autofillPeriodsForDa
addPlannedItem
addActualItem
editInterruptions
addInteruption
deleteInterruption
editInterruption

editItem
deleteItem
*/
