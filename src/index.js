import './styles.css';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries.js';
import notifError from './notification.js';
import countryTpl from './tamplates/template.hbs';
import listcountry from './tamplates/listcountry.hbs';

const refs = {
  input: document.querySelector('.country'),
  countryBox: document.querySelector('.countrycount'),
  countryLink: document.querySelector('.country_link'),
};

refs.input.addEventListener('input', debounce(search, 500));
refs.input.addEventListener('click', refreshCountries);
refs.countryBox.addEventListener('click', onFindcountry);
function search(e) {
  const name = e.target.value;
  if (!name) {
    refs.countryBox.innerHTML = '';
    return;
  }
  fetchCountries(name)
    .then(arr => {
      if (arr.length > 1 && arr.length <= 10) {
        rendercountrylist(arr);
      } else {
        if (arr.length === 1) {
          renderCountries(arr);
        }
        if (arr.length > 10) {
          notifError(
            'Превышен результат поиска',
            'Сделайте более точный запрос',
          );
          refreshCountries();
        }
      }
    })
    .catch(err => {
      if (err === 404) {
        notifError('Ошибка', 'Страны с таким именем не существует');
      }
    });
}
function renderCountries(country) {
  const markup = countryTpl(country);

  refs.countryBox.innerHTML = markup;
}

function refreshCountries(e) {
  e.target.value = '';
}
function rendercountrylist(country) {
  const onecountrytamp = listcountry(country);
  refs.countryBox.innerHTML = onecountrytamp;
}
function onFindcountry(e) {
  fetchCountries(e.target.textContent).then(renderCountries);
}
