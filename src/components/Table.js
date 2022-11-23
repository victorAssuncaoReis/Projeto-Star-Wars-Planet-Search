import React, { useEffect, useState } from 'react';
import '../App.css';

function Table() {
  const [planets, setPlanets] = useState([]);
  const [inputFilter, setInputFilter] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState('0');

  const apiFetch = async () => {
    fetch('https://swapi.dev/api/planets')
      .then((fetchApi) => fetchApi.json())
      .then((json) => setPlanets(json.results));
  };

  useEffect(() => {
    apiFetch();
  }, []);

  const filterName = planets.filter((planet) => planet.name.includes(inputFilter));

  return (
    <div>
      <input
        data-testid="name-filter"
        onChange={ (e) => setInputFilter(e.target.value) }
      />
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
      <input
        type="number"
        data-testid="value-filter"
        onChange={ (e) => setValueFilter(e.target.value) }
        value={ valueFilter }
      />
      <button
        data-testid="button-filter"
        type="button"
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
          {filterName.map((planet) => (
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
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
