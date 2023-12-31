import { createContext } from 'react';
import { Filter, Planet, Planets } from '../types';

type PlanetsContextType = {
  planets: Planet[],
  setPlanets: (planets: Planet[]) => void,
  searchTerm: string,
  setSearchTerm: (term: string) => void,
  handleFilter: (filteredPlanetsByName: Planet[], filters: Filter[]) => Planet[],
  numericFilters: Filter[],
  addNumericFilter: (filter: Filter) => void,
  removeNumericFilter: (filter: Filter) => void,
  removeAllNumericFilters: () => void,
  orderPlanets: (planetsSorted: Planets) => Planet[]
  setOrder: (sortOrder: { column: string, sort: string }) => void,
  loading: boolean,
  error: any,
};

const PlanetsContext = createContext({} as PlanetsContextType);

export default PlanetsContext;
