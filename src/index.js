import './styles.css';
var debounce = require('lodash.debounce');
import  fetchCountries from './fetchCountries.js'
import countryTpl from './tamplates/template.hbs';

const refs={
    input:document.querySelector('.country'),
    countryBox:document.querySelector('.countrycount')
}

refs.input.addEventListener('input', debounce(search,500))
function search(e){
    const name=e.target.value
    
    fetchCountries(name).then(renderCountries)
    }
function renderCountries(country){
    const markup=countryTpl(country)
    refs.countryBox.innerHTML=markup
}