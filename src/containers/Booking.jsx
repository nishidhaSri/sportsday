import React from 'react';
import { EVENT_DATA } from '../api/endpoints';
import EventCards from '../components/EventCards';
import Fallback from '../components/Fallback';
import Loader from '../components/Loader';
import styles from '../styles/booking.module.scss';
import { isConflicting } from '../utils/helper';
import useFetch from '../utils/useFetch';
import useStorage from '../utils/useStorage';

const MAX_ALLOWED_EVENTS = 3

const Booking = () => {
   const [selectedEvents, setSelectedEvents] = useStorage('selectedEvents', []);
   const { data: events, loading, error } = useFetch(EVENT_DATA, []);

   const handleSelect = (event) => {
      if (selectedEvents.length >= MAX_ALLOWED_EVENTS) {
         alert('You can select a maximum of ' + MAX_ALLOWED_EVENTS + ' events.');
         return;
      }
      if (isConflicting(event, selectedEvents)) {
         alert('This event conflicts with an already selected event.');
         return;
      }
      setSelectedEvents([...selectedEvents, event]);
   };

   const handleDeselect = (event) => {
      setSelectedEvents(selectedEvents.filter((e) => e.id !== event.id));
   };

   return (
      <div className={styles.bookingContainer} data-testid='booking-container'>
         {loading ? (
            <Loader />
         ) : error ? (
            <Fallback
               title='Error: Unable to process'
               description={error}
            />
         ) : !events.length ? (
            <Fallback
               title='Seems like we hit a snag'
               description={'No data here, please come back after some time'}
            />
         ) : (
            <>
               <div className={styles.eventsList}>
                  <h2 className={styles.title}>Events</h2>
                  <EventCards
                     events={events}
                     handleClick={handleSelect}
                     actionText='Add'
                     compareEvents={selectedEvents}
                  />
               </div>
               <div className={styles.eventsList}>
                  <h2 className={styles.title}>Selected Events</h2>
                  {selectedEvents.length ? (
                     <EventCards
                        events={selectedEvents}
                        handleClick={handleDeselect}
                        actionText='Remove'
                     />
                  ) : (
                     <Fallback
                        title='No events selected'
                        description={'Select upto ' + MAX_ALLOWED_EVENTS + ' events to participate on Sports Day'}
                     />
                  )}
               </div>
            </>
         )}
      </div>
   );
};

export default Booking;
