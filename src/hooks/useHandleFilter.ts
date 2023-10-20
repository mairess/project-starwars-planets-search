import { useCallback } from 'react';
import { Filter, Planet } from '../types';

const useHandleFilter = () => {
  const handleFilter = useCallback((
    filteredPlanetsByName: Planet[],
    filters: Filter[],
  ) => {
    if (filters?.length) {
      const filteredPlanetsWithNumeric = filteredPlanetsByName.filter((planet) => {
        return filters.every(({ comparison, column, value }) => {
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
  }, []);
  return handleFilter;
};

export default useHandleFilter;
