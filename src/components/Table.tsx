import React, { useContext } from 'react';
import styled from 'styled-components';
import PlanetsContext from '../context/PlanetsContext';
import { columns } from '../helpers/tableColumns';
import TextFilter from './TextFilter';
import NumericFilter from './NumericFilter';

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
    planets,
    setSearchTerm,
    searchTerm,
    handleFilter,
  } = useContext(PlanetsContext);

  return (
    <>
      <NumericFilter />
      <TextFilter
        value={ searchTerm }
        onChange={ (event) => {
          setSearchTerm(event.target.value);
          handleFilter(event.target.value);
        } }
      />
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
            {planets && planets.map((planet) => (
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
    </>
  );
}

export default Table;
