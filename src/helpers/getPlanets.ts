const getPlanets = async () => {
  const fetchPlanets = await fetch('https://swapi.dev/api/planets');
  if (!fetchPlanets.ok) {
    throw new Error(`HTTP error! status: ${getPlanets}`);
  }
  const data = await fetchPlanets.json();
  const results = await data.results;
  return results;
};

export default getPlanets;
