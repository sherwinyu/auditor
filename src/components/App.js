import React from 'react';
import {connect} from 'react-redux';

import {DAY_SHAPE, ITEM_SHAPE, PERIOD_SHAPE} from '../constants';
import Item from './Item';
import './Period.css';

import {handleUpDownShortcut} from '../lib';

import Footer from './Footer';
import {addPeriod, editItem, insertItem} from '../actions/index.js';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';


const ItemGroup = ({periodId, title, type, items, onInsertNewItem, onEditItem}) => (
  <div className='period-itemGroup'>
    <h4
      tabIndex={0}
      className='period-itemGroupLabel js-tabbable'
      onKeyDown={(e) => {
        handleUpDownShortcut(e);
        if (e.which === 13 && !e.shiftKey) {
          onInsertNewItem(type, periodId, 0);
        }
      }}
    >
      {title}
    </h4>
    {items.map((item, idx) =>
      <Item
        periodId={periodId}
        type={type}
        item={item}
        key={idx}
        index={idx}
        onInsertNewItem={onInsertNewItem}
        onEditItem={onEditItem}
      />
    )}
  </div>
);

ItemGroup.propTypes = {
  periodId: React.PropTypes.number.isRequired,
  type: React.PropTypes.oneOf(['planned', 'actual', 'interruptions']).isRequired,
  title: React.PropTypes.string.isRequired,
  items: React.PropTypes.arrayOf(ITEM_SHAPE).isRequired,
  onEditItem: React.PropTypes.func.isRequired,
  onInsertNewItem: React.PropTypes.func.isRequired,
};

const Period = ({period, onEditItem, onInsertNewItem}) => (
  <div className='period'>
    <div className='period-time'>
      <h3>{period.startTime}</h3>
    </div>
    <div className='period-itemGroups'>

      <ItemGroup
        type='planned'
        periodId={period.id}
        title='Planned'
        items={period.planned}
        onEditItem={onEditItem}
        onInsertNewItem={onInsertNewItem}
      />

      <ItemGroup
        type='actual'
        periodId={period.id}
        title='Actual'
        items={period.actual}
        onEditItem={onEditItem}
        onInsertNewItem={onInsertNewItem}
      />

      <ItemGroup
        type='interruptions'
        periodId={period.id}
        title='Interruptions'
        items={period.interruptions}
        onEditItem={onEditItem}
        onInsertNewItem={onInsertNewItem}
      />

    </div>
  </div>
);

Period.propTypes = {
  period: PERIOD_SHAPE,
  onEditItem: React.PropTypes.func.isRequired,
  onInsertNewItem: React.PropTypes.func.isRequired,
};

const Day = ({day, onAddPeriod, onEditItem, onInsertNewItem}) => (
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
        onInsertNewItem={onInsertNewItem}
      />
    )}
  </div>
);

Day.propTypes = {
  day: DAY_SHAPE,
  onAddPeriod: React.PropTypes.func.isRequired,
  onEditItem: React.PropTypes.func.isRequired,
  onInsertNewItem: React.PropTypes.func.isRequired,
};

const Home = ({day, onAddPeriod, onEditItem, onInsertNewItem}) => (
  <Day
    day={day}
    onAddPeriod={onAddPeriod}
    onEditItem={onEditItem}
    onInsertNewItem={onInsertNewItem}
  />
);

Home.propTypes = {
  day: DAY_SHAPE,
  onAddPeriod: React.PropTypes.func.isRequired,
  onEditItem: React.PropTypes.func.isRequired,
  onInsertNewItem: React.PropTypes.func.isRequired,
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
  onInsertNewItem: (type, periodId, index) => {
    console.log('Inserting new item after', insertItem(type, periodId, index));
    dispatch(insertItem(type, periodId, index));
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
