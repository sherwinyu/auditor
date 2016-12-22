import React from 'react';
import Footer from './Footer';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
    <Home />
  </div>
);

const Day = () => (
  <div>
    Hello;
  </div>
);

const Home = () => (
  <Day />
);

export default App;
