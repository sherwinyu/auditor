import React from 'react';

import {ITEM_SHAPE} from '../constants';
import './Item.css';

function _indexOf(haystack, needle) {
  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] === needle) {
      return i;
    }
  }
  return null;
}

const joinWords = (words) => {
  let str = '';
  words.forEach((word) => {
    if (str.charAt(str.length - 1) && str.charAt(str.length - 1) !== ' ' && word.charAt(0) !== ' ') {
      str += ' ';
    }
    str += word;
  });
  return str;
};

const Item = React.createClass({
  propTypes: {
    item: ITEM_SHAPE.isRequired,
    index: React.PropTypes.number.isRequired,
    onInsertItem: React.PropTypes.func.isRequired,
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

  _insertNewItemAt(idx) {
    this.props.onInsertItem(idx);
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
    // DOWN
    if (e.which === 40) {
      e.preventDefault();
      const inputs = document.getElementsByClassName('item-input');
      const index = _indexOf(inputs, e.target);
      if (index != null && inputs[index + 1]) {
        inputs[index + 1].focus();
      }
    // UP
    } else if (e.which === 38) {
      e.preventDefault();
      const inputs = document.getElementsByClassName('item-input');
      const index = _indexOf(inputs, e.target);
      if (index && inputs[index - 1]) {
        inputs[index - 1].focus();
      }
    }
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
          className='item-input'
          value={this.state.inputText}
          onBlur={this._handleSaveItem}
          onChange={(e) => this.setState({inputText: e.target.value})}
        />
      </li>
    );
  },
});

export default Item;
