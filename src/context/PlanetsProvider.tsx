import React, { useEffect, useState } from 'react';
import { Filter, Planet, Planets } from '../types';
import PlanetsContext from './PlanetsContext';
import getPlanets from '../helpers/getPlanets';

type PlanetsProviderProps = {
  children: React.ReactNode,
};

function PlanetsProvider({ children } :PlanetsProviderProps) {
  const [originalPlanets, setOriginalPlanets] = useState<Planet[]>([]);
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [numericFilters, setNumericFilters] = useState<Filter[]>([]);
  const [order, setOrder] = useState({ column: '', sort: '' });

  const addNumericFilter = (filter: Filter) => {
    setNumericFilters([...numericFilters, filter]);
  };

  const removeNumericFilter = (filter: Filter) => {
    const updatedFilters = numericFilters.filter((existingFilter) => {
      return (
        existingFilter.column !== filter.column
        || existingFilter.comparison !== filter.comparison
        || existingFilter.value !== filter.value
      );
    });
    setNumericFilters(updatedFilters);
  };

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const planetsData = await getPlanets();
        setPlanets(planetsData);
        setOriginalPlanets(planetsData);
      } catch (error) {
        console.error('Failed to fetch planets:', error);
      }
    };
    fetchPlanets();
  }, []);

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
      } }
    >
      {children}
    </PlanetsContext.Provider>
  );
}

export default PlanetsProvider;
