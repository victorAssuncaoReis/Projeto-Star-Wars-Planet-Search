import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import mock from '../../cypress/mocks/testData';

describe('Testa o componente Table', () => {
  beforeEach(() => global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(mock)
  }))

  it('Testa se todos os inputs e selects de filtros são renderizados', async () => {
    render(<App />)
    const inputName = screen.getByTestId('name-filter')
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');

    expect(inputName).toBeInTheDocument();
    expect(columnFilter).toBeInTheDocument();
    expect(comparisonFilter).toBeInTheDocument();
    expect(columnFilter).toBeInTheDocument();
    expect(valueFilter).toBeInTheDocument();
    expect(buttonFilter).toBeInTheDocument();
  });

  it('Testa se ao digitar texto no input, é filtrada a lista de planetas', async () => {
    render(<App />);
    const inputName = screen.getByTestId('name-filter')
    userEvent.type(inputName, 'Ta')
    const tatooine = await screen.findByText('Tatooine')

    expect(tatooine).toBeInTheDocument();
  });

  it('Testa se é aplicado o filtro "maior que" 3000 de população', async () => {
    render(<App />);
    await screen.findByText('Tatooine');

    const selectColumn = screen.getByTestId('column-filter');
    const selectComparasion = screen.getByTestId('comparison-filter');
    const inputNumber = screen.getByTestId('value-filter');
    const getBtnFilter = screen.getByTestId('button-filter');

    userEvent.selectOptions(selectColumn, 'diameter');
    userEvent.selectOptions(selectComparasion, 'maior que');
    userEvent.type(inputNumber, '15000');
    userEvent.click(getBtnFilter);

    const bespin = await screen.findByText('Bespin');
    const kamino = await screen.findByText('Kamino');
    const rows = screen.getAllByRole('row');

    expect(bespin).toBeInTheDocument();
    expect(kamino).toBeInTheDocument();
    expect(rows).toHaveLength(3);
  });

  it('Testa se é aplicado o filtro "menor que" 3000 de população', async () => {
    render(<App />);
    await screen.findByText('Tatooine');

    const selectColumn = screen.getByTestId('column-filter');
    const selectComparasion = screen.getByTestId('comparison-filter');
    const inputNumber = screen.getByTestId('value-filter');
    const getBtnFilter = screen.getByTestId('button-filter');

    userEvent.selectOptions(selectColumn, 'population');
    userEvent.selectOptions(selectComparasion, 'menor que');
    userEvent.type(inputNumber, '3000');
    userEvent.click(getBtnFilter);

    const yavin = await screen.findByText('Yavin IV');
    const rows = screen.getAllByRole('row');

    expect(rows).toHaveLength(2)
    expect(yavin).toBeInTheDocument();
  });

})
