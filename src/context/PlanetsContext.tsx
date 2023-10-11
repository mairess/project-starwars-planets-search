import { createContext } from 'react';
import { Planet } from '../types';

type PlanetsContextType = {
  planets: Planet[];
};

const PlanetsConstext = createContext({} as PlanetsContextType);

export default PlanetsConstext;
