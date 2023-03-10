import React, { useEffect, useState } from 'react';

function Table() {
  const typeOfFilters = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];
  const info = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter',
    'Climate', 'Gravity', 'Terrain', 'Surface Water', 'Population', 'Films',
    'Created', 'Edited', 'URL'];
  const [planets, setPlanets] = useState([]);
  const [filterPlanets, setFilterPlanets] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [filter, setFilter] = useState({ column: 'population',
    compareFilter: 'maior que',
    number: 0,
  });
  const [allFilterTypes, setAllFilterTypes] = useState(typeOfFilters);
  const [numeric, setNumeric] = useState([]);
  const [control, setControl] = useState(0);
  const [columnFilter, setColumnFilter] = useState('population');
  const [typeSort, setTypeSort] = useState('');
  const [crescenteFilter, setCrescenteFilter] = useState(false);
  const [decrescenteFilter, setDecrescenteFilter] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const apiFetch = async () => {
    const url = 'https://swapi.dev/api/planets';
    const response = await fetch(url);
    const result = await response.json();
    result.results.forEach((e) => delete e.residents);
    return result.results;
  };
  const apiOnMount = async () => {
    setPlanets(await apiFetch());
    setFilterPlanets(await apiFetch());
  };
  useEffect(() => {
    apiOnMount();
    setCarregando(false);
  }, []);
  useEffect(() => {
    if (filterName.length === 0) {
      setFilterPlanets(planets);
    }
  }, [filterName.length, planets]);
  const handleFilter = ({ target: { value } }) => {
    setFilterName(value);
    if (value.length > 0) {
      setFilterPlanets(planets.filter((e) => e.name.includes(value)));
    }
  };

  const onClickFilter = ({ target: { name, value } }) => (setFilter({ ...filter,
    [name]: value }));
  const sortOnClick = ({ target: { value } }) => {
    setColumnFilter(value);
  };
  const onClickTypeSort = ({ target: { value } }) => {
    setTypeSort(value);
    switch (value) {
    case 'crescente':
      setCrescenteFilter(true);
      setDecrescenteFilter(false);
      break;
    default:
      setDecrescenteFilter(true);
      setCrescenteFilter(false);
      break;
    }
  };
  const buttonFilterNumber = () => {
    const valuesOfFiltersArray = numeric;
    valuesOfFiltersArray.push(filter);
    setNumeric(valuesOfFiltersArray);
    const AllTypesFilter = allFilterTypes.filter((ele) => ele !== filter.column);
    setAllFilterTypes(AllTypesFilter);
    setFilter({ ...filter, column: AllTypesFilter[0] });
    setControl(control + 1);
  };
  const deleteButtonFilter = (filterType) => {
    setFilterPlanets(planets);
    const filtro = numeric.filter((e) => e.column !== filterType);
    const arrayOfFilters = allFilterTypes;
    arrayOfFilters.push(filterType);
    setAllFilterTypes(arrayOfFilters);
    setNumeric(filtro);
    setControl(control + 1);
  };
  const deleteAllFilters = () => {
    setFilterPlanets(planets);
    setAllFilterTypes(typeOfFilters);
    setNumeric([]);
  };
  const sortFilter = (filtro) => {
    const minusOne = -1;
    if (typeSort === 'decrescente') {
      return filtro.sort((a, b) => {
        if (b[columnFilter] === 'unknown') return minusOne;
        return (b[columnFilter] - a[columnFilter]);
      });
    }
    if (typeSort === 'crescente') {
      return filtro.sort((a, b) => {
        if (b[columnFilter] === 'unknown') return minusOne;
        return (a[columnFilter] - b[columnFilter]);
      });
    }
    return filtro;
  };
  const sortFilterButton = () => {
    setControl(control + 1);
  };
  useEffect(() => {
    if (numeric.length === 0 && control !== 0) {
      const ten = 10;
      setCarregando(true);
      setFilterPlanets(sortFilter(filterPlanets));
      setTimeout(() => {
        setCarregando(false);
      }, ten);
    }
    if (numeric.length > 0) {
      numeric.forEach((ele) => {
        switch (ele.compareFilter) {
        case 'maior que':
          return setFilterPlanets(sortFilter(filterPlanets
            .filter((element) => +element[ele.column] > +ele.number)));
        case 'menor que':
          return setFilterPlanets(filterPlanets
            .filter((element) => +element[ele.column] < +ele.number));
        default:
          return setFilterPlanets(filterPlanets
            .filter((element) => +element[ele.column] === +ele.number));
        }
      });
    }
  }, [control]);
  return (
    <div>
      <form>
        <input type="text" onChange={ handleFilter } data-testid="name-filter" />
        <select data-testid="column-filter" name="column" onChange={ onClickFilter }>
          {allFilterTypes
            .map((types) => <option key={ types } value={ types }>{types}</option>)}
        </select>
        <select
          data-testid="comparison-filter"
          name="compareFilter"
          onChange={ onClickFilter }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          name="number"
          onChange={ onClickFilter }
          value={ filter.number }
        />
        <button type="button" data-testid="button-filter" onClick={ buttonFilterNumber }>
          Filter
        </button>
        <select data-testid="column-sort" onClick={ sortOnClick }>
          {typeOfFilters
            .map((types) => <option key={ types } value={ types }>{types}</option>)}
        </select>
        <label htmlFor="Crescente">
          Crescente
          <input
            type="radio"
            id="Crescente"
            value="Crescente"
            data-testid="column-sort-input-asc"
            onChange={ onClickTypeSort }
            checked={ crescenteFilter }
          />
        </label>
        <label htmlFor="Decrescente">
          Decrescente
          <input
            type="radio"
            id="Decrescente"
            data-testid="column-sort-input-desc"
            value="decrescente"
            onChange={ onClickTypeSort }
            checked={ decrescenteFilter }
          />
        </label>
        <button
          data-testid="column-sort-button"
          type="button"
          onClick={ sortFilterButton }
        >
          Ordenar
        </button>
      </form>
      {numeric.map((filtersUsed) => (
        <div key={ filtersUsed.column } data-testid="filter">
          <p>{filtersUsed.column}</p>
          <button
            type="button"
            onClick={ () => deleteButtonFilter(filtersUsed.column) }
          >
            Remover
          </button>
        </div>
      ))}
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ deleteAllFilters }
      >
        Remover todos os filtros
      </button>
      {carregando ? <p>Carregando...</p> : (
        <table>
          <tr>
            {info.map((e) => <th key={ e }>{e}</th>)}
          </tr>
          {filterPlanets.map((planet) => (
            <tr key={ planet.name }>
              <td data-testid="planet-name">{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>
                { planet.films.map((ele, i) => (
                  <p key={ i }>
                    { ele }
                  </p>)) }
              </td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </table>
      )}
    </div>
  );
}
export default Table;
// Projeto feito com ajuda de Gabriel Boubee. Orienta????o em rela????o ?? l??gica de sort por decrescente e crescente, e organiza????o de l??gica de m??ltiplos filtros.
// O c??digo foi praticamente refeito para passar no requisito 09, pois n??o estava conseguindo bater 60% de cobertura nos testes, mesmo tendo poucas linhas sem cobertura. Apesar de o n??mero de linhas ter aumentado drasticamente, a cobertura subiu nos testes, ent??o acredito que tenha sido um bug.
