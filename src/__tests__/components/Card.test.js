import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Card from '../../components/Card';

const testProps = {
   event: {
      name: 'Test Event',
      category: 'Test Category',
      startTime: '2022-12-17 13:00:00',
      endTime: '2022-12-17 14:00:00'
   },
   onSelect: jest.fn(),
   actionText: 'Click',
   disabled: true
};

describe('Card', () => {
   test('renders card content', () => {
      render(<Card { ...testProps} />);
      const titleElement = screen.getByText(/Test Event/i);
      const descriptionElement = screen.getByText(/Test Category/i)
      const startTimeElement = screen.getByText(/2022-12-17 13:00:00/i)
      const endTimeElement = screen.getByText(/2022-12-17 14:00:00/i)
      expect(titleElement).toBeInTheDocument();
      expect(descriptionElement).toBeInTheDocument();
      expect(startTimeElement).toBeInTheDocument();
      expect(endTimeElement).toBeInTheDocument();
   });

   test('renders card with disabled button', () => {
      render(<Card { ...testProps} />);
      const buttonElementDisabled = screen.getByText(/Click/i);
      expect(buttonElementDisabled).toBeDisabled();
   });

   test('renders card with button', () => {
    render(<Card { ...testProps} disabled={false} />);
    const buttonElementNotDisabled = screen.getByText(/Click/i);
    expect(buttonElementNotDisabled).toBeInTheDocument();
    fireEvent.click(buttonElementNotDisabled)
    expect(testProps.onSelect).toHaveBeenCalledTimes(1);
 });
});
