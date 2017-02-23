import React from 'react';

import {ITEM_SHAPE, PERIOD_SHAPE} from '../constants';
import Item from './Item';
import Home from './Home';
import './Period.css';

import {handleUpDownShortcut} from '../lib';


const ItemGroup = ({periodId, title, type, items, onInsertNewItem, onEditItem, onDeleteItem}) => (
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
        onDeleteItem={onDeleteItem}
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
  onDeleteItem: React.PropTypes.func.isRequired,
};

export const Period = ({period, onEditItem, onInsertNewItem, onDeleteItem}) => (
  <div className='period'>
    <div className='period-time'>
      <h4>{period.startTime}</h4>
    </div>
    <div className='period-itemGroups'>

      <ItemGroup
        type='planned'
        periodId={period.id}
        title='Planned'
        items={period.planned}
        onEditItem={onEditItem}
        onInsertNewItem={onInsertNewItem}
        onDeleteItem={onDeleteItem}
      />

      <ItemGroup
        type='actual'
        periodId={period.id}
        title='Actual'
        items={period.actual}
        onEditItem={onEditItem}
        onInsertNewItem={onInsertNewItem}
        onDeleteItem={onDeleteItem}
      />

      <ItemGroup
        type='interruptions'
        periodId={period.id}
        title='Interruptions'
        items={period.interruptions}
        onEditItem={onEditItem}
        onInsertNewItem={onInsertNewItem}
        onDeleteItem={onDeleteItem}
      />

    </div>
  </div>
);

Period.propTypes = {
  period: PERIOD_SHAPE,
  onEditItem: React.PropTypes.func.isRequired,
  onInsertNewItem: React.PropTypes.func.isRequired,
  onDeleteItem: React.PropTypes.func.isRequired,
};

const App = () => (
  <div>
    <Home />
  </div>
);

export default App;
