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

const mapDispatchToProps = (dispatch) => ({
  onAddPeriod: (e) => {
    dispatch(addPeriod());
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

const Day = ({onAddPeriod, day}) => (
  <div>
    <h2>{day.date}</h2>
    <button
      onClick={onAddPeriod}
    >
      Add Period
    </button>
    {day.periods.map((period) =>
      <Period period={period} key={period.startTime} />
    )}
  </div>
);

Day.propTypes = {
  day: DAY_SHAPE,
  onAddPeriod: React.PropTypes.func.isRequired,
};

const Home = ({day, onAddPeriod}) => (
  <Day day={day} onAddPeriod={onAddPeriod} />
);

Home.propTypes = {
  day: DAY_SHAPE,
  onAddPeriod: React.PropTypes.func.isRequired,
};

const ConnectedHome = connect(mapStateToProps, mapDispatchToProps)(Home);


export default App;
