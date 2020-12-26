 const URL= 'https://restcountries.eu/rest/v2/name/'

function fetchCountries(searchQuery) {
    const url = `${URL}${searchQuery}`;
  return fetch(url).then(
    response => {
      return response.json();
    },
  );
}
export default fetchCountries