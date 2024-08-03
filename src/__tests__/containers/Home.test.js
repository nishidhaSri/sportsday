import { render, screen } from '@testing-library/react';
import React from 'react';
import Home from '../../containers/Home';

describe('Home', () => {

    test('displays the welcome message', () => {
        render(<Home />);
        const welcomeMessage = screen.getByText('Welcome to the Home Page!');
        expect(welcomeMessage).toBeInTheDocument();
    });

});