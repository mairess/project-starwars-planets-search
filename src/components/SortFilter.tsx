import { columnsSelect } from '../helpers/tableColumns';

function SortFilter() {
  return (
    <div>
      <div>
        <label htmlFor="column-sort">Ordenar</label>
        <select name="column-sort" data-testid="column-sort">
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
        />
      </div>

      <button data-testid="column-sort-button">
        Ordenar
      </button>
    </div>
  );
}

export default SortFilter;
