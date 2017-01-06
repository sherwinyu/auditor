import React from 'react';

export const ITEM_SHAPE = React.PropTypes.shape({
  id: React.PropTypes.number.isRequired,
  duration: React.PropTypes.number.isRequired,
  text: React.PropTypes.string.isRequired,
});

export const PERIOD_SHAPE = React.PropTypes.shape({
  id: React.PropTypes.number.isRequired,
  startTime: React.PropTypes.string.isRequired,
  planned: React.PropTypes.arrayOf(ITEM_SHAPE).isRequired,
  interruptions: React.PropTypes.arrayOf(ITEM_SHAPE).isRequired,
});

export const DAY_SHAPE = React.PropTypes.shape({
  id: React.PropTypes.number.isRequired,
  date: React.PropTypes.string.isRequired,
  periods: React.PropTypes.arrayOf(PERIOD_SHAPE),
});

