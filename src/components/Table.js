import React, { useEffect, useState } from 'react';

function Table() {
  const typeOfFilters = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];

  const [planets, setPlanets] = useState([]);
  const [filterPlanets, setFilterPlanets] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [allFilterTypes, setAllFilterTypes] = useState(typeOfFilters);
  const [numeric, setNumeric] = useState([]);

  const apiFetch = async () => {
    const url = 'https://swapi.dev/api/planets';
    const response = await fetch(url);
    const result = await response.json();
    result.results.forEach((element) => delete element.residents);
    return result.results;
  };

  const apiOnMount = async () => {
    setPlanets(await apiFetch());
  };

  useEffect(() => {
    apiOnMount();
  }, []);

  useEffect(() => {
    if (filterName.length === 0) {
      setFilterPlanets(planets);
    }
  }, [filterName.length, planets]);

  const handleFilter = ({ target: { value } }) => {
    setFilterName(value);
    if (value.length > 0) {
      setFilterPlanets(planets.filter((element) => element.name.includes(value)));
    }
  };

  const comparisonFiltering = () => {
    switch (comparisonFilter) {
    case 'maior que':
      setFilterPlanets(filterPlanets
        .filter((planet) => +planet[columnFilter] > valueFilter));
      break;
    case 'menor que':
      setFilterPlanets(filterPlanets
        .filter((planet) => +planet[columnFilter] < valueFilter));
      break;
    default:
      setFilterPlanets(filterPlanets
        .filter((planet) => planet[columnFilter] === valueFilter));
      break;
    }
  };

  // comparação para req 3 e 4

  const handleClick = () => {
    const filterArray = numeric;
    const filterValue = {
      columnFilter,
      compareFilter: comparisonFilter,
      number: valueFilter,
    };
    filterArray.push(filterValue);
    setNumeric(filterArray);

    const allAppliedFilters = allFilterTypes.filter((e) => e !== columnFilter);
    setAllFilterTypes(allAppliedFilters);
    setColumnFilter(allAppliedFilters[0]);

    comparisonFiltering();
  };

  // Também necessário para req 3 e 4

  const handleDelete = (filterType) => {
    setFilterPlanets(planets);
    const filter = numeric.filter((ele) => ele.columnFilter !== filterType);
    const filterTypesArray = allFilterTypes;
    filterTypesArray.push(filterType);
    setAllFilterTypes(filterTypesArray);
    setNumeric(filter);
  };

  const handleDeleteAll = () => {
    setFilterPlanets(planets);
    setAllFilterTypes(typeOfFilters);
    setNumeric([]);
  };

  useEffect(() => {
    numeric.forEach((ele) => {
      if (ele.compareFilter === 'maior que') {
        return setFilterPlanets(filterPlanets
          .filter((planet) => +planet[ele.columnFilter] > +ele.number));
      }
      if (ele.compareFilter === 'menor que') {
        return setFilterPlanets(filterPlanets
          .filter((planet) => +planet[ele.columnFilter] < +ele.number));
      }
      if (ele.compareFilter === 'igual a') {
        return setFilterPlanets(filterPlanets
          .filter((planet) => planet[ele.columnFilter] === +ele.number));
      }
    });
  }, [numeric]);

  // switch case quebrando esse useEffect... Talvez o default quebre na última comparação?
  // comparação para req 7

  return (
    <div>
      <form>
        <input type="text" onChange={ handleFilter } data-testid="name-filter" />
        <select
          data-testid="column-filter"
          onClick={ (e) => setColumnFilter(e.target.value) }
        >
          {allFilterTypes
            .map((types) => <option key={ types } value={ types }>{types}</option>)}
        </select>
        <select
          data-testid="comparison-filter"
          onClick={ (e) => setComparisonFilter(e.target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          onChange={ (e) => setValueFilter(e.target.value) }
          value={ valueFilter }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClick }
        >
          Filtrar
        </button>
      </form>
      {numeric.map((filtersUsed) => (
        <div key={ filtersUsed.columnFilter } data-testid="filter">
          <p>{filtersUsed.columnFilter}</p>
          <button
            type="button"
            onClick={ () => handleDelete(filtersUsed.columnFilter) }
          >
            Remover
          </button>
        </div>
      ))}
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ handleDeleteAll }
      >
        Remover todos os filtros
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {filterPlanets.map((planet) => (
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
        </tbody>
      </table>
    </div>
  );
}

export default Table;

// feito com ajuda de Gabriel Boubee
