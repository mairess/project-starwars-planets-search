import React, { useContext } from 'react';
import styled from 'styled-components';
import PlanetsContext from '../context/PlanetsContext';
import { columns } from '../helpers/tableColumns';
import TextFilter from './TextFilter';
import NumericFilter from './NumericFilter';
import SortFilter from './SortFilter';

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
  const {
    originalPlanets,
    searchTerm,
    handleFilter,
    orderPlanets,
    loading,
    error,
  } = useContext(PlanetsContext);

  const filteredPlanetsByName = originalPlanets && originalPlanets.filter((planet) => {
    const planetName = planet.name.toLowerCase();
    const filteredText = searchTerm.toLowerCase();
    return planetName.includes(filteredText);
  });

  const filteredPlanetsByNumbers = handleFilter(filteredPlanetsByName);

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
