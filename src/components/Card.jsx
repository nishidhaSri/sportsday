import PropTypes from 'prop-types';
import React from 'react';

const Card = ({ event, onSelect, actionText, disabled = false }) => {
  return (
    <div className="event-card">
      <h3>{event.name}</h3>
      <p>Category: {event.category}</p>
      <p>Timing: {event.startTime} - {event.endTime}</p>
      <button onClick={() => onSelect(event)} disabled={disabled}>{actionText}</button>
    </div>
  );
};

Card.propTypes = {
  event: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  actionText: PropTypes.string.isRequired,
  disabled: PropTypes.bool
};

export default Card;
