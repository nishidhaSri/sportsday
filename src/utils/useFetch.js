import { useEffect, useState } from 'react';

const DEFAULT_ERROR_MESSAGE = "We’re currently experiencing technical difficulties and are unable to process your request at the moment. Please try again later."

const useFetch = (url) => {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState('');

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetch(url);
            const json = await response.json();
            if (!response.ok) {
                throw json;
            }
            setData(json.data);
         } catch (errorObj) {
            setError(errorObj?.error || DEFAULT_ERROR_MESSAGE);
         } finally {
            setLoading(false);
         }
      };

      fetchData();
   }, [url]);

   return { data, loading, error };
};

export default useFetch;
