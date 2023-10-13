import React, { useEffect, useState } from 'react';
import { Planet } from '../types';
import PlanetsContext from './PlanetsContext';
import getPlanets from '../helpers/getPlanets';

type PlanetsProviderProps = {
  children: React.ReactNode,
};

function PlanetsProvider({ children } :PlanetsProviderProps) {
  const [originalPlanets, setOriginalPlanets] = useState<Planet[]>([]);
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleFilter = (term: string) => {
    const filteredPlanets = originalPlanets.filter((planet) => {
      const planetName = planet.name.toLowerCase();
      const filteredText = term.toLowerCase();
      return planetName.includes(filteredText);
    });
    setPlanets(filteredPlanets);
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
      } }
    >
      {children}
    </PlanetsContext.Provider>
  );
}

export default PlanetsProvider;
