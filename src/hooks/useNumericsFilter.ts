import { useContext, useEffect, useState } from 'react';
import { columnsSelect } from '../helpers/tableColumns';
import PlanetsContext from '../context/PlanetsContext';

const useNumericsFilter = () => {
  const {
    numericFilters,
    addNumericFilter,
    removeNumericFilter,
    removeAllNumericFilters,
  } = useContext(PlanetsContext);

  const [selectedColumn, setSelectedColumn] = useState('population');
  const [selectedComparison, setSelectedComparison] = useState('maior que');
  const [filterValue, setFilterValue] = useState('0');

  const applyNumericFilter = () => {
    const newFilter = {
      column: selectedColumn,
      comparison: selectedComparison,
      value: filterValue,
    };
    addNumericFilter(newFilter);
  };

  useEffect(() => {
    const columnFilters = columnsSelect
      .filter((column) => !numericFilters.some((filter) => filter.column === column));
    setSelectedColumn(columnFilters[0]);
    setSelectedComparison('maior que');
    setFilterValue('0');
  }, [numericFilters]);

  return {
    selectedColumn,
    setSelectedColumn,
    selectedComparison,
    setSelectedComparison,
    filterValue,
    setFilterValue,
    applyNumericFilter,
    numericFilters,
    removeNumericFilter,
    removeAllNumericFilters,
  };
};

export default useNumericsFilter;
