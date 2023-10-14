import { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import { Filter } from '../types';

function NumericFilter() {
  const {
    setPlanets,
    originalPlanets,
  } = useContext(PlanetsContext);

  const [selectedColumn, setSelectedColumn] = useState('population');
  const [selectedComparison, setSelectedComparison] = useState('maior que');
  const [filterValue, setFilterValue] = useState('0');
  const [filters, setFilters] = useState<Filter[]>([]);

  const applyNumericFilter = (filterList: Filter[]) => {
    let filteredPlanets = originalPlanets;

    filterList.forEach(({ column, comparison, value }) => {
      filteredPlanets = filteredPlanets.filter((planet) => {
        const planetValue = parseFloat(planet[column]);
        const valuefilter = parseFloat(value);

        if (comparison === 'maior que') {
          return planetValue > valuefilter;
        } if (comparison === 'menor que') {
          return planetValue < valuefilter;
        } if (comparison === 'igual a') {
          return planetValue === valuefilter;
        }
        return true;
      });
    });

    setPlanets(filteredPlanets);
  };

  const addFilter = () => {
    const newFilter = {
      column: selectedColumn,
      comparison: selectedComparison,
      value: filterValue,
    };
    setFilters([...filters, newFilter]);
    applyNumericFilter([...filters, newFilter]);
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
        onClick={ addFilter }
      >
        Filtrar
      </button>
    </>
  );
}

export default NumericFilter;
