import React from 'react';

import {ITEM_SHAPE} from '../constants';

const Item = React.createClass({
  propTypes: {
    item: ITEM_SHAPE.isRequired,
    onEditItem: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return this._stateFromProps();
  },

  componentWillReceiveProps(prevProps) {
    this.setState(this._stateFromProps());
  },

  _stateFromProps() {
    return {
      inputText: `${this.props.item.text} - ${this.props.item.duration}`,
    };
  },

  _handleSaveItem() {
    this.props.onEditItem({
      text: this.state.inputText,
      duration: 5,
    });
  },

  render() {
    const {item, onDeleteItem} = this.props;

    return (
      <div className='item'>
        <input
          value={this.state.inputText}
          onBlur={this._handleSaveItem}
          onChange={(e) => this.setState({inputText: e.target.value})}
        />
        {item.text} - {item.duration}
      </div>
    );
  },
});

export default Item;
