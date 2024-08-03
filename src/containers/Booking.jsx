import React from 'react';
import { NO_EVENT_DATA } from '../api/endpoints';
import '../App.css';
import EventCards from '../components/EventCards';
import Fallback from '../components/Fallback';
import { isConflicting } from '../utils/helper';
import useFetch from '../utils/useFetch';
import useStorage from '../utils/useStorage';

const Booking = () => {
   const [selectedEvents, setSelectedEvents] = useStorage('selectedEvents', []);
   const { data: events, loading, error } = useFetch(NO_EVENT_DATA);

   const handleSelect = (event) => {
      if (selectedEvents.length >= 3) {
         alert('You can select a maximum of 3 events.');
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
      <div className='app' data-testid='booking-container'>
         {loading ? (
            <div>Loading...</div>
         ) : error ? (
            <Fallback
               title='Error: Unable to process'
               description={error || 'An unknown error occurred.'}
            />
         ) : !events.length ? (
            <Fallback
               title='Seems like we hit a snag'
               description={'No data here, please come back after some time'}
            />
         ) : (
            <>
               <div className='events-list'>
                  <h2>Events</h2>
                  <EventCards
                     events={events || []}
                     handleClick={handleSelect}
                     actionText='Select'
                     compareEvents={selectedEvents}
                  />
               </div>
               <div className='selected-events'>
                  <h2>Selected Events</h2>
                  <EventCards
                     events={selectedEvents}
                     handleClick={handleDeselect}
                     actionText='Deselect'
                  />
               </div>
            </>
         )}
      </div>
   );
};

export default Booking;
