import './styles.css';
var debounce = require('lodash.debounce');
import fetchCountries from './fetchCountries.js';
import notifError from './notification.js';
import countryTpl from './tamplates/template.hbs';

const refs = {
  input: document.querySelector('.country'),
  countryBox: document.querySelector('.countrycount'),
};

refs.input.addEventListener('input', debounce(search, 500));
refs.input.addEventListener('click', refreshCountries);
function search(e) {
  const name = e.target.value;
  if(!fetchCountries(name)){
    return
}
  fetchCountries(name).then(renderCountries);
  
}
function renderCountries(country) {
  const markup = countryTpl(country);
  refs.countryBox.innerHTML = markup;

  if (country.length > 10) {
    notifError('Превышен результат поиска', 'Сделайте более точный запрос');
    refreshCountries();
    return;
  }
}

function refreshCountries(e) {
  refs.countryBox.innerHTML = '';
  e.target.value = '';
}
