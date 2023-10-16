import { createContext } from 'react';
import { Filter, Planet } from '../types';

type PlanetsContextType = {
  planets: Planet[],
  setPlanets: (planets: Planet[]) => void,
  searchTerm: string,
  setSearchTerm: (term: string) => void,
  originalPlanets: Planet[],
  handleFilter: (filteredPlanetsByName: Planet[]) => Planet[],
  numericFilters: Filter[],
  addNumericFilter: (filter: Filter) => void,
  removeNumericFilter: (filter: Filter) => void,
};

const PlanetsContext = createContext({} as PlanetsContextType);

export default PlanetsContext;
