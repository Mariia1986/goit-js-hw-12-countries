import notifError from './notification.js';
const URL = 'https://restcountries.eu/rest/v2/name/';

function fetchCountries(searchQuery) {
  const url = `${URL}${searchQuery}`;
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response.status);
      }
    })
    .then(data => data);
}

export default fetchCountries;
