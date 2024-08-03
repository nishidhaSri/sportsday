import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Booking from '../../containers/Booking';
import { isConflicting } from '../../utils/helper';
import useFetch from '../../utils/useFetch';
import useStorage from '../../utils/useStorage';

// Mock the custom hooks
jest.mock('../../utils/useFetch');
jest.mock('../../utils/useStorage');
jest.mock('../../utils/helper')

const mockEvents = [
  { id: 1, name: 'Event 1', category: "Category 1", startTime: "2022-12-17 13:00:00", endTime: "2022-12-17 14:00:00" },
  { id: 2, name: 'Event 2', category: "Category 2", startTime: "2022-12-17 14:00:00", endTime: "2022-12-17 15:00:00" },
  { id: 3, name: 'Event 3', category: "Category 3", startTime: "2022-12-17 16:00:00", endTime: "2022-12-17 17:00:00" },
];

const mockSelectedEvents = [
    { id: 4, name: 'Event 1', category: "Category 1", startTime: "2022-12-17 13:00:00", endTime: "2022-12-17 14:00:00" },
    { id: 2, name: 'Event 2', category: "Category 2", startTime: "2022-12-17 14:00:00", endTime: "2022-12-17 15:00:00" },
    { id: 3, name: 'Event 3', category: "Category 3", startTime: "2022-12-17 16:00:00", endTime: "2022-12-17 17:00:00" },
];


const conflictSelectedEvents = [
    { id: 5, name: 'Event 5', category: "Category 5", startTime: "2022-12-17 13:00:00", endTime: "2022-12-17 14:00:00" }
];

describe('Booking Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn()
  });

  test('renders loading state', () => {
    useFetch.mockReturnValue({ data: [], loading: true, error: null });
    useStorage.mockReturnValue([[], jest.fn()]); 
    
    render(<Booking />);
    
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('renders error state', () => {
    useFetch.mockReturnValue({ data: [], loading: false, error: 'Failed to fetch' });
    useStorage.mockReturnValue([[], jest.fn()]); 
    
    render(<Booking />);
    
    expect(screen.getByText(/Error: Unable to process/i)).toBeInTheDocument();
    expect(screen.getByText(/Failed to fetch/i)).toBeInTheDocument();
  });

  test('renders empty data state', () => {
    useFetch.mockReturnValue({ data: [], loading: false, error: null });
    useStorage.mockReturnValue([[], jest.fn()]); 
    
    render(<Booking />);
    
    expect(screen.getByText(/Seems like we hit a snag/i)).toBeInTheDocument();
    expect(screen.getByText(/No data here, please come back after some time/i)).toBeInTheDocument();
  });

  test('handles successfull event selelctions', async () => {
    useFetch.mockReturnValue({ data: mockEvents, loading: false, error: null });
    const setStorage = jest.fn()
    useStorage.mockReturnValue([[], setStorage]);

    render(<Booking />);

    expect(screen.getByText("Events")).toBeInTheDocument();
    mockEvents.forEach(event => {
      expect(screen.getByText(event.name)).toBeInTheDocument();
    });

    const buttons = screen.getAllByText("Add")
    fireEvent.click(buttons[0]); 

    expect(setStorage).toHaveBeenCalledWith(expect.arrayContaining([mockEvents[0]]));
    expect(setStorage).toHaveBeenCalledTimes(1);
  })

  test('handles event selections more than 3', async () => {
    useFetch.mockReturnValue({ data: mockEvents, loading: false, error: null });
    useStorage.mockReturnValue([mockSelectedEvents, jest.fn()]); 

    render(<Booking />);

    fireEvent.click(screen.getAllByText("Add")[0]);
    
    expect(window.alert).toHaveBeenCalledTimes(1)
    expect(window.alert).toHaveBeenCalledWith('You can select a maximum of 3 events.');
  });

  test('handles event selection conflicts', () => {
    useFetch.mockReturnValue({ data: mockEvents, loading: false, error: null });
    useStorage.mockReturnValue([conflictSelectedEvents, jest.fn()]); 
    isConflicting.mockReturnValue(true);

    render(<Booking />);

    fireEvent.click(screen.getAllByText("Add")[0]); 
    
    expect(window.alert).toHaveBeenCalledTimes(1)
    expect(window.alert).toHaveBeenCalledWith('This event conflicts with an already selected event.');
  });

  test('handles event deselection', async () => {
    const setSelectedEvents = jest.fn();
    useFetch.mockReturnValue({ data: mockEvents, loading: false, error: null });
    useStorage.mockReturnValue([mockEvents, setSelectedEvents]);

    render(<Booking />);

    fireEvent.click(screen.getAllByText("Remove")[0]); 
    const expectedSelectedEvents = mockEvents.filter((e) => e.id !== 1);

    expect(setSelectedEvents).toHaveBeenCalledTimes(1);
    expect(setSelectedEvents).toHaveBeenCalledWith(expectedSelectedEvents)
  });
});
