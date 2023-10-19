import { useEffect, useState } from 'react';
import { Planet } from '../types';

const useFetch = (url: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState<Planet[]>([]);

  useEffect(() => {
    (async () => {
      try {
        setError(false);
        const response = await fetch(url);
        const planets = await response.json();
        setData(planets.results);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return {
    loading,
    error,
    data,
  };
};

export default useFetch;
