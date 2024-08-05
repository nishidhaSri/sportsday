import PropTypes from 'prop-types';
import React from 'react';
import styles from '../styles/card.module.scss';

const Card = ({ event, onSelect, actionText, disabled = false }) => {
   return (
      <div
         className={`${styles.card} ${disabled ? styles.disabledCard : ''}`}
         data-testid='event-card'
      >
         <div className={styles.placeHolder}>
            {event.name.charAt(0)}
         </div>
         <div className={styles.verticalSeperator}></div>
         <div className={styles.content}>
            <div className={styles.header}>
               <h2>{event.name}</h2>
               <button
                  onClick={() => onSelect(event)}
                  disabled={disabled}
                  className={disabled ? styles.disabledBtn : styles.btn}
               >
                  {actionText}
               </button>
            </div>
            <p>
               <strong>Category:</strong> {event.category}
            </p>
            <p>
               <strong>Timing:</strong> {event.startTime} - {event.endTime}
            </p>
         </div>
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
