import { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import { Filter } from '../types';
import { columnsSelect } from '../helpers/tableColumns';

function NumericFilter() {
  const {
    // setPlanets,
    // originalPlanets,

    numericFilters,
    addNumericFilter,
    removeNumericFilter,
  } = useContext(PlanetsContext);

  const [selectedColumn, setSelectedColumn] = useState('population');
  const [selectedComparison, setSelectedComparison] = useState('maior que');
  const [filterValue, setFilterValue] = useState('0');
  // const [filters, setFilters] = useState<Filter[]>([]);

  const applyNumericFilter = () => {
    const newFilter = {
      column: selectedColumn,
      comparison: selectedComparison,
      value: filterValue,
    };
    addNumericFilter(newFilter);
  };

  const removeFilter = (filter: Filter) => {
    removeNumericFilter(filter);
  };

  useEffect(() => {
    const columnFilters = columnsSelect
      .filter((column) => !numericFilters.some((filter) => filter.column === column));
    setSelectedColumn(columnFilters[0]);
    setSelectedComparison('maior que');
    setFilterValue('0');
  }, [numericFilters]);

  return (
    <>
      <label htmlFor="columnFilter">Coluna</label>
      <select
        data-testid="column-filter"
        name=""
        id="columnFilter"
        // value={ selectedColumn }
        onChange={ (e) => setSelectedColumn(e.target.value) }
      >
        {columnsSelect
          .filter((column) => !numericFilters.some((filter) => filter.column === column))
          .map((column) => (
            <option key={ column } value={ column }>
              {column}
            </option>
          ))}
      </select>

      <label htmlFor="comparisonFilter">Operador</label>
      <select
        data-testid="comparison-filter"
        name=""
        id="comparisonFilter"
        // value={ selectedComparison }
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
      {numericFilters.map((filter, index) => (
        <div key={ index }>
          {filter.column}
          {' '}
          {filter.comparison}
          {' '}
          {filter.value}
          <button onClick={ () => removeFilter(filter) }>Remover</button>
        </div>
      ))}
    </>
  );
}

export default NumericFilter;
