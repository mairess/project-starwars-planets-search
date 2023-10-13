import { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function NumericFilter() {
  const {
    setPlanets,
    originalPlanets,
  } = useContext(PlanetsContext);

  const [selectedColumn, setSelectedColumn] = useState('population');
  const [selectedComparison, setSelectedComparison] = useState('maior que');
  const [filterValue, setFilterValue] = useState('0');

  const applyNumericFilter = () => {
    const filteredPlanets = originalPlanets.filter((planet) => {
      const value = parseFloat(planet[selectedColumn]);
      const filter = parseFloat(filterValue);

      if (selectedComparison === 'maior que') {
        return value > filter;
      } if (selectedComparison === 'menor que') {
        return value < filter;
      } if (selectedComparison === 'igual a') {
        return value === filter;
      }
      return false;
    });

    setPlanets(filteredPlanets);
  };

  return (
    <>
      <label htmlFor="columnFilter">Coluna</label>
      <select
        data-testid="column-filter"
        name=""
        id="columnFilter"
        value={ selectedColumn }
        onChange={ (e) => setSelectedColumn(e.target.value) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>

      <label htmlFor="comparisonFilter">Operador</label>
      <select
        data-testid="comparison-filter"
        name=""
        id="comparisonFilter"
        value={ selectedComparison }
        onChange={ (e) => setSelectedComparison(e.target.value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        data-testid="value-filter"
        type="number"
        value={ filterValue }
        onChange={ (e) => setFilterValue(e.target.value) }
      />

      <button
        data-testid="button-filter"
        onClick={ applyNumericFilter }
      >
        Filtrar
      </button>
    </>
  );
}

export default NumericFilter;
