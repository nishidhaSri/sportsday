export const isConflicting = (newEvent, selectedEvents) => {
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