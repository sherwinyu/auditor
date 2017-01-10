import React from 'react';
import {connect} from 'react-redux';

import {PERIOD_SHAPE, DAY_SHAPE} from '../constants';
import Item from './Item';

import Footer from './Footer';
import {addPeriod, editItem} from '../actions/index.js';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';

const Period = ({period, onEditItem}) => (
  <div>
    <h3>{period.startTime}</h3>
    <h4>Planned</h4>
    {period.planned.map((item, idx) =>
      <Item
        item={item}
        key={idx}
        onEditItem={onEditItem}
      />
    )}
    <h4>Actual</h4>
    {period.actual.map((item, idx) =>
      <Item
        item={item}
        key={idx}
        onEditItem={onEditItem}
      />
    )}
    <h4>Interruptions</h4>
    {period.interruptions.map((item, idx) =>
      <Item
        item={item}
        key={idx}
        onEditItem={onEditItem}
      />
    )}
  </div>
);

Period.propTypes = {
  period: PERIOD_SHAPE,
  onEditItem: React.PropTypes.func.isRequired,
};

const Day = ({day, onAddPeriod, onEditItem}) => (
  <div>
    <h2>{day.date}</h2>
    <button
      onClick={onAddPeriod}
    >
      Add Period
    </button>
    {day.periods.map((period) =>
      <Period
        period={period}
        key={period.startTime}
        onEditItem={onEditItem}
      />
    )}
  </div>
);

Day.propTypes = {
  day: DAY_SHAPE,
  onAddPeriod: React.PropTypes.func.isRequired,
  onEditItem: React.PropTypes.func.isRequired,
};

const Home = ({day, onAddPeriod, onEditItem}) => (
  <Day
    day={day}
    onAddPeriod={onAddPeriod}
    onEditItem={onEditItem}
  />
);

Home.propTypes = {
  day: DAY_SHAPE,
  onAddPeriod: React.PropTypes.func.isRequired,
  onEditItem: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const day = state.days.byId[state.day];
  return {
    day: {
      ...day,
      periods: day.periods.map((periodId) => {
        const period = state.periods.byId[periodId];
        return {
          ...period,
          planned: period.planned.map((itemId) => state.items.byId[itemId]),
          actual: period.actual.map((itemId) => state.items.byId[itemId]),
          interruptions: [],
        };
      }),
    },
  };
};

const mapDispatchToProps = (dispatch) => ({
  onAddPeriod: (e) => {
    dispatch(addPeriod());
  },
  onEditItem: ({id, text, duration}) => {
    console.log('Editing new item', editItem({id, text, duration}));
    dispatch(editItem({id, text, duration}));
  },
});
const ConnectedHome = connect(mapStateToProps, mapDispatchToProps)(Home);

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
    <ConnectedHome />
  </div>
);

export default App;
