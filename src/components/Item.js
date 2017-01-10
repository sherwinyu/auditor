import React from 'react';

import {ITEM_SHAPE} from '../constants';
import './Item.css';

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

  render() {
    const {item, onDeleteItem} = this.props;

    return (
      <li className='item'>
        <input
          className='item-input'
          value={this.state.inputText}
          onBlur={this._handleSaveItem}
          onChange={(e) => this.setState({inputText: e.target.value})}
        />
        <span className='small-text'>
          {item.text} - {item.duration}
        </span>
      </li>
    );
  },
});

export default Item;
