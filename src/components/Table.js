import React, { useEffect, useState } from 'react';
import '../App.css';

function Table() {
  const [planets, setPlanets] = useState([]);
  const [inputFilter, setInputFilter] = useState('');

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
