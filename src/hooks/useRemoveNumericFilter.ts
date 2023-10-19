import { useState } from 'react';
import { Filter } from '../types';

const useRemoveNumericFilter = () => {
  const [numericFilters, setNumericFilters] = useState<Filter[]>([]);

  const removeNumericFilter = (filter: Filter) => {
    setNumericFilters((prevFilters) => prevFilters.filter((existingFilter) => {
      return (
        existingFilter.column !== filter.column
        || existingFilter.comparison !== filter.comparison
        || existingFilter.value !== filter.value
      );
    }));
  };
  return { numericFilters, setNumericFilters, removeNumericFilter };
};

export default useRemoveNumericFilter;
