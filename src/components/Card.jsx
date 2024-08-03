import PropTypes from 'prop-types';
import React from 'react';
import styles from '../styles/card.module.scss';

const Card = ({ event, onSelect, actionText, disabled = false }) => {
   return (
      <div className={styles.card} data-testid='event-card'>
         <div className={styles.header}>
            <h2>{event.name}</h2>
            <button onClick={() => onSelect(event)} disabled={disabled}>
               {actionText}
            </button>
         </div>
         <p><strong>Category:</strong> {event.category}</p>
         <p>
            <strong>Timing:</strong> {event.startTime} - {event.endTime}
         </p>
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
