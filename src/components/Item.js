import React from 'react';

import {joinWords, handleUpDownShortcut} from '../lib';

import {ITEM_SHAPE} from '../constants';
import './Item.css';

const Item = React.createClass({
  propTypes: {
    periodId: React.PropTypes.number.isRequired,
    item: ITEM_SHAPE.isRequired,
    type: React.PropTypes.oneOf(['planned', 'actual', 'interruptions']).isRequired,
    index: React.PropTypes.number.isRequired,
    onInsertNewItem: React.PropTypes.func.isRequired,
    onEditItem: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return this._stateFromProps(this.props);
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState(this._stateFromProps(nextProps));
    }
  },

  _stateFromProps(props) {
    return {
      inputText: `${props.item.text}`,
    };
  },

  _handleSaveItem() {
    const matchedDuration = this.state.inputText.match(/(\d+) ?m(in)?s? ?/);
    let text = this.state.inputText;
    let duration;
    if (matchedDuration) {
      const durationText = matchedDuration[0];
      duration = parseInt(matchedDuration[1], 10);
      const index = matchedDuration.index;
      text = joinWords([
        text.substr(0, index),
        text.substr(index + durationText.length),
        durationText,
      ]).replace(/\s+$/, '');
    } else {
      duration = null;
    }
    this.props.onEditItem({
      id: this.props.item.id,
      text,
      duration,
    });
  },

  _insertNewItemAt(index) {
    this.props.onInsertNewItem(this.props.type, this.props.periodId, index);
  },

  _handleKeyDown(e) {
    // ENTER
    if (e.which === 13 && !e.shiftKey) {
      this._insertNewItemAt(this.props.index + 1);
    }
    // SHIFT ENTER
    if (e.which === 13 && e.shiftKey) {
      this._insertNewItemAt(this.props.index);
    }
    handleUpDownShortcut(e);
  },

  render() {
    const {item} = this.props;

    return (
      <li
        className='item'
        onKeyDown={this._handleKeyDown}
      >
        <span className='item-durationBadge'>
          {item.duration != null
            ? `${item.duration}m`
            : ''
          }
        </span>
        <input
          className='item-input js-tabbable'
          value={this.state.inputText}
          onBlur={this._handleSaveItem}
          onChange={(e) => this.setState({inputText: e.target.value})}
        />
      </li>
    );
  },
});

export default Item;
