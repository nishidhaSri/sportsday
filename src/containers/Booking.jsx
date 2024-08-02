import React from 'react';
import { EVENT_DATA } from '../api/endpoints';
import '../App.css';
import EventCards from '../components/EventCards';
import Fallback from '../components/Fallback';
import useFetch from '../utils/useFetch';
import useStorage from '../utils/useStorage';

const Booking = () => {
   const [selectedEvents, setSelectedEvents] = useStorage('selectedEvents', []);
   const { data: events, loading, error } = useFetch(EVENT_DATA);

   const handleSelect = (event) => {
      if (selectedEvents.length >= 3) {
         alert('You can select a maximum of 3 events.');
         return;
      }
      if (isConflicting(event)) {
         alert('This event conflicts with an already selected event.');
         return;
      }
      setSelectedEvents([...selectedEvents, event]);
   };

   const handleDeselect = (event) => {
      setSelectedEvents(selectedEvents.filter((e) => e.id !== event.id));
   };

   const isConflicting = (newEvent) => {
      const { startTime, endTime } = newEvent;
      const startTimeMilli = new Date(startTime).getTime();
      const endTimeMilli = new Date(endTime).getTime();
      return selectedEvents.some((event) => {
         const { startTime: start, endTime: end } = event;
         const startMilli = new Date(start).getTime();
         const endMilli = new Date(end).getTime();
         return startTimeMilli < endMilli && endTimeMilli > startMilli;
      });
   };
   if (loading) return <div>Loading...</div>;
   if (error)
      return (
         <Fallback
            title='Error: Unable to process'
            description={error || 'An unknown error occurred.'}
         />
      );

   return (
      <div className='app'>
         <div className='events-list'>
            <h2>Events</h2>
            <EventCards
               events={events || []}
               handleClick={handleSelect}
               actionText="Select"
               compareEvents={selectedEvents}
            />
         </div>
         <div className='selected-events'>
            <h2>Selected Events</h2>
            <EventCards events={selectedEvents} handleClick={handleDeselect} actionText="Deselect" />
         </div>
      </div>
   );
};

export default Booking;
