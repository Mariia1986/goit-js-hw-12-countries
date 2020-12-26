import './styles.css';
import  fetchCountries from './fetchCountries.js'

const refs={
    input:document.querySelector('.country')
}

fetchCountries('united')
