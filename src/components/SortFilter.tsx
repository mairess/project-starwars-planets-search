import { useContext, useState } from 'react';
import { columnsSelect } from '../helpers/tableColumns';
import PlanetsContext from '../context/PlanetsContext';

function SortFilter() {
  const { setOrder } = useContext(PlanetsContext);
  const [sortOrder, setSortOrder] = useState({ column: 'population', sort: 'ASC' });

  return (
    <div>
      <div>
        <label htmlFor="column-sort">Ordenar</label>
        <select
          name="column-sort"
          data-testid="column-sort"
          value={ sortOrder.column }
          onChange={ (event) => {
            setSortOrder({
              column: event.target.value,
              sort: sortOrder.sort,
            });
          } }
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
          onChange={ () => {
            setSortOrder({
              column: sortOrder.column,
              sort: 'ASC',
            });
          } }
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
          onChange={ () => {
            setSortOrder({
              column: sortOrder.column,
              sort: 'DESC',
            });
          } }
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
