import { render, screen } from '@testing-library/react';
import React from 'react';
import EventCards from '../../components/EventCards';

const events = [
    { id: 1, name: 'Event 1', startTime: '2022-10-01', endTime: '2022-10-01', category: 'Category 1' },
    { id: 2, name: 'Event 2', startTime: '2022-10-02', endTime: '2022-10-01', category: 'Category 2' },
    { id: 3, name: 'Event 3', startTime: '2022-10-03', endTime: '2022-10-01', category: 'Category 3' },
];

const compareEvents = [
    { id: 1, name: 'Event 1', startTime: '2022-10-01', endTime: '2022-10-01', category: 'Category 1' },
];
const compareEventsIdsSet = new Set(compareEvents.map((event) => event.id));

describe('EventCards', () => {
    test('renders event cards with correct data', () => {

        render(<EventCards events={events} handleClick={jest.fn()} actionText='Click' />);

        const eventCards = screen.getAllByTestId('event-card');
        expect(eventCards).toHaveLength(events.length);

        events.forEach((event, index) => {
            const eventCard = eventCards[index];
            expect(eventCard).toHaveTextContent(event.name);
            expect(eventCard).toHaveTextContent(event.startTime);
            expect(eventCard).toHaveTextContent(event.category);
        });
    });

    test('renders event cards with correct data when compare events are provided', () => {
        render(<EventCards events={events} compareEvents={compareEvents} handleClick={jest.fn()} actionText='Click' />);

        const eventCardButtons = screen.getAllByText(/Click/i);
        expect(eventCardButtons).toHaveLength(events.length);

        const eventIndex = events.findIndex(event => compareEventsIdsSet.has(event.id)); 
        expect(eventCardButtons[eventIndex]).toBeDisabled()
    });

    test('renders "No events" message when events array is empty', () => {
        const events = [];

        render(<EventCards events={events} handleClick={jest.fn()} actionText='Click' />);

        const noEvents = screen.queryAllByTestId('event-card');
        expect(noEvents).toHaveLength(0);
    });
});