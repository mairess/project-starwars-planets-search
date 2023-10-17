import { useContext, useState } from 'react';
import { columnsSelect } from '../helpers/tableColumns';
import {
  orderByOrbitalPeriod,
  orderByDiameter,
  orderByPopulation,
} from '../helpers/planetsUtils';
import PlanetsContext from '../context/PlanetsContext';

function SortFilter() {
  const { originalPlanets, setOriginalPlanets } = useContext(PlanetsContext);
  const [sortOrder, setSortOrder] = useState({
    order: {
      column: 'population',
      sort: 'ASC',
    },
  });

  const handleSort = (column: string, sort: string) => {
    let sortedPlanets = [...originalPlanets];

    if (column === 'orbital_period') {
      sortedPlanets = orderByOrbitalPeriod(sortedPlanets);
    } else if (column === 'diameter') {
      sortedPlanets = orderByDiameter(sortedPlanets);
    } else if (column === 'population') {
      sortedPlanets = orderByPopulation(sortedPlanets);
    }

    if (sort === 'DESC') {
      sortedPlanets.reverse();
    }

    setOriginalPlanets(sortedPlanets);
  };

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

      <button
        onClick={ () => handleSort(sortOrder.order.column, sortOrder.order.sort) }
        data-testid="column-sort-button"
      >
        Ordenar
      </button>
    </div>
  );
}

export default SortFilter;
