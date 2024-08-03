import PropTypes from 'prop-types';
import React from 'react';
import Card from './Card';

const EventCards = ({ events = [], compareEvents = [], handleClick, actionText }) => {
   const compareEventsIdsSet = new Set(compareEvents.map((event) => event.id));
   const isEventDisabled = (event) => compareEventsIdsSet.has(event.id);

   return (
      <>
         {events.map((event) => (
               <Card
                  key={event.id}
                  event={event}
                  onSelect={handleClick}
                  disabled={isEventDisabled(event)}
                  actionText={actionText}
               />
            ))
         }
      </>
   );
};

EventCards.propTypes = {
   events: PropTypes.array,
   compareEvents: PropTypes.array,
   handleClick: PropTypes.func.isRequired,
   actionText: PropTypes.string.isRequired
};

export default EventCards;
