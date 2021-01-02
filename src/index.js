import './styles.css';
import debounce from 'lodash.debounce';
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
if(!name){
  refs.countryBox.innerHTML = '';
  return
}
  fetchCountries(name)
    .then(renderCountries)
    .catch(err => {
      if (err === 404) {
        notifError('Ошибка', 'Страны с таким именем не существует');
      }
    });
}
function renderCountries(country) {
  const markup = countryTpl(country);
  refs.countryBox.innerHTML = markup;
  if (country.length > 10) {
    notifError('Превышен результат поиска', 'Сделайте более точный запрос');
    refreshCountries();
  }
}

function refreshCountries(e) {
  refs.countryBox.innerHTML = '';
  e.target.value = '';
}
