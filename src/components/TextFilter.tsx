import { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function TextFilter() {
  const { setSearchTerm, searchTerm } = useContext(PlanetsContext);
  return (
    <>
      <label htmlFor="name">Serach here</label>
      <input
        data-testid="name-filter"
        id="name"
        type="text"
        value={ searchTerm }
        onChange={ (event) => {
          setSearchTerm(event.target.value);
        } }
      />
    </>
  );
}

export default TextFilter;
