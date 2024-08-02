import { useEffect, useState } from 'react';

const useFetch = (url) => {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState('');
   const defaultErrorMsg = "We’re currently experiencing technical difficulties and are unable to process your request at the moment. Please try again later."

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetch(url);
            const json = await response.json();
            if (!response.ok) {
                throw json;
            }
            setData(json.data);
            setLoading(false);
         } catch (errorObj) {
            setError(errorObj?.error || defaultErrorMsg);
            setLoading(false);
         }
      };

      fetchData();
   }, [url]);

   return { data, loading, error };
};

export default useFetch;
