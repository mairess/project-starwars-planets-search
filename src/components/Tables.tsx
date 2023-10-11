import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import PlanetsConstext from '../context/PlanetsContext';
import { columns } from '../helpers/tableColumns';

const TableStyled = styled.table`
table {
  border-collapse: collapse;
}

th, td {
  border: 1px solid #000;
  padding: 10px;
}
`;

function Table() {
  const { planets } = useContext(PlanetsConstext);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlanets = planets.filter((planet) => {
    const planetName = planet.name.toLowerCase();
    const filteredText = searchTerm.toLowerCase();
    return planetName.includes(filteredText);
  });

  return (
    <TableStyled>
      <label htmlFor="searchInput">
        Serach here
      </label>
      <input
        id="searchInput"
        type="text"
        data-testid="name-filter"
        value={ searchTerm }
        onChange={ (event) => setSearchTerm(event.target.value) }
      />
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={ column }>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredPlanets.map((planet) => (
            <tr key={ planet.name }>
              <td>{planet.name}</td>
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
  );
}

export default Table;
