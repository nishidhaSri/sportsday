import { renderHook, waitFor } from '@testing-library/react';
import useFetch from '../../utils/useFetch';

describe('useFetch', () => {
   beforeEach(() => {
      global.fetch = jest.fn();
   });

   afterEach(() => {
      jest.restoreAllMocks();
   });

   it('should fetch data successfully', async () => {
      const url = 'https://api.example.com/data';
      const mockData = { data: { id: 1, name: 'John Doe' } };

      global.fetch.mockResolvedValueOnce({
         ok: true,
         json: async () => mockData
      });

      const { result } = renderHook(() => useFetch(url));

      // Check initial state
      expect(result.current.loading).toBe(true);
      expect(result.current.data).toBe(null);
      expect(result.current.error).toBe('');

      await waitFor(() => {
         expect(result.current.loading).toBe(false);
      });

      // Assertions after the state has updated
      expect(result.current.data).toEqual(mockData.data);
      expect(result.current.error).toBe('');
   });

   it('should handle fetch error', async () => {
      const url = 'https://api.example.com/data';
      const mockError = new Error();
      global.fetch = jest.fn().mockRejectedValue(mockError);
      const defaultErrorMsg = "We’re currently experiencing technical difficulties and are unable to process your request at the moment. Please try again later."

      const { result } = renderHook(() => useFetch(url));

      expect(result.current.loading).toBe(true);

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
     });

      expect(result.current.data).toBe(null);
      expect(result.current.error).toEqual(defaultErrorMsg);
   });
});
