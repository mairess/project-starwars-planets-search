import { Planets } from '../types';

export const orderByOrbitalPeriod = (planets: Planets) => {
  return planets
    .slice().sort((a, b) => parseFloat(b.orbital_period) - parseFloat(a.orbital_period));
};

export const orderByDiameter = (planets: Planets) => {
  return planets.slice().sort((a, b) => parseFloat(a.diameter) - parseFloat(b.diameter));
};

export const orderByPopulation = (planets: Planets) => {
  return planets.slice().sort((a, b) => {
    if (a.population === 'unknown' && b.population === 'unknown') {
      return 0;
    } if (a.population === 'unknown') {
      return 1;
    } if (b.population === 'unknown') {
      return -1;
    }
    return parseInt(a.population, 10) - parseInt(b.population, 10);
  });
};
