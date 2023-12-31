import React, { useContext } from 'react';
import styled from 'styled-components';
import PlanetsContext from '../context/PlanetsContext';
import { columns } from '../helpers/tableColumns';
import TextFilter from './TextFilter';
import NumericFilter from './NumericFilter';
import SortFilter from './SortFilter';
import useFilteredPlanetsByName from '../hooks/useFilteredPlanetsByName';

const TableStyled = styled.div`
table {
  border-collapse: collapse;
}

th, td {
  border: 1px solid #000;
  padding: 10px;
}
`;

function Table() {
  const { handleFilter, orderPlanets, loading, error,
    numericFilters } = useContext(PlanetsContext);

  const filteredPlanetsByName = useFilteredPlanetsByName();

  const filteredPlanetsByNumbers = handleFilter(filteredPlanetsByName, numericFilters);

  const orderedPlanets = orderPlanets(filteredPlanetsByNumbers);

  return (
    <>
      <NumericFilter />
      <TextFilter />
      <SortFilter />
      <TableStyled>
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={ column }>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td>Carregando...</td></tr> }
            {error && <tr><td>{`Request error: ${error}`}</td></tr> }
            {orderedPlanets.map((planet) => (
              <tr key={ planet.name }>
                <td data-testid="planet-name">{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableStyled>
    </>
  );
}

export default Table;
