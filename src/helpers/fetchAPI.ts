const fetchAPI = async () => {
  const getPlanets = await fetch('https://swapi.dev/api/planets');
  if (!getPlanets.ok) {
    throw new Error(`HTTP error! status: ${getPlanets}`);
  }

  const data = await getPlanets.json();
  const results = await data.results;

  // const planetsWithoutResidents = results.map((planet: Planet) => {
  //   delete planet.residents;
  //   return planet;
  // });
  return results;
};

export default fetchAPI;
