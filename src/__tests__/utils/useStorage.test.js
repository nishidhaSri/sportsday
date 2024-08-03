import { renderHook } from '@testing-library/react';
import { act } from 'react';
import useStorage from '../../utils/useStorage';

describe('useStorage', () => {
    beforeEach(() => {
        localStorage.removeItem('myKey');
    });

    test('should return initial value when no value is stored in localStorage', () => {
        const { result } = renderHook(() => useStorage('myKey', 'initialValue'));
        expect(result.current[0]).toBe('initialValue');
    });

    test('should return stored value from localStorage', () => {
        localStorage.setItem('myKey', JSON.stringify('storedValue'));
        const { result } = renderHook(() => useStorage('myKey', 'initialValue'));
        expect(result.current[0]).toBe('storedValue');
    });

    test('should update stored value in localStorage', () => {
        const { result } = renderHook(() => useStorage('myKey', 'initialValue'));
        act(() => {
            result.current[1]('updatedValue');
        });
        expect(result.current[0]).toBe('updatedValue');
        expect(JSON.parse(localStorage.getItem('myKey'))).toBe('updatedValue');
    });
});