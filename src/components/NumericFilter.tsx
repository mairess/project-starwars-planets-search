import { columnsSelect } from '../helpers/tableColumns';
import useNumericsFilter from '../hooks/useNumericsFilter';

function NumericFilter() {
  const {
    setSelectedColumn,
    setSelectedComparison,
    filterValue,
    setFilterValue,
    applyNumericFilter,
    numericFilters,
    removeNumericFilter,
    removeAllNumericFilters,
  } = useNumericsFilter();

  return (
    <>
      <label htmlFor="columnFilter">Coluna</label>
      <select
        data-testid="column-filter"
        name=""
        id="columnFilter"
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
        <div
          data-testid="filter"
          key={ index }
        >
          {filter.column}
          {' '}
          {filter.comparison}
          {' '}
          {filter.value}
          <button onClick={ () => removeNumericFilter(filter) }>Remover</button>
        </div>
      ))}
      <button
        onClick={ removeAllNumericFilters }
        data-testid="button-remove-filters"
      >
        Remover Filtros
      </button>
    </>
  );
}

export default NumericFilter;
