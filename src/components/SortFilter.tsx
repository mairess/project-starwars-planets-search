import { useState } from 'react';
import { columnsSelect } from '../helpers/tableColumns';

function SortFilter() {
  const [sortOrder, setSortOrder] = useState({
    order: {
      column: 'population',
      sort: 'ASC',
    },
  });

  return (
    <div>
      <div>
        <label htmlFor="column-sort">Ordenar</label>
        <select
          name="column-sort"
          data-testid="column-sort"
          onChange={ (event) => {
            setSortOrder({
              order: {
                column: event.target.value,
                sort: sortOrder.order.sort,
              },
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
              order: {
                column: sortOrder.order.column,
                sort: 'ASC',
              },
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
              order: {
                column: sortOrder.order.column,
                sort: 'DESC',
              },
            });
          } }
        />
      </div>

      <button data-testid="column-sort-button">
        Ordenar
      </button>
    </div>
  );
}

export default SortFilter;
