import { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const useFilteredPlanetsByName = () => {
  const { planets, searchTerm } = useContext(PlanetsContext);

  const filteredPlanetsByName = planets && planets.filter((planet) => {
    const planetName = planet.name.toLowerCase();
    const filteredText = searchTerm.toLowerCase();
    return planetName.includes(filteredText);
  });

  return filteredPlanetsByName;
};

export default useFilteredPlanetsByName;
