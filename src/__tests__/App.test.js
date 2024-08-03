import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

test('renders without crashing', () => {
   render(
      <MemoryRouter initialEntries={['/']}>
         <App />
      </MemoryRouter>
   );
   const element = screen.getByTestId('app-container');
   expect(element).toBeInTheDocument();
});

test('navigates to Booking component when the URL matches "/booking"', () => {
   render(
      <MemoryRouter initialEntries={['/booking']}>
         <App />
      </MemoryRouter>
   );
   const bookingElement = screen.getByTestId('booking-container');
   expect(bookingElement).toBeInTheDocument();
});

test('navigates to Home component when the URL matches "/"', () => {
   render(
      <MemoryRouter initialEntries={['/']}>
         <App />
      </MemoryRouter>
   );
   const homeElement = screen.getByTestId('home-container');
   expect(homeElement).toBeInTheDocument();
});

test('redirects to Home component when the URL matches "/xyz"', () => {
   render(
      <MemoryRouter initialEntries={['/']}>
         <App />
      </MemoryRouter>
   );
   const homeElement = screen.getByTestId('home-container');
   expect(homeElement).toBeInTheDocument();
});
