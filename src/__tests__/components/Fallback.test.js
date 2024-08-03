import { render, screen } from '@testing-library/react';
import React from 'react';
import Fallback from '../../components/Fallback';

describe('Fallback Component', () => {
    it('renders without crashing', () => {
        render(<Fallback title='Hello' description='Test Fallback' />);
    });

    it('displays a fallback message', () => {
        render(<Fallback title='Hello' description='Test Fallback' />);
        const fallbackTitle = screen.getByText('Hello');
        const fallbackDescription = screen.getByText('Test Fallback');
        expect(fallbackTitle).toBeInTheDocument();
        expect(fallbackDescription).toBeInTheDocument();
    });
});