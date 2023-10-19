import { useState } from 'react';
import { Filter } from '../types';

const useAddAndRemoveNumericFilter = () => {
  const [numericFilters, setNumericFilters] = useState<Filter[]>([]);

  const addNumericFilter = (filter: Filter) => {
    setNumericFilters([...numericFilters, filter]);
  };

  const removeNumericFilter = (filter: Filter) => {
    setNumericFilters((prevFilters) => prevFilters.filter((existingFilter) => {
      return (
        existingFilter.column !== filter.column
        || existingFilter.comparison !== filter.comparison
        || existingFilter.value !== filter.value
      );
    }));
  };
  return { numericFilters, setNumericFilters, removeNumericFilter, addNumericFilter };
};

export default useAddAndRemoveNumericFilter;
