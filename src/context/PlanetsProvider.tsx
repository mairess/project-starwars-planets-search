import React, { useEffect, useState } from 'react';
import { Planet, Planets } from '../types';
import PlanetsContext from './PlanetsContext';
import useFetch from '../hooks/useFetch';
import useAddAndRemoveNumericFilter from '../hooks/useAddAndRemoveNumericFilter';
import useHandleFilter from '../hooks/useHandleFilter';

type PlanetsProviderProps = {
  children: React.ReactNode,
};

function PlanetsProvider({ children } :PlanetsProviderProps) {
  const { data, loading, error } = useFetch('https://swapi.dev/api/planets');
  const {
    numericFilters,
    removeNumericFilter,
    addNumericFilter,
    setNumericFilters,
  } = useAddAndRemoveNumericFilter();

  const handleFilter = useHandleFilter();

  const [planets, setPlanets] = useState<Planet[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState({ column: '', sort: '' });

  useEffect(() => {
    setPlanets(data);
  }, [data]);

  const removeAllNumericFilters = () => {
    setNumericFilters([]);
  };

  const orderPlanets = (planetsSorted: Planets) => {
    if (!order.column) return planetsSorted;
    return planets.sort((a, b) => {
      if (a[order.column] === 'unknown' && b[order.column] === 'unknown') {
        return 0;
      } if (b[order.column] === 'unknown') {
        return -1;
      } if (a[order.column] === 'unknown') {
        return 1;
      }
      return order.sort === 'ASC'
        ? Number(a[order.column]) - Number(b[order.column])
        : Number(b[order.column]) - Number(a[order.column]);
    });
  };

  return (
    <PlanetsContext.Provider
      value={ {
        planets,
        setPlanets,
        searchTerm,
        setSearchTerm,
        handleFilter,
        numericFilters,
        addNumericFilter,
        removeNumericFilter,
        removeAllNumericFilters,
        orderPlanets,
        setOrder,
        loading,
        error,
      } }
    >
      {children}
    </PlanetsContext.Provider>
  );
}

export default PlanetsProvider;
