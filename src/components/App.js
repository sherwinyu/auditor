import React from 'react';
import {connect} from 'react-redux';
import Footer from './Footer';
import {addPeriod} from '../actions/index.js';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';

const ITEM_SHAPE = React.PropTypes.shape({
  duration: React.PropTypes.number.isRequired,
  text: React.PropTypes.string.isRequired,
});

const PERIOD_SHAPE = React.PropTypes.shape({
  startTime: React.PropTypes.string.isRequired,
  planned: React.PropTypes.arrayOf(ITEM_SHAPE).isRequired,
  interruptions: React.PropTypes.arrayOf(ITEM_SHAPE).isRequired,
});

const DAY_SHAPE = React.PropTypes.shape({
  date: React.PropTypes.string.isRequired,
  periods: React.PropTypes.arrayOf(PERIOD_SHAPE),
});

const mapStateToProps = (state) => ({
  day: state.day,
});

const mapDispatchToProps = {};

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
    <ConnectedHome />
  </div>
);

const Item = ({item}) => (
  <div>
    item.text
  </div>
);

Item.propTypes = {
  item: ITEM_SHAPE.isRequired,
};

const Period = ({period}) => (
  <div>
    <h3>{period.startTime}</h3>
    <h4>Planned</h4>
    {period.planned.map((item, idx) =>
      <Item item={item} key={idx} />
    )}
    <h4>Actual</h4>
    {period.planned.map((item, idx) =>
      <Item item={item} key={idx} />
    )}
    <h4>Interruptions</h4>
    {period.planned.map((item, idx) =>
      <Item item={item} key={idx} />
    )}
  </div>
);

Period.propTypes = {
  period: PERIOD_SHAPE,
};

const Day = ({store, day}) => (
  <div>
    <h2>{day.date}</h2>
    <button
      onClick={(e) => store.dispatch(addPeriod())}
    >
      Add Period
    </button>
    {day.periods.map((period) =>
      <Period period={period} key={period.startTime} />
    )}
  </div>
);

Day.propTypes = {
  store: React.PropTypes.object.isRequired,
  day: DAY_SHAPE,
};

const Home = ({day}) => (
  <Day day={day} />
);

Home.propTypes = {
  store: React.PropTypes.object.isRequired,
  day: DAY_SHAPE,
};

const ConnectedHome = connect(mapStateToProps, mapDispatchToProps)(Home);


export default App;
