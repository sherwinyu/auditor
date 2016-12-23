import React from 'react';
import {connect} from 'react-redux'
import Footer from './Footer';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';

const ITEM_SHAPE = {
  duration: React.PropTypes.number.isRequired,
  text: React.PropTypes.number.isRequired,
};

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
    {period.planned.map((item) =>
      <Item item={item} />
    )}
    <h4>Actual</h4>
    {period.planned.map((item) =>
      <Item item={item} />
    )}
    <h4>Interruptions</h4>
    {period.planned.map((item) =>
      <Item item={item} />
    )}
  </div>
);

Period.propTypes = {
  period: PERIOD_SHAPE,
};

const Day = ({day}) => (
  <div>
    <h2>{day.date}</h2>
    {day.periods.map((period) =>
      <Period period={period} />
    )}
  </div>
);

Day.propTypes = {
  day: DAY_SHAPE,
};

const Home = ({day}) => (
  <Day day={day} />
);

Home.propTypes = {
  day: DAY_SHAPE,
};

const ConnectedHome = connect(mapStateToProps, mapDispatchToProps)(Home);


export default App;
