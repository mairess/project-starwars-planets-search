import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event'

test('Verify if inputs are loaded and works as expected.', async () => {
  render(<App />);
  const numericInput = screen.getByTestId('value-filter');
  const selectColumnInput = screen.getByTestId('column-filter');
  const selectComparisonInput = screen.getByTestId('comparison-filter');
  const filterBtn = screen.getByTestId('button-filter');
  const textInput = screen.getByTestId('name-filter');

  await userEvent.selectOptions(selectColumnInput, 'surface_water')
  await userEvent.selectOptions(selectComparisonInput, 'igual a')
  await userEvent.type(numericInput, '1');
  await userEvent.click(filterBtn);

  expect(numericInput).toBeInTheDocument();
  expect(selectColumnInput).toBeInTheDocument();
  expect(selectComparisonInput).toBeInTheDocument();
  expect(filterBtn).toBeInTheDocument();
  expect(textInput).toBeInTheDocument();
});