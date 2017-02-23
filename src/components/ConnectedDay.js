import React from 'react';
import {connect} from 'react-redux';

import {DAY_SHAPE} from '../constants';
import {Period} from './App';
import './Period.css';


import {addPeriod, editItem, insertItem, deleteItem} from '../actions/index.js';


const Day = ({day, onAddPeriod, onEditItem, onInsertNewItem, onDeleteItem}) => (
  <div>
    <h2>{day.date}</h2>
    <button
      onClick={onAddPeriod}
    >
      Add Period
    </button>

    <h3>Right now</h3>
    <div>
      <Period
        period={day.currentPeriod}
        onEditItem={onEditItem}
        onInsertNewItem={onInsertNewItem}
        onDeleteItem={onDeleteItem}
      />
      <Period
        period={day.nextPeriod}
        onEditItem={onEditItem}
        onInsertNewItem={onInsertNewItem}
        onDeleteItem={onDeleteItem}
      />
    </div>

    <h3>Recent</h3>
    {day.periods.map((period) =>
      <Period
        period={period}
        key={period.startTime}
        onEditItem={onEditItem}
        onInsertNewItem={onInsertNewItem}
        onDeleteItem={onDeleteItem}
      />
    )}
  </div>
);

Day.propTypes = {
  day: DAY_SHAPE,
  onAddPeriod: React.PropTypes.func.isRequired,
  onEditItem: React.PropTypes.func.isRequired,
  onInsertNewItem: React.PropTypes.func.isRequired,
  onDeleteItem: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const day = state.days.byId[state.days.currentDay];
  const periods = day.periods.map((periodId) => {
    const period = state.periods.byId[periodId];
    // Denormalize planned, actual, interruptions
    return {
      ...period,
      planned: period.planned.map((itemId) => state.items.byId[itemId]),
      actual: period.actual.map((itemId) => state.items.byId[itemId]),
      interruptions: [],
    };
  });

  return {
    day: {
      ...day,
      currentPeriod: periods[1],
      nextPeriod: periods[0],
      periods,
    },
  };
};

const mapDispatchToProps = (dispatch) => ({
  onAddPeriod: (e) => {
    dispatch(addPeriod());
  },
  onEditItem: ({id, text, duration}) => {
    // console.log('Editing new item', editItem({id, text, duration}));
    dispatch(editItem({id, text, duration}));
  },
  onInsertNewItem: (type, periodId, index) => {
    dispatch(insertItem(type, periodId, index));
  },
  onDeleteItem: ({id, index, periodId, type}) => {
    dispatch(deleteItem({id, index, periodId, type}));
  },
});

const ConnectedDay = connect(mapStateToProps, mapDispatchToProps)(Day);


export default ConnectedDay;
