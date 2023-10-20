import { useState } from 'react';

const useSortOrder = () => {
  const [sortOrder, setSortOrder] = useState({ column: 'population', sort: 'ASC' });

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder({
      column: event.target.value,
      sort: sortOrder.sort,
    });
  };

  const handleSortOrderDirection = (direction: 'ASC' | 'DESC') => {
    setSortOrder({
      column: sortOrder.column,
      sort: direction,
    });
  };

  return {
    sortOrder,
    handleSortChange,
    handleSortOrderDirection,
  };
};

export default useSortOrder;
