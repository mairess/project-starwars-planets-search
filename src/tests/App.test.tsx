import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event'
import { Provider } from 'react';
import PlanetsProvider from '../context/PlanetsProvider';

test('Verify if inputs are loaded and work as expected.', async () => {
  render(
  <PlanetsProvider>
  <App />
  </PlanetsProvider>
  );
  const numericInput = screen.getByTestId('value-filter');
  const selectColumnInput = screen.getByTestId('column-filter');
  const selectComparisonInput = screen.getByTestId('comparison-filter');
  const selectOrderInput = screen.getByTestId('column-sort');
  const ascending = screen.getByTestId('column-sort-input-asc');
  const descending = screen.getByTestId('column-sort-input-desc');
  const oderBtn = screen.getByTestId('column-sort-button');
  const filterBtn = screen.getByTestId('button-filter');
  const textInput = screen.getByTestId('name-filter');

  await userEvent.selectOptions(selectColumnInput, 'surface_water')
  await userEvent.selectOptions(selectComparisonInput, 'igual a')
  await userEvent.type(numericInput, '1');
  await userEvent.click(filterBtn);
  
  await userEvent.selectOptions(selectOrderInput, 'population');
  await userEvent.click(ascending);
  await userEvent.click(oderBtn);

  await userEvent.click(descending);
  await userEvent.click(oderBtn);

  expect(numericInput).toBeInTheDocument();
  expect(selectColumnInput).toBeInTheDocument();
  expect(selectComparisonInput).toBeInTheDocument();
  expect(selectOrderInput).toBeInTheDocument();
  expect(filterBtn).toBeInTheDocument();
  expect(textInput).toBeInTheDocument();
  expect(ascending).toBeInTheDocument();
  expect(descending).toBeInTheDocument();
  expect(oderBtn).toBeInTheDocument();
});

test('Verify if inputs to remove filter are loaded and work as expected.', async () => {
  render(
  <PlanetsProvider>
  <App />
  </PlanetsProvider>
  );
  const removeFiltersBtn = screen.getByTestId('button-remove-filters');

  expect(removeFiltersBtn).toBeInTheDocument();
  await userEvent.click(removeFiltersBtn);

  const filterBtn = screen.getByTestId('button-filter');
  const selectComparisonInput = screen.getByTestId('comparison-filter');
  const selectOrderInput = screen.getByTestId('column-sort');


  await userEvent.selectOptions(selectComparisonInput, 'menor que');
  await userEvent.selectOptions(selectOrderInput, 'diameter');
  await userEvent.click(filterBtn);

  await userEvent.selectOptions(selectComparisonInput, 'menor que');
  await userEvent.click(filterBtn);

  await userEvent.selectOptions(selectComparisonInput, 'igual a');
  await userEvent.click(filterBtn);

  const removeNumericFilter = screen.getAllByRole('button', {name: 'Remover'});

  await userEvent.click(removeNumericFilter[0]);
  await userEvent.click(removeNumericFilter[1]);
  await userEvent.click(removeNumericFilter[2]);
});