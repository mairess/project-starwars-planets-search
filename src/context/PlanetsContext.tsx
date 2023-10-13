import { createContext } from 'react';
import { Planet } from '../types';

type PlanetsContextType = {
  planets: Planet[],
  setPlanets: (planets: Planet[]) => void,
  searchTerm: string,
  setSearchTerm: (term: string) => void,
  originalPlanets: Planet[],
  handleFilter: (term: string) => void,
};

const PlanetsContext = createContext({} as PlanetsContextType);

export default PlanetsContext;
