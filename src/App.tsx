import React, { useEffect, useState } from 'react';
import './App.css';
import Table from './components/Tables';
import PlanetsConstext from './context/PlanetsContext';
import fetchAPI from './helpers/fetchAPI';

function App() {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      try {
        const planetsData = await fetchAPI();
        setPlanets(planetsData);
      } catch (error) {
        console.error('Failed to fetch planets:', error);
      }
    };
    getPlanets();
  }, []);

  return (
    <PlanetsConstext.Provider value={ { planets } }>
      <Table />
    </PlanetsConstext.Provider>
  );
}

export default App;
