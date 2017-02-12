import React from 'react';
import {connect} from 'react-redux';

import {DAY_SHAPE, ITEM_SHAPE, PERIOD_SHAPE} from '../constants';
import Item from './Item';
import './Period.css';

import Footer from './Footer';
import {addPeriod, editItem, insertItem} from '../actions/index.js';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';

const ItemGroup = ({title, items, onInsertItem, onEditItem}) => (
  <div className='period-itemGroup'>
    <h4 className='period-itemGroupLabel'>{title}</h4>
    {items.map((item, idx) =>
      <Item
        item={item}
        key={idx}
        index={idx}
        onInsertItem={onInsertItem}
        onEditItem={onEditItem}
      />
    )}
  </div>
);

ItemGroup.propTypes = {
  title: React.PropTypes.string.isRequired,
  items: React.PropTypes.arrayOf(ITEM_SHAPE).isRequired,
  onEditItem: React.PropTypes.func.isRequired,
  onInsertItem: React.PropTypes.func.isRequired,
};

const Period = ({period, onEditItem, onInsertItem}) => (
  <div className='period'>
    <div className='period-time'>
      <h3>{period.startTime}</h3>
    </div>
    <div className='period-itemGroups'>

      <ItemGroup
        title='Planned'
        items={period.planned}
        onEditItem={onEditItem}
        onInsertItem={onInsertItem}
      />

      <ItemGroup
        title='Actual'
        items={period.actual}
        onEditItem={onEditItem}
        onInsertItem={onInsertItem}
      />

      <ItemGroup
        title='Interruptions'
        items={period.interruptions}
        onEditItem={onEditItem}
        onInsertItem={onInsertItem}
      />

    </div>
  </div>
);

Period.propTypes = {
  period: PERIOD_SHAPE,
  onEditItem: React.PropTypes.func.isRequired,
  onInsertItem: React.PropTypes.func.isRequired,
};

const Day = ({day, onAddPeriod, onEditItem, onInsertItem}) => (
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
        onInsertItem={onInsertItem}
      />
    )}
  </div>
);

Day.propTypes = {
  day: DAY_SHAPE,
  onAddPeriod: React.PropTypes.func.isRequired,
  onEditItem: React.PropTypes.func.isRequired,
  onInsertItem: React.PropTypes.func.isRequired,
};

const Home = ({day, onAddPeriod, onEditItem, onInsertItem}) => (
  <Day
    day={day}
    onAddPeriod={onAddPeriod}
    onEditItem={onEditItem}
    onInsertItem={onInsertItem}
  />
);

Home.propTypes = {
  day: DAY_SHAPE,
  onAddPeriod: React.PropTypes.func.isRequired,
  onEditItem: React.PropTypes.func.isRequired,
  onInsertItem: React.PropTypes.func.isRequired,
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
    // console.log('Editing new item', editItem({id, text, duration}));
    dispatch(editItem({id, text, duration}));
  },
  onInsertItem: (index) => {
    console.log('Inserting new item', insertItem({index}));
    dispatch(insertItem(index));
  }

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
