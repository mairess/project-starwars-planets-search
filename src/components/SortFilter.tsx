import { useContext } from 'react';
import { columnsSelect } from '../helpers/tableColumns';
import PlanetsContext from '../context/PlanetsContext';
import useSortOrder from '../hooks/useSortOrder';

function SortFilter() {
  const { setOrder } = useContext(PlanetsContext);
  const { sortOrder, handleSortChange, handleSortOrderDirection } = useSortOrder();

  return (
    <div>
      <div>
        <label htmlFor="column-sort">Ordenar</label>
        <select
          name="column-sort"
          data-testid="column-sort"
          value={ sortOrder.column }
          onChange={ (event) => handleSortChange(event) }
        >
          {columnsSelect.map((column) => (
            <option key={ column } value={ column }>{column}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="sort-asc">Ascendente</label>
        <input
          data-testid="column-sort-input-asc"
          type="radio"
          name="sort"
          value="ASC"
          id="sort-asc"
          onChange={ () => handleSortOrderDirection('ASC') }
        />
      </div>
      <div>
        <label htmlFor="sort-desc">Descendente</label>
        <input
          data-testid="column-sort-input-desc"
          type="radio"
          name="sort"
          value="DESC"
          id="sort-desc"
          onChange={ () => handleSortOrderDirection('DESC') }
        />
      </div>

      <button
        onClick={ () => setOrder(sortOrder) }
        data-testid="column-sort-button"
      >
        Ordenar
      </button>
    </div>
  );
}

export default SortFilter;
