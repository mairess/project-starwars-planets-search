import React, { useEffect, useState } from 'react';
import { Planet, Planets } from '../types';
import PlanetsContext from './PlanetsContext';
import useFetch from '../hooks/useFetch';
import useAddAndRemoveNumericFilter from '../hooks/useAddAndRemoveNumericFilter';

type PlanetsProviderProps = {
  children: React.ReactNode,
};

function PlanetsProvider({ children } :PlanetsProviderProps) {
  const { data, loading, error } = useFetch('https://swapi.dev/api/planets');
  const {
    numericFilters,
    setNumericFilters,
    removeNumericFilter,
    addNumericFilter,
  } = useAddAndRemoveNumericFilter();

  const [originalPlanets, setOriginalPlanets] = useState<Planet[]>([]);
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState({ column: '', sort: '' });

  useEffect(() => {
    setPlanets(data);
    setOriginalPlanets(data);
  }, [data]);

  const handleFilter = (filteredPlanetsByName: Planet[]) => {
    if (numericFilters.length) {
      const filteredPlanetsWithNumeric = filteredPlanetsByName.filter((planet) => {
        return numericFilters.every(({ comparison, column, value }) => {
          const planetValue = parseFloat(planet[column]);
          const valueFilter = parseFloat(value);

          if (comparison === 'maior que') {
            return planetValue > valueFilter;
          } if (comparison === 'menor que') {
            return planetValue < valueFilter;
          } if (comparison === 'igual a') {
            return planetValue === valueFilter;
          }

          return true;
        });
      });
      return filteredPlanetsWithNumeric;
    }
    return filteredPlanetsByName;
  };

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
        originalPlanets,
        handleFilter,
        numericFilters,
        addNumericFilter,
        removeNumericFilter,
        removeAllNumericFilters,
        setOriginalPlanets,
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
