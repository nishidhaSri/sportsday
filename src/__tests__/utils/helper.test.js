import { isConflicting } from '../../utils/helper'; // Adjust the path as necessary

describe('helper', () => {
  
  it('should return true if the new event overlaps with an existing event', () => {
    const newEvent = {
      startTime: '2024-08-05T10:00:00Z',
      endTime: '2024-08-05T12:00:00Z'
    };
    
    const selectedEvents = [
      {
        startTime: '2024-08-05T09:00:00Z',
        endTime: '2024-08-05T11:00:00Z'
      }
    ];
    
    expect(isConflicting(newEvent, selectedEvents)).toBe(true);
  });

  it('should return true if the new event is within an existing event', () => {
    const newEvent = {
      startTime: '2024-08-05T10:30:00Z',
      endTime: '2024-08-05T11:30:00Z'
    };
    
    const selectedEvents = [
      {
        startTime: '2024-08-05T10:00:00Z',
        endTime: '2024-08-05T12:00:00Z'
      }
    ];
    
    expect(isConflicting(newEvent, selectedEvents)).toBe(true);
  });

  it('should return false if the new event starts after and ends before an existing event', () => {
    const newEvent = {
      startTime: '2024-08-05T12:00:00Z',
      endTime: '2024-08-05T13:00:00Z'
    };
    
    const selectedEvents = [
      {
        startTime: '2024-08-05T09:00:00Z',
        endTime: '2024-08-05T11:00:00Z'
      }
    ];
    
    expect(isConflicting(newEvent, selectedEvents)).toBe(false);
  });

  it('should return false if the new event starts and ends before all existing events', () => {
    const newEvent = {
      startTime: '2024-08-05T08:00:00Z',
      endTime: '2024-08-05T09:00:00Z'
    };
    
    const selectedEvents = [
      {
        startTime: '2024-08-05T10:00:00Z',
        endTime: '2024-08-05T12:00:00Z'
      }
    ];
    
    expect(isConflicting(newEvent, selectedEvents)).toBe(false);
  });

  it('should return false if there are no selected events', () => {
    const newEvent = {
      startTime: '2024-08-05T10:00:00Z',
      endTime: '2024-08-05T11:00:00Z'
    };
    
    const selectedEvents = [];
    
    expect(isConflicting(newEvent, selectedEvents)).toBe(false);
  });

  it('should handle events that are exactly at the boundary of an existing event', () => {
    const newEvent = {
      startTime: '2024-08-05T11:00:00Z',
      endTime: '2024-08-05T12:00:00Z'
    };
    
    const selectedEvents = [
      {
        startTime: '2024-08-05T10:00:00Z',
        endTime: '2024-08-05T11:00:00Z'
      }
    ];
    
    expect(isConflicting(newEvent, selectedEvents)).toBe(false);
  });
});
