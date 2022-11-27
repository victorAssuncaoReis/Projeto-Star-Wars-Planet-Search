import React, { useEffect, useState } from 'react';
import '../App.css';

function Table() {
  const [planets, setPlanets] = useState([]);
  const [inputFilter, setInputFilter] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState('0');
  const [numeric, setNumeric] = useState([]);

  const apiFetch = async () => {
    fetch('https://swapi.dev/api/planets')
      .then((fetchApi) => fetchApi.json())
      .then((json) => setPlanets(json.results));
  };

  useEffect(() => {
    apiFetch();
  }, []);

  const filterName = planets.filter((planet) => planet.name.includes(inputFilter));

  const numericFilter = () => {
    switch (comparisonFilter) {
    case 'maior que':
      setNumeric(filterName
        .filter((planet) => planet[columnFilter] > parseFloat(valueFilter)));
      break;
    case 'menor que':
      setNumeric(filterName
        .filter((planet) => planet[columnFilter] < parseFloat(valueFilter)));
      break;
    case 'igual a':
      setNumeric(filterName
        .filter((planet) => planet[columnFilter] === valueFilter));
      break;
    default:
      break;
    }
  };

  return (
    <div>
      <label htmlFor="name-filter">
        <input
          name="name-filter"
          data-testid="name-filter"
          onChange={ (e) => setInputFilter(e.target.value) }
        />
      </label>
      <label htmlFor="column-filter">
        <select
          name="column-filter"
          data-testid="column-filter"
          onChange={ (e) => setColumnFilter(e.target.value) }
          value={ columnFilter }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="comparison-filter">
        <select
          name="comparison-filter"
          id="comparison-filter"
          data-testid="comparison-filter"
          onChange={ (e) => setComparisonFilter(e.target.value) }
          value={ comparisonFilter }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="number">
        <input
          name="number"
          type="number"
          data-testid="value-filter"
          onChange={ (e) => setValueFilter(e.target.value) }
          value={ valueFilter }
        />
      </label>
      <button
        data-testid="button-filter"
        type="button"
        onClick={ numericFilter }
      >
        Filtrar
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
          { numeric.length > 0 ? numeric.map((planet) => (
            <tr key={ planet.name }>
              <td>{ planet.name }</td>
              <td>{ planet.rotation_period }</td>
              <td>{ planet.orbital_period }</td>
              <td>{ planet.diameter }</td>
              <td>{ planet.climate }</td>
              <td>{ planet.gravity }</td>
              <td>{ planet.terrain }</td>
              <td>{ planet.surface_water }</td>
              <td>{ planet.population }</td>
              <td>
                { planet.films.map((ele, i) => (
                  <p key={ i }>
                    { ele }
                  </p>)) }
              </td>
              <td>{ planet.created }</td>
              <td>{ planet.edited }</td>
              <td>{ planet.url }</td>
            </tr>
          )) : filterName.map((namePlanet) => (
            <tr key={ namePlanet.name }>
              <td>{ namePlanet.name }</td>
              <td>{ namePlanet.rotation_period }</td>
              <td>{ namePlanet.orbital_period }</td>
              <td>{ namePlanet.diameter }</td>
              <td>{ namePlanet.climate }</td>
              <td>{ namePlanet.gravity }</td>
              <td>{ namePlanet.terrain }</td>
              <td>{ namePlanet.surface_water }</td>
              <td>{ namePlanet.population }</td>
              <td>
                { namePlanet.films.map((e, i) => (
                  <p key={ i }>
                    { e }
                  </p>)) }
              </td>
              <td>{ namePlanet.created }</td>
              <td>{ namePlanet.edited }</td>
              <td>{ namePlanet.url }</td>
            </tr>))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
