import React from 'react';
import {connect} from 'react-redux';

import {PERIOD_SHAPE, DAY_SHAPE} from '../constants';
import Item from './Item';

import Footer from './Footer';
import {addPeriod, editItem} from '../actions/index.js';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';

const mapStateToProps = (state) => ({
  day: state.day,
});

const mapDispatchToProps = (dispatch) => ({
  onAddPeriod: (e) => {
    dispatch(addPeriod());
  },
  onEditItem: (newItem) => {
    console.log('Editing new item', newItem, editItem());
    // dispatch(editItem())
  },
});

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
    <ConnectedHome />
  </div>
);

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
    {period.planned.map((item, idx) =>
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

const ConnectedHome = connect(mapStateToProps, mapDispatchToProps)(Home);


export default App;
