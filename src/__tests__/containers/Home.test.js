import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../../containers/Home';

describe('Home', () => {

    test('displays the welcome message', () => {
        render(<MemoryRouter initialEntries={['/']}><Home /></MemoryRouter>);
        const title1 = screen.getByText('Sports');
        const title2 = screen.getByText('Competition');
        expect(title1).toBeInTheDocument();
        expect(title2).toBeInTheDocument();
    });

});